import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const AddedBook = () => {
  const { reset, register, handleSubmit } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const AddedBookToServer = (data) => {
    console.log("Book Data:", data);
    const bookImage = data.image[0];

    const formData = new FormData();
    formData.append("image", bookImage);
    const image_Api_Key = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_host_key
    }`;
    axios.post(image_Api_Key, formData).then((res) => {
      console.log(res.data.data.display_url);
      const bookInfo = {
        title: data.title,
        author: data.author,
        addBy: user.email,
        price: data.price,
        status: data.status,
        photoURL: res.data.data.display_url,
        createdAt: new Date(),
      };
      // send data to database---
      axiosSecure.post("/allbooks", bookInfo).then((res) => {
        console.log(res.data);
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Book has been added",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
        Add A New Book
      </h2>

      <form
        onSubmit={handleSubmit(AddedBookToServer)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Book Image */}
        <div className="md:col-span-2">
          <label className="font-semibold text-gray-700">Book Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: true })}
            className="block w-full mt-2 file:border-0 file:bg-primary file:text-white 
                       file:px-4 file:py-2 file:rounded-lg bg-gray-100 rounded-lg"
          />
        </div>

        {/* Book Name */}
        <div>
          <label className="font-semibold text-gray-700">Book Name</label>
          <input
            type="text"
            placeholder="Enter book title"
            {...register("title", { required: true })}
            className="input input-bordered w-full rounded-lg mt-2"
          />
        </div>

        {/* Author */}
        <div>
          <label className="font-semibold text-gray-700">Author</label>
          <input
            type="text"
            placeholder="Enter author name"
            {...register("author", { required: true })}
            className="input input-bordered w-full rounded-lg mt-2"
          />
        </div>

        {/* Price */}
        <div>
          <label className="font-semibold text-gray-700">Price</label>
          <input
            type="number"
            step="0.01"
            placeholder="0.00"
            {...register("price", { required: true })}
            className="input input-bordered w-full rounded-lg mt-2"
          />
        </div>

        {/* Status Dropdown */}
        <div>
          <label className="font-semibold text-gray-700">Status</label>
          <select
            {...register("status", { required: true })}
            className="select select-bordered w-full rounded-lg mt-2"
          >
            <option value="published">Published</option>
            <option value="unpublished">Unpublished</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-blue-600 mt-4"
          >
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddedBook;
