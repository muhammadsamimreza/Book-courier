import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Register = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser, signInWithGoogle, updateProfileInfo } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate()
  const saveUser = (user) => {
    const userInfo = {
      name: user.displayName,
      email: user.email,
      role: "user",
    };
    axiosSecure.post("/users", userInfo).then((res) => {
      console.log(res.data);
    });
  };
  // const handleRegister = (data) => {

  //   const profileImage = data.image[0];
  //   registerUser(data.email, data.password)
  //     .then((result) => {
  //       console.log(result.user);
  //       saveUser(user)
  //       const formData = new FormData();
  //       formData.append("image", profileImage);
  //       const image_Api_Key = `https://api.imgbb.com/1/upload?key=${
  //         import.meta.env.VITE_image_host_key
  //       }`;
  //       axios.post(image_Api_Key, formData).then((res) => {
  //         console.log(res.data.data.display_url);

  //         //update Profile

  //         const updateProfile = {
  //           displayName: data.name,
  //           photoURL: res.data.data.display_url,
  //         };
  //         updateProfileInfo(updateProfile)
  //           .then(() => {
  //             console.log("user profile udated");
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //           });
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  const handleRegister = async (data) => {
    try {
      // Create user account
      const result = await registerUser(data.email, data.password);
      const createdUser = result.user;

      // Upload image to imgbb
      const profileImage = data.image[0];
      const formData = new FormData();
      formData.append("image", profileImage);

      const image_Api_Key = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host_key
      }`;
      const imgRes = await axios.post(image_Api_Key, formData);
      const imageUrl = imgRes.data.data.display_url;

      // Update Firebase Profile
      await updateProfileInfo({
        displayName: data.name,
        photoURL: imageUrl,
      });

      console.log("Firebase profile updated!");

      // Save to Database using the UPDATED user info
      await saveUser({
        displayName: data.name,
        email: createdUser.email,
      });

      console.log("User saved to DB!");
      navigate('/')
       reset()
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your registration has been completed",
                showConfirmButton: false,
                timer: 1500,
              });
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const signinWithGoogle = () => {
    signInWithGoogle();
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
                {...register("name")}
                className="input input-bordered w-full"
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
              {/* Image Field */}
              <label className="label">Image</label>
              <input
                type="file"
                {...register("image")}
                className="w-full file-input file-input-success"
              />
              {errors.image && (
                <p className="text-red-500 text-sm">{errors.file.message}</p>
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
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}

              <button className="btn w-full btn-neutral mt-3" type="submit">
                Register
              </button>
            </fieldset>

            <h1>
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-500 underline hover:text-blue-600"
              >
                Login
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

export default Register;
