import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router";
import GoogleLogin from "./GoogleLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { userLogin } = useAuth();

  const handleLogin = (data) => {
    userLogin(data.email, data.password)
      .then((result) => {
        console.log("after login", result.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
      <h1 className="text-5xl font-bold text-center mt-5">Welcome Back</h1>
      <p className="text-center text-xl font-semibold">Please Login</p>
      <form onSubmit={handleSubmit(handleLogin)} className="card-body">
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
            {...register("password", { required: true, minLength: 6 })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <span className="text-red-500">password is required!</span>
          )}
          {errors.password?.type === "minlength" && (
            <span className="text-red-500">password must be 6 character!</span>
          )}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
        <p>
          New To Zap Shift?{" "}
          <span>
            <Link to={"/register"} className="text-blue-600 underline">
              Register
            </Link>
          </span>
        </p>
      </form>
      <GoogleLogin />
    </div>
  );
};

export default Login;
