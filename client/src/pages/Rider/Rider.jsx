import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import useSecureAxios from "../../hooks/useSecureAxios";
import { useLoaderData, useNavigate } from "react-router";
import riderImg from "../../assets/agent-pending.png";
import Swal from "sweetalert2";

const Rider = () => {
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const axiosSecure = useSecureAxios();
  const serviceCenters = useLoaderData();
  const navigate = useNavigate();

  // collecting region from api
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  // console.log(regions);

  // controlling input region for district input
  const riderRegion = useWatch({ control, name: "region" });

  // collecting region from input for district of those region
  const districtByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const handleBeARider = (data) => {
    // console.log(data);
    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        console.log("apply success");
        navigate("/");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Application Submitted. We will reach you through email.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  return (
    <div className="flex justify-between items-center gap-20 mt-10 ">
      {/* rider details */}
      <form onSubmit={handleSubmit(handleBeARider)} className="flex-1">
        <h2 className="text-5xl font-bold">Be A Rider</h2>
        <div className="py-10">
          {/* name */}
          <fieldset className="fieldset">
            <label className="label">Your Name</label>
            <input
              type="text"
              {...register("name")}
              className="input w-full"
              defaultValue={user?.displayName}
              placeholder="rider name"
            />
          </fieldset>
          {/* address */}
          <fieldset className="fieldset mt-4">
            <label className="label">Driving License Number</label>
            <input
              type="text"
              {...register("drivingLicense")}
              className="input w-full"
              placeholder="Driving License"
            />
          </fieldset>
          {/* phone */}
          <fieldset className="fieldset mt-4">
            <label className="label">Phone Number</label>
            <input
              type="text"
              {...register("phone")}
              className="input w-full"
              placeholder="rider phone"
            />
          </fieldset>
          {/* Email */}
          <fieldset className="fieldset mt-4">
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email")}
              defaultValue={user?.email}
              className="input w-full"
              placeholder="rider Email"
            />
          </fieldset>
          {/*sender region */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Your Region</legend>
            <select
              {...register("region")}
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
            <legend className="fieldset-legend">Your District</legend>
            <select
              {...register("district")}
              defaultValue="Pick a district"
              className="select"
            >
              <option disabled={true}>Pick a District</option>
              {districtByRegion(riderRegion).map((d, index) => (
                <option key={index} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </fieldset>
          {/* Nid */}
          <fieldset className="fieldset mt-4">
            <label className="label">NID</label>
            <input
              type="text"
              {...register("NID")}
              className="input w-full"
              placeholder="rider NID"
            />
          </fieldset>
        </div>
        <input
          type="submit"
          value={"Be a Rider"}
          className="btn btn-primary text-black"
        />
      </form>
      <div className="flex-1">
        <img src={riderImg} alt="" />
      </div>
    </div>
  );
};

export default Rider;
