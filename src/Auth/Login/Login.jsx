import React from "react";
import { useForm } from "react-hook-form";

const Login = () => {

    const { register, handleSubmit} = useForm();

    const handleLogin = data =>{
            console.log(data)
    }
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-center text-2xl font-semibold">Login to BookExpress</h1>
            <fieldset className="space-y-2">
              <label className="label">Email</label>
              <input type="email" {...register('email')} className="input" placeholder="Email" />
              <label className="label">Password</label>
              <input type="password" {...register('password')} className="input" placeholder="Password" />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn w-full btn-neutral mt-4">Login</button>
            </fieldset>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
