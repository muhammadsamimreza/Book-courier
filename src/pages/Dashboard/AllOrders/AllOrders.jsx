import React from 'react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';

const AllOrders = () => {
    const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Load All Orders 
  const {
    data: orders = [],
    isLoading,
  } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?email=${user.email}`);
      return res.data;
    },
});
console.log(orders)

  // Cancel Order Mutation
  const cancelOrderMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.patch(`/orders/${id}`, { status: "cancelled" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["orders", user.email]); 
    },
  });

  const handleCancel = (id) => {
    cancelOrderMutation.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6">All Orders</h2>

      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Book Title</th>
            <th>Order Date</th>
            <th>Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order, index) => {
            const isPending = order.status === "pending";
            const isPaid = order.status === "paid";
           

            return (
              <tr key={order._id}>
                <td>{index + 1}</td>

                <td className="font-semibold">{order.bookTitle}</td>

                <td>{new Date(order.date).toLocaleDateString()}</td>

                <td>
                  <span
                    className={`badge ${
                      isPending
                        ? "badge-warning"
                        : isPaid
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="flex gap-2 justify-center">
                  {/* Cancel Button */}
                  {isPending && (
                    <button
                      onClick={() => handleCancel(order._id)}
                      className="btn btn-sm btn-error"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllOrders;