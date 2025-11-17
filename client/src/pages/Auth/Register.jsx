import React from "react";
import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleRegister)}>
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
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
