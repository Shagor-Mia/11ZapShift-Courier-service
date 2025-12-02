// import React from "react";
// import { useParams } from "react-router";
// import useSecureAxios from "../../hooks/useSecureAxios";
// import { useQuery } from "@tanstack/react-query";

// const Payment = () => {
//   const { parcelId } = useParams();
//   const axiosSecure = useSecureAxios();

//   const { isLoading, data: parcel } = useQuery({
//     queryKey: ["parcels", parcelId],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/parcels/${parcelId}`);
//       return res.data;
//     },
//   });

//   const handlePayment = async () => {
//     const paymentInfo = {
//       parcelId: parcel._id,
//       parcelName: parcel.parcelName,
//       senderEmail: parcel.senderEmail,
//       cost: parcel.cost,
//     };
//     const res = await axiosSecure.post(`/create-checkout-session`, paymentInfo);
//     console.log(res.data);
//     window.location.href = res.data.url;
//   };

//   if (isLoading) {
//     return (
//       <div>
//         <span className="loading loading-spinner loading-xl"></span>
//       </div>
//     );
//   }
//   return (
//     <div className="max-w-6xl mx-auto py-10">
//       <h1>
//         please pay -${parcel.cost} for :- {parcel.parcelName}
//       </h1>
//       <button onClick={handlePayment} className="btn btn-primary text-black">
//         Pay
//       </button>
//     </div>
//   );
// };

// export default Payment;
