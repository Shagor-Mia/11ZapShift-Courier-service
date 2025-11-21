import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";

const ForgetPassword = () => {
  const { setLoading, resetPassword } = useAuth();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const handleForgetPassword = (data) => {
    console.log(data);

    resetPassword(data.email)
      .then(() => {
        setLoading(false);
        toast.success("Check your email to reset password");
        navigate("/login");
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  return (
    <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
      <h1 className="text-5xl font-bold text-center mt-5">Forget Password?</h1>
      <p className="text-center text-xl font-semibold">
        enter your email, we will send you OTP.
      </p>
      <form onSubmit={handleSubmit(handleForgetPassword)} className="card-body">
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
          <button className="btn btn-neutral mt-4">send</button>
        </fieldset>
        <p>
          remember your password?
          <span>
            <Link
              state={location.state}
              to={"/login"}
              className="text-blue-600 underline"
            >
              login
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default ForgetPassword;
