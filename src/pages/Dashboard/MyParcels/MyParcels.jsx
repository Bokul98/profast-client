import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: myParcels = [], refetch, isLoading } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
  });

  const handleView = (parcel) => {
    Swal.fire({
      title: `Tracking ID: ${parcel.tracking_id}`,
      html: `
        <p><b>Type:</b> ${parcel.type}</p>
        <p><b>Status:</b> ${parcel.status}</p>
        <p><b>Total Cost:</b> ৳${parcel.total_cost}</p>
        <p><b>Created At:</b> ${new Date(parcel.createdAt).toLocaleString()}</p>
      `,
      icon: "info",
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/parcels/${id}`);
          Swal.fire("Deleted!", "Parcel has been removed.", "success");
          refetch();
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Failed to delete parcel.", "error");
        }
      }
    });
  };

  const handlePayment = (parcel) => {
    Swal.fire({
      icon: "success",
      title: "Payment Successful",
      text: `You paid ৳${parcel.total_cost} for ${parcel.tracking_id}`,
    });
    // You can update the status in database here
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Parcels ({myParcels.length})</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Type</th>
                <th>Created At</th>
                <th>Total Cost (৳)</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myParcels.map((parcel, index) => (
                <tr key={parcel._id}>
                  <td>{index + 1}</td>
                  <td>
                    <span
                      className={`badge ${
                        parcel.type === "document" ? "badge-primary" : "badge-secondary"
                      }`}
                    >
                      {parcel.type === "document" ? "Document" : "Non-document"}
                    </span>
                  </td>
                  <td>{new Date(parcel.createdAt).toLocaleString()}</td>
                  <td>৳{parcel.total_cost}</td>
                  <td>
                    <span
                      className={`badge ${
                        parcel.status === "Paid" ? "badge-success" : "badge-error"
                      }`}
                    >
                      {parcel.status === "Paid" ? "Paid" : "Unpaid"}
                    </span>
                  </td>
                  <td className="flex gap-2">
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => handleView(parcel)}
                    >
                      View
                    </button>
                    {parcel.status !== "Paid" && (
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => handlePayment(parcel)}
                      >
                        Pay
                      </button>
                    )}
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(parcel._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyParcels;
