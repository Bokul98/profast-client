import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

function SendParcel() {
  const form = useForm();
  const { register, handleSubmit, watch, reset, formState } = form;
  const { errors } = formState;
  console.log(errors);
  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();  // Make sure useAuth() is invoked correctly

  const warehousesData = useLoaderData();
  const uniqueRegions = [...new Set(warehousesData.map((w) => w.region))];

  const parcelType = watch("type");
  const senderRegion = watch("sender_region");
  const receiverRegion = watch("receiver_region");

  const senderServiceCenters = warehousesData.filter((w) => w.region === senderRegion);
  const receiverServiceCenters = warehousesData.filter((w) => w.region === receiverRegion);

  const showCostBreakdown = (data) => {
    const isSameDistrict = data.sender_region === data.receiver_region;
    let baseCost = 0;
    let extraWeightCost = 0;
    let outsideDistrictCharge = 0;

    if (data.type === "document") {
      baseCost = isSameDistrict ? 60 : 80;
    } else {
      baseCost = isSameDistrict ? 110 : 150;
      if (!isSameDistrict) {
        outsideDistrictCharge = 40;
      }
      if (parseFloat(data.weight) > 3) {
        const extraKg = parseFloat(data.weight) - 3;
        extraWeightCost = extraKg * 40;
      }
    }

    const totalCost = baseCost + extraWeightCost + outsideDistrictCharge;

    Swal.fire({
      title: "<strong>Delivery Cost Breakdown</strong>",
      icon: "info",
      html: `
        <div style="text-align:left; font-size:15px;">
          <p><b>Parcel Type:</b> ${data.type === "document" ? "Document" : "Non-document"}</p>
          ${data.type === "non-document" ? `<p><b>Weight:</b> ${data.weight} kg</p>` : ""}
          <p><b>Delivery Zone:</b> ${isSameDistrict ? "Within District" : "Outside District"}</p>
          <hr style="margin:8px 0;"/>
          <p><b>Base Cost:</b> ৳${baseCost}</p>
          ${extraWeightCost ? `<p><b>Extra Charge:</b> ৳40 x ${parseFloat(data.weight) - 3}kg = ৳${extraWeightCost}</p>` : ""}
          ${outsideDistrictCharge ? `<p><b>Outside District Charge:</b> ৳${outsideDistrictCharge}</p>` : ""}
          <h2 style="margin-top:10px; color:green;">Total Cost: ৳${totalCost}</h2>
        </div>
        <p style="color:gray; margin-top:8px;">
          ${data.type === "document" ? "" : (parseFloat(data.weight) > 3 ? "Non-document over 3kg has extra weight charges." : "")}
          ${!isSameDistrict ? "<br>৳40 extra for outside district delivery." : ""}
        </p>
      `,
      showCancelButton: true,
      confirmButtonText: "Proceed to Payment",
      cancelButtonText: "Continue Editing",
      width: 500,
    }).then((result) => {
      if (result.isConfirmed) {
        confirmParcel(data, totalCost);
      }
    });
  };

  const confirmParcel = (data, totalCost) => {
    const parcelData = {
      ...data,
      total_cost: totalCost,
      creator_email: user?.email || "unknown",
      creation_time: new Date().toISOString(),
      tracking_id: "TRK-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      status: "Pending",
      title: data.title
    };

    console.log("Saving to Database:", parcelData);

    //Save data to the server

    axiosSecure.post('/parcels', parcelData)
      .then(res => {
        console.log(res.data)
        if (res.data.tracking_id) {
          //TODO : Redirect to payment page
          Swal.fire({
            icon: "success",
            title: "Parcel Confirmed",
            text: "Your parcel has been saved successfully.",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      })


    reset();
  };

  const onSubmit = (data) => {
    if (data.type === "non-document" && (!data.weight || parseFloat(data.weight) <= 0)) {
      Swal.fire("Error", "Please enter valid weight for non-document parcel.", "error");
      return;
    }
    showCostBreakdown(data);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">Send Your Parcel</h1>
      <p className="mb-6 text-gray-600">Fill the form below to send your parcel</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Parcel Info */}
        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Parcel Info</h2>
          <div className="grid grid-cols-1 gap-4">
            <input {...register("title", { required: true })} className="input input-bordered w-full" placeholder="Describe your parcel" />
            <div className="flex gap-4 mt-1">
              <label className="flex items-center gap-2">
                <input type="radio" value="document" {...register("type", { required: true })} className="radio" /> Document
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="non-document" {...register("type", { required: true })} className="radio" /> Non-Document
              </label>
            </div>
            {parcelType === "non-document" && (
              <input type="number" step="0.1" {...register("weight", { required: true })} className="input input-bordered w-full" placeholder="Weight (kg)" />
            )}
          </div>
        </div>

        {/* Sender & Receiver Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Sender */}
          <div className="p-4 border rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Sender Info</h2>
            <div className="grid grid-cols-1 gap-4">
              <input {...register("sender_name", { required: true })} className="input input-bordered w-full" placeholder="Sender Name" />
              <input {...register("sender_contact", { required: true })} className="input input-bordered w-full" placeholder="Phone Number" />
              <select {...register("sender_region", { required: true })} className="select select-bordered w-full">
                <option value="">Select Region</option>
                {uniqueRegions.map((r, idx) => <option key={idx} value={r}>{r}</option>)}
              </select>
              <select {...register("sender_service_center", { required: true })} className="select select-bordered w-full">
                <option value="">Select Service Center</option>
                {senderServiceCenters.map((w, idx) => <option key={idx} value={w.service_center}>{w.district} - {w.service_center}</option>)}
              </select>
              <input {...register("sender_address", { required: true })} className="input input-bordered w-full" placeholder="Full Address" />
              <textarea {...register("pickup_instruction", { required: true })} className="textarea textarea-bordered w-full" placeholder="Instruction" />
            </div>
          </div>

          {/* Receiver */}
          <div className="p-4 border rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Receiver Info</h2>
            <div className="grid grid-cols-1 gap-4">
              <input {...register("receiver_name", { required: true })} className="input input-bordered w-full" placeholder="Receiver Name" />
              <input {...register("receiver_contact", { required: true })} className="input input-bordered w-full" placeholder="Phone Number" />
              <select {...register("receiver_region", { required: true })} className="select select-bordered w-full">
                <option value="">Select Region</option>
                {uniqueRegions.map((r, idx) => <option key={idx} value={r}>{r}</option>)}
              </select>
              <select {...register("receiver_service_center", { required: true })} className="select select-bordered w-full">
                <option value="">Select Service Center</option>
                {receiverServiceCenters.map((w, idx) => <option key={idx} value={w.service_center}>{w.district} - {w.service_center}</option>)}
              </select>
              <input {...register("receiver_address", { required: true })} className="input input-bordered w-full" placeholder="Full Address" />
              <textarea {...register("delivery_instruction", { required: true })} className="textarea textarea-bordered w-full" placeholder="Instruction" />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default SendParcel;
