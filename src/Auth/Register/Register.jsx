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
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <form onSubmit={handleSubmit(handleRegister)}>
        <div className="card bg-base-100 w-full max-w-sm shadow-xl">
          <div className="card-body">
            <h1 className="text-center text-2xl font-semibold">
              Register to BookExpress
            </h1>

            <fieldset className="space-y-3">
              {/* Name Field */}
              <label className="label"> Name </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="input input-bordered w-full"
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
              {/* Image Field */}
              <label className="label">Email</label>
              <input
                type="file"
                {...register("email", { required: "Email is required" })}
                className="input input-bordered w-full"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
              {/* Email Field */}
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="input input-bordered w-full"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}

              {/* Password Field */}
              <label className="label">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="input input-bordered w-full"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}

              <div className="text-right">
                <a className="link link-hover text-sm">Forgot password?</a>
              </div>

              <button className="btn w-full btn-neutral mt-3" type="submit">
                Register
              </button>
            </fieldset>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
