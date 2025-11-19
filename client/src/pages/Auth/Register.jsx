import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router";
import GoogleLogin from "./GoogleLogin";
import axios from "axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { userRegister, updateRegisterUserProfile } = useAuth();

  const handleRegister = (data) => {
    console.log(data.photo[0]);
    const profileImage = data.photo[0];
    userRegister(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        // store data image url
        const formData = new FormData();
        formData.append("image", profileImage);
        const img_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_HOST
        }`;

        axios.post(img_URL, formData).then((res) => {
          console.log("after response", res.data);
          //update user profile
          const userProfile = {
            displayName: data.name,
            photoURL: res.data.data.url,
          };
          updateRegisterUserProfile(userProfile)
            .then(() => {
              console.log("user profile updated done.");
            })
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
      <h1 className="text-5xl font-bold text-center mt-5">Create Account</h1>
      <p className="text-center text-xl font-semibold">With ZapShift</p>
      <form onSubmit={handleSubmit(handleRegister)} className="card-body">
        <fieldset className="fieldset">
          {/*name  */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input"
            placeholder="Your Name"
          />
          {errors.name?.type === "required" && (
            <span className="text-red-500">Name is required!</span>
          )}
          {/* image upload */}

          <label className="label">Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input"
            placeholder="Your photo"
          />
          {errors.photo?.type === "required" && (
            <span className="text-red-500">Photo is required!</span>
          )}
          {/* email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <span className="text-red-500">Email is required!</span>
          )}
          {/*  */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <span className="text-red-500">Password required</span>
          )}
          {errors.password?.type === "minLength" && (
            <span className="text-red-500">
              Password at least 6 character length!
            </span>
          )}
          {errors.password?.type === "pattern" && (
            <span className="text-red-500">
              password At least one uppercase letter,At least one lowercase
              letter,At least one number,At least one special character.
            </span>
          )}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
        <p>
          Already have an Account?{" "}
          <span>
            <Link to={"/login"} className="text-blue-600 underline">
              Login
            </Link>
          </span>
        </p>
      </form>
      <GoogleLogin />
    </div>
  );
};

export default Register;
