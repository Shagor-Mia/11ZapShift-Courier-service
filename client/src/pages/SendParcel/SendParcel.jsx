import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useSecureAxios from "../../hooks/useSecureAxios";
import { useAuth } from "../../hooks/useAuth";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();

  const { user } = useAuth();
  const axiosSecure = useSecureAxios();

  const serviceCenters = useLoaderData();

  // collecting region from api
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  // console.log(regions);

  // controlling input region for district input
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  // collecting region from input for district of those region
  const districtByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  // handling form submit using react form hook
  const handleFormSubmit = (data) => {
    console.log(data);
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    // console.log(isSameDistrict);
    const isDocument = data.parcelType === "document";
    const parcelWeight = parseFloat(data.parcelWeight);

    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }
    console.log("cost", cost);
    Swal.fire({
      title: "Are you sure about cost?",
      text: `You will be charged ${cost}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post(`/parcels`, data).then((res) => {
          console.log("after saving parcels", res.data);
        });

        // Swal.fire({
        //   title: "Confirmed!",
        //   text: "Your parcel ready to go.",
        //   icon: "success",
        // });
      }
    });
  };

  return (
    <div>
      <h2 className="text-secondary text-5xl font-bold">Send A Parcel</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-12 p-4">
        {/* parcel type */}
        <div>
          <label className="label mr-4">
            <input
              type="radio"
              {...register("parcelType")}
              value="document"
              className="radio"
              defaultChecked
            />
            Document
          </label>
          <label className="label">
            <input
              type="radio"
              {...register("parcelType")}
              value="non-document"
              className="radio"
            />
            None-Document
          </label>
        </div>
        {/* parcel info name,weight*/}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {" "}
          <fieldset className="fieldset">
            <label className="label">Parcel Name</label>
            <input
              type="text"
              {...register("parcelName")}
              className="input w-full"
              placeholder="Parcel Name"
            />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label">Parcel Weight(kg)</label>
            <input
              type="text"
              {...register("parcelWeight")}
              className="input w-full"
              placeholder="Parcel Weight"
            />
          </fieldset>
        </div>
        {/* two column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* sender info */}
          <div className="py-10">
            <h4 className="text-2xl font-bold text-secondary">
              Sender Details
            </h4>
            {/* name */}
            <fieldset className="fieldset">
              <label className="label">Name</label>
              <input
                type="text"
                {...register("senderName")}
                className="input w-full"
                defaultValue={user?.displayName}
                placeholder="sender name"
              />
            </fieldset>
            {/* address */}
            <fieldset className="fieldset mt-4">
              <label className="label">Address</label>
              <input
                type="text"
                {...register("senderAddress")}
                className="input w-full"
                placeholder="sender address"
              />
            </fieldset>
            {/* phone */}
            <fieldset className="fieldset mt-4">
              <label className="label">Phone Number</label>
              <input
                type="text"
                {...register("senderPhone")}
                className="input w-full"
                placeholder="sender phone"
              />
            </fieldset>
            {/* Email */}
            <fieldset className="fieldset mt-4">
              <label className="label">Email</label>
              <input
                type="email"
                {...register("senderEmail")}
                defaultValue={user?.email}
                className="input w-full"
                placeholder="sender Email"
              />
            </fieldset>
            {/*sender region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Region</legend>
              <select
                {...register("senderRegion")}
                defaultValue="Pick Region"
                className="select"
              >
                <option disabled={true}>Pick a Region</option>
                {regions.map((r, index) => (
                  <option key={index} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>
            {/* district */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">District</legend>
              <select
                {...register("senderDistrict")}
                defaultValue="Pick a district"
                className="select"
              >
                <option disabled={true}>Pick a District</option>
                {districtByRegion(senderRegion).map((d, index) => (
                  <option key={index} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </fieldset>
            {/* pickup instruction */}
            <fieldset className="fieldset mt-4">
              <label className="label">Pickup Instruction</label>
              <textarea
                type="text"
                {...register("pickupInstruction")}
                className="textarea w-full"
                placeholder="pickup instruction"
              />
            </fieldset>
          </div>
          {/* receiver info */}
          <div className="py-10">
            <h4 className="text-2xl font-bold text-secondary">
              Receiver Details
            </h4>
            {/* name */}
            <fieldset className="fieldset">
              <label className="label">Name</label>
              <input
                type="text"
                {...register("receiverName")}
                className="input w-full"
                placeholder="receiver name"
              />
            </fieldset>
            {/* address */}
            <fieldset className="fieldset mt-4">
              <label className="label">Address</label>
              <input
                type="text"
                {...register("receiverAddress")}
                className="input w-full"
                placeholder="receiver address"
              />
            </fieldset>
            {/* phone */}
            <fieldset className="fieldset mt-4">
              <label className="label">Phone Number</label>
              <input
                type="text"
                {...register("receiverPhone")}
                className="input w-full"
                placeholder="receiver phone"
              />
            </fieldset>
            {/* Email */}
            <fieldset className="fieldset mt-4">
              <label className="label">Email</label>
              <input
                type="email"
                {...register("receiverEmail")}
                className="input w-full"
                placeholder="receiver Email"
              />
            </fieldset>
            {/*receiver region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Region</legend>
              <select
                {...register("receiverRegion")}
                defaultValue="Pick Region"
                className="select"
              >
                <option disabled={true}>Pick a Region</option>
                {regions.map((r, index) => (
                  <option key={index} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>
            {/* district */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">District</legend>
              <select
                {...register("receiverDistrict")}
                defaultValue="Pick Region"
                className="select"
              >
                <option disabled={true}>Pick a District</option>
                {districtByRegion(receiverRegion).map((d, index) => (
                  <option key={index} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </fieldset>
            {/* pickup instruction */}
            <fieldset className="fieldset mt-4">
              <label className="label">Delivery Instruction</label>
              <textarea
                type="text"
                {...register("deliveryInstruction")}
                className="textarea w-full"
                placeholder="Delivery instruction"
              />
            </fieldset>
          </div>
        </div>
        <input
          type="submit"
          value={"Send Parcel"}
          className="btn btn-primary text-black"
        />
      </form>
    </div>
  );
};

export default SendParcel;
