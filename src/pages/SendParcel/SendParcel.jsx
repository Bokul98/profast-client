import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useLoaderData } from "react-router";

function SendParcel() {
  const warehousesData = useLoaderData();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const parcelType = watch("type");
  const senderRegion = watch("sender_region");
  const receiverRegion = watch("receiver_region");

  const uniqueRegions = [...new Set(warehousesData.map(w => w.region))];
  const senderServiceCenters = warehousesData.filter(w => w.region === senderRegion);
  const receiverServiceCenters = warehousesData.filter(w => w.region === receiverRegion);

  const onSubmit = (data) => {
    console.log("Form Data:", data);

    let baseCost = data.type === "document" ? 50 : 100;
    const weightCost = data.type === "non-document" && data.weight ? parseFloat(data.weight) * 10 : 0;
    const totalCost = baseCost + weightCost;

    toast.custom(
      (t) => (
        <div className="p-4 bg-white rounded shadow-lg flex flex-col gap-2">
          <p>Estimated Delivery Cost: <strong>${totalCost}</strong></p>
          <button className="btn btn-sm btn-primary" onClick={() => { confirmParcel(data); toast.dismiss(t.id); }}>
            Confirm
          </button>
        </div>
      ),
      { duration: 5000 }
    );
  };

  const confirmParcel = (parcelData) => {
    const finalData = { ...parcelData, creation_date: new Date().toISOString() };
    console.log("Saving to database:", finalData);
    toast.success("Parcel Info Saved Successfully!");
    reset();
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
            <div>
              <label className="label">Parcel Name</label>
              <input {...register("title", { required: true })} className="input input-bordered w-full" placeholder="Describe your parcel" />
              {errors.title && <span className="text-error text-sm">Parcel Name is required</span>}
            </div>

            <div>
              <label className="label">Type</label>
              <div className="flex gap-4 mt-1">
                <label className="flex items-center gap-2">
                  <input type="radio" value="document" {...register("type", { required: true })} className="radio" />
                  Document
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" value="non-document" {...register("type", { required: true })} className="radio" />
                  Non-Document
                </label>
              </div>
              {errors.type && <span className="text-error text-sm">Type is required</span>}
            </div>

            {parcelType === "non-document" && (
              <div>
                <label className="label">Weight (kg)</label>
                <input type="number" step="0.1" {...register("weight")} className="input input-bordered w-full" placeholder="Weight" />
              </div>
            )}
          </div>
        </div>

        {/* Sender & Receiver Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Sender Info */}
          <div className="p-4 border rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Sender Info</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="label">Name</label>
                <input {...register("sender_name", { required: true })} className="input input-bordered w-full" placeholder="Sender Name" />
              </div>
              <div>
                <label className="label">Contact</label>
                <input {...register("sender_contact", { required: true })} className="input input-bordered w-full" placeholder="Phone Number" />
              </div>
              <div>
                <label className="label">Region</label>
                <select {...register("sender_region", { required: true })} className="select select-bordered w-full">
                  <option value="">Select Region</option>
                  {uniqueRegions.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">Service Center</label>
                <select {...register("sender_service_center", { required: true })} className="select select-bordered w-full">
                  <option value="">Select Service Center</option>
                  {senderServiceCenters.map((w, idx) => (
                    <option key={idx} value={w.service_center}>{w.district} - {w.service_center}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">Address</label>
                <input {...register("sender_address", { required: true })} className="input input-bordered w-full" placeholder="Full Address" />
              </div>
              <div>
                <label className="label">Pick up Instruction</label>
                <textarea {...register("pickup_instruction", { required: true })} className="textarea textarea-bordered w-full" placeholder="Instruction" />
              </div>
            </div>
          </div>

          {/* Receiver Info */}
          <div className="p-4 border rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Receiver Info</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="label">Name</label>
                <input {...register("receiver_name", { required: true })} className="input input-bordered w-full" placeholder="Receiver Name" />
              </div>
              <div>
                <label className="label">Contact</label>
                <input {...register("receiver_contact", { required: true })} className="input input-bordered w-full" placeholder="Phone Number" />
              </div>
              <div>
                <label className="label">Region</label>
                <select {...register("receiver_region", { required: true })} className="select select-bordered w-full">
                  <option value="">Select Region</option>
                  {uniqueRegions.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">Service Center</label>
                <select {...register("receiver_service_center", { required: true })} className="select select-bordered w-full">
                  <option value="">Select Service Center</option>
                  {receiverServiceCenters.map((w, idx) => (
                    <option key={idx} value={w.service_center}>{w.district} - {w.service_center}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">Address</label>
                <input {...register("receiver_address", { required: true })} className="input input-bordered w-full" placeholder="Full Address" />
              </div>
              <div>
                <label className="label">Delivery Instruction</label>
                <textarea {...register("delivery_instruction", { required: true })} className="textarea textarea-bordered w-full" placeholder="Instruction" />
              </div>
            </div>
          </div>

        </div>

        <button type="submit" className="btn btn-primary text-black">Submit</button>
      </form>
    </div>
  );
}

export default SendParcel;
