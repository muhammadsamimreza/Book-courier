import React, { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyInvoice = () => {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!user?.email) return;
    axiosSecure
      .get(`/payments?email=${user.email}`)
      .then((res) => {
        setInvoices(res.data);
      })
      .catch((err) => console.log(err));
  }, [user, axiosSecure]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3 mb-4">
        My Invoices
      </h2>

      {invoices.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No payments found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="text-gray-700">
                <th>#</th>
                <th>Book Name</th>
                <th>Payment ID</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td>{index + 1}</td>
                  <td>{item.bookTitle}</td>
                  <td className="font-medium text-primary">{item.transactionId}</td>
                  <td className="font-semibold">${item.price}</td>
                  <td>{new Date(item.paymentTime).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyInvoice;
