import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router";

const MyBooks = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["myBooks", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/books?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold">
        My Books <span className="text-primary">({books.length})</span>
      </h2>

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Book</th>
              <th>Status</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book._id}>
                <th>{index + 1}</th>

                {/* Book Image + Name + Author */}
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={book.photoURL} alt={book.title} />
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold">{book.title}</div>
                      <div className="text-sm opacity-50">{book.author}</div>
                    </div>
                  </div>
                </td>

                {/* Published / Unpublished */}
                <td>
                  <span
                    className={`badge ${
                      book.status === "published"
                        ? "badge-success"
                        : "badge-warning"
                    } badge-sm`}
                  >
                    {book.status}
                  </span>
                </td>

                {/* Navigate to Edit Page */}
                <td>
                  <Link to={`/dashboard/edit-book/${book._id}`}>
                    <button className="btn btn-sm btn-outline">
                      <FaRegEdit />
                    </button>
                  </Link>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBooks;
