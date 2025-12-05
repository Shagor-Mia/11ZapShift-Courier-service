import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useSecureAxios from "../../hooks/useSecureAxios";

const PaymentSuccess = () => {
  const axiosSecure = useSecureAxios();
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState();

  const sessionId = searchParams.get("session_id");
  // console.log(sessionId);

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
        });
    }
  }, [sessionId, axiosSecure]);
  return (
    <div className="py-10 mx-auto max-w-6xl">
      <h2 className="text-4xl font-bold">Payment Successful.</h2>
      <p>your transactionId :{paymentInfo?.transactionId}</p>
      <p>your parcel trackingId :{paymentInfo?.trackingId}</p>
    </div>
  );
};

export default PaymentSuccess;
