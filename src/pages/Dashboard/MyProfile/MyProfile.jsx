import { useForm } from "react-hook-form";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const MyProfile = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user, updateProfileInfo } = useAuth();
  const handleUpdateProfile = (data) => {
    const profileImage = data.image[0];

    const formData = new FormData();
    formData.append("image", profileImage);
    const image_Api_Key = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_host_key
    }`;

    axios
      .post(image_Api_Key, formData)
      .then((res) => {
        console.log(res.data.data.display_url);

        const updateProfile = {
          displayName: data.name,
          photoURL: res.data.data.display_url,
        };

        return updateProfileInfo(updateProfile);
      })
      .then(() => {
        console.log("User profile updated");
        reset()
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Profile has been updated",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="card bg-base-100 w-full max-w-sm shadow-xl">
          <div className="card-body">
            <h1 className="text-center text-2xl font-semibold">
              Update Your Profile
            </h1>
            <fieldset className="space-y-3">
              {/* Name Field */}
              <label className="label"> Name </label>
              <input
                type="text"
                {...register("name")}
                defaultValue={user?.displayName}
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
              <button className="btn w-full btn-neutral mt-3" type="submit">
                Update
              </button>
            </fieldset>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;
