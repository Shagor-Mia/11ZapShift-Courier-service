import React from "react";
import { useAuth } from "../../hooks/useAuth";
import useSecureAxios from "../../hooks/useSecureAxios";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AssignedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useSecureAxios();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user.email, "driver_assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliverStatus=driver_assigned`
      );
      return res.data;
    },
  });
  //   console.log(parcels);

  const handleDeliveryStatusUpdate = (parcel, status) => {
    const statusInfo = { deliverStatus: status };
    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Parcel Status updated wit ${status.split("_").join(" ")}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-5xl font-bold my-2">
        Parcels Pending {parcels.length}
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Sender Name</th>
              <th>Parcel Name</th>
              <th>Cost</th>
              <th>Pickup District</th>
              <th>Confirmation</th>
              <th>Other Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.senderName}</td>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>

                <td>{parcel.senderDistrict}</td>
                <td>
                  {parcel.deliverStatus === "driver_assigned" ? (
                    <>
                      <button
                        onClick={() =>
                          handleDeliveryStatusUpdate(parcel, "rider_arriving")
                        }
                        className="btn btn-primary text-black"
                      >
                        Accept
                      </button>
                      <button className="ml-2 btn btn-warning text-black">
                        Reject
                      </button>
                    </>
                  ) : (
                    <p className="bg-amber-50">Accepted</p>
                  )}
                </td>
                <td>
                  {" "}
                  <button
                    onClick={() =>
                      handleDeliveryStatusUpdate(parcel, "parcel_picked_up")
                    }
                    className="btn btn-primary text-black"
                  >
                    Marked as PickedUp
                  </button>{" "}
                  <button
                    onClick={() =>
                      handleDeliveryStatusUpdate(parcel, "parcel_delivered")
                    }
                    className="btn btn-primary text-black"
                  >
                    Mark as delivered
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

export default AssignedDeliveries;
