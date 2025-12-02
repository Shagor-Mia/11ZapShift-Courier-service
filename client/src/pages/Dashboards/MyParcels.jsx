import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "../../hooks/useSecureAxios";
import { FiEdit } from "react-icons/fi";
import { PiFileMagnifyingGlassLight } from "react-icons/pi";
import { GoTrash } from "react-icons/go";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useSecureAxios();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      // console.log(res.data);
      return res.data;
    },
  });

  const handleDeleteParcel = (id) => {
    // console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount) {
            // refresh the data
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your parcel has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  // new
  const handlePayment = async (parcel) => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      parcelName: parcel.parcelName,
      senderEmail: parcel.senderEmail,
    };
    const res = await axiosSecure.post(
      `/payment-checkout-session`,
      paymentInfo
    );
    // console.log(res.data.url);
    window.location.assign(res.data.url);
  };

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1>my parcels{parcels.length}</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Cost</th>
              <th>parcelType</th>
              <th>Payment </th>
              <th>delivery Status</th>
              <th>TrackingId</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>
                <td>{parcel.parcelType}</td>
                <td>
                  {parcel.paymentStatus === "paid" ? (
                    <button className="btn bg-green-400">paid</button>
                  ) : (
                    // new
                    <button
                      onClick={() => handlePayment(parcel)}
                      className="btn btn-primary text-black"
                    >
                      pay
                    </button>
                    // old
                    // <Link
                    //   to={`/dashboard/payment/${parcel._id}`}
                    //   className="btn btn-primary text-black"
                    // >
                    //   Pay
                    // </Link>
                  )}
                </td>
                <td>{parcel.deliverStatus}</td>
                <td>
                  <Link to={`/parcel-track/${parcel.trackingId}`}>
                    {parcel.trackingId}
                  </Link>
                </td>
                <td>
                  <button className="btn btn-square hover:bg-primary">
                    <FiEdit />
                  </button>
                  <button className="btn btn-square hover:bg-primary mx-2">
                    <PiFileMagnifyingGlassLight />
                  </button>
                  <button
                    onClick={() => handleDeleteParcel(parcel._id)}
                    className="btn btn-square hover:bg-red-400"
                  >
                    <GoTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
