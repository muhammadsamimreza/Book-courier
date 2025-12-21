import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Load users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/only-users");
      return res.data;
    },
  });

  // Role mutation
  const roleMutation = useMutation({
    mutationFn: async ({ id, role }) => {
      await axiosSecure.patch(`/users/role/${id}`, { role });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  const handleRoleChange = (id, role) => {
    roleMutation.mutate({ id, role });
    Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Succesfully done",
                    showConfirmButton: false,
                    timer: 1500,
                  });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6">All Users</h2>

      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name || "N/A"}</td>
              <td>{user.email}</td>

              <td>
                <span className="badge badge-info">
                  {user.role || "user"}
                </span>
              </td>

              <td className="flex gap-2 justify-center">
                {user.role !== "librarian" && (
                  <button
                    onClick={() =>
                      handleRoleChange(user._id, "librarian")
                    }
                    className="btn btn-sm btn-warning"
                  >
                    Make Librarian
                  </button>
                )}

                {user.role !== "admin" && (
                  <button
                    onClick={() =>
                      handleRoleChange(user._id, "admin")
                    }
                    className="btn btn-sm btn-success"
                  >
                    Make Admin
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
