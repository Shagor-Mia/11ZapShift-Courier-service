import React from "react";
import { useAuth } from "../../hooks/useAuth";
import useSecureAxios from "../../hooks/useSecureAxios";
import { useQuery } from "@tanstack/react-query";

const CompetedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useSecureAxios();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user.email, "parcel_delivered"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliverStatus=parcel_delivered`
      );
      return res.data;
    },
  });

  const calculatePayOut = (parcel) => {
    if (parcel.senderDistrict === parcel.receiverDistrict) {
      return parcel.cost * 0.8;
    } else {
      return parcel.cost * 0.6;
    }
  };
  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-5xl font-bold py-5">
        Completed Deliveries {parcels.length}
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Sender Name</th>
              <th>Parcel Name</th>
              <th>Pickup District</th>
              <th>Cost</th>
              <th>Payout</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.senderName}</td>
                <td>{parcel.parcelName}</td>
                <td>{parcel.senderDistrict}</td>
                <td>$ {parcel.cost}</td>
                <td>$ {calculatePayOut(parcel)}</td>

                <td>
                  <button className="btn btn-primary text-black">
                    Cash Out
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

export default CompetedDeliveries;
