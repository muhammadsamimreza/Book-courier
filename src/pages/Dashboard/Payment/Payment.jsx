import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Payment = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const {data: book, isLoading,
    error,} = useQuery({
    queryKey: ["book", id],
    queryFn: async() => {
     const result = await axiosSecure.get(`/payment/${id}`)
     return result.data;
    },
  });
  console.log(book)
  const handlePayment = async ()=>{
    const paymentInfo ={
        price: book.price,
        bookTitle: book.bookTitle,
        bookId: book.bookId,
        userEmail: book.userEmail
    }
    const res = await axiosSecure.post('/payment-checkout-session', paymentInfo);
    console.log(res.data)
    window.location.href = res.data.url;

  }
   if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load</p>;
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-mono">Paymet {book.price} for {book.bookTitle}</h1>
      <button onClick={handlePayment} className="btn btn-success">Pay</button>
    </div>
  );
};

export default Payment;
