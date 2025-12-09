import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {
  const { signinUser, signInWithGoogle } = useAuth();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    signinUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate("/");
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Book has been added",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const signinWithGoogle = () => {
    signInWithGoogle();
    navigate("/");
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your Book has been added",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-center text-2xl font-semibold">
              Login to BookExpress
            </h1>
            <fieldset className="space-y-2">
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
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn w-full btn-neutral mt-4">Login</button>
            </fieldset>
            <h1>
              {" "}
              Didn't have a account ?{" "}
              <Link
                to="/register"
                className="text-blue-500 underline hover:text-blue-600"
              >
                Register
              </Link>
            </h1>
            {/* Social login */}
            <h1 className="text-center">Or</h1>
            <button
              onClick={signinWithGoogle}
              className="btn bg-white text-black border-[#e5e5e5]"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
