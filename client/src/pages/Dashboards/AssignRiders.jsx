import React from "react";
import useSecureAxios from "../../hooks/useSecureAxios";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { useState } from "react";
import Swal from "sweetalert2";

const AssignRiders = () => {
  const axiosSecure = useSecureAxios();
  const [selectedParcel, setSelectedParcel] = useState(null);
  const riderModalRef = useRef(null);

  // pending parcel
  const { data: parcels = [], refetch: parcelsRefetch } = useQuery({
    queryKey: ["parcels", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels?deliverStatus=pending-pickup`
      );
      return res.data;
    },
  });
  // console.log(parcels);

  // available riders for assign parcel
  const { data: riders = [] } = useQuery({
    queryKey: ["riders", selectedParcel?.senderDistrict, "available"],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?status=approved&district=${selectedParcel?.senderDistrict}&workStatus=available`
      );
      return res.data;
    },
  });

  // riders modal for assign parcel
  const viewRiderModal = (parcel) => {
    // console.log(rider);
    setSelectedParcel(parcel);
    riderModalRef.current.showModal();
  };

  const handleAssignedRider = (rider) => {
    const riderInfo = {
      riderId: rider._id,
      riderEmail: rider.email,
      riderName: rider.name,
      parcelId: selectedParcel._id,
    };
    axiosSecure
      .patch(`/parcels/${selectedParcel._id}`, riderInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          riderModalRef.current.close();
          parcelsRefetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Rider has been assigned!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1>Assign Riders {parcels.length}</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Sender Name</th>
              <th>Parcel Name</th>
              <th>Cost</th>
              <th>CreatedAt</th>
              <th>Pickup District</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.senderName}</td>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>
                <td>{parcel.createdAt}</td>
                <td>{parcel.senderDistrict}</td>
                <td>
                  <button
                    onClick={() => viewRiderModal(parcel)}
                    className="btn btn-primary text-black"
                  >
                    Find Rider
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* available riders modal */}
      <dialog ref={riderModalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Riders :{riders.length}</h3>

          <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>District</th>
                  <th>WorkStatus</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {riders.map((rider, index) => (
                  <tr key={rider._id}>
                    <th>{index + 1}</th>
                    <td>{rider.name}</td>
                    <td>{rider.district}</td>
                    <td>{rider.workStatus}</td>
                    <td>
                      <button
                        onClick={() => handleAssignedRider(rider)}
                        className="btn btn-primary text-black"
                      >
                        assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRiders;
