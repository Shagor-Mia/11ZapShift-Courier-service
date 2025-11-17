import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router";
import GoogleLogin from "./GoogleLogin";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { userRegister } = useAuth();

  const handleRegister = (data) => {
    userRegister(data.email, data.password)
      .then((result) => console.log(result.user))
      .catch((err) => console.log(err));
  };

  return (
    <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
      <h1 className="text-5xl font-bold text-center mt-5">Create Account</h1>
      <p className="text-center text-xl font-semibold">With ZapShift</p>
      <form onSubmit={handleSubmit(handleRegister)} className="card-body">
        <fieldset className="fieldset">
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
