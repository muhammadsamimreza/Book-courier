import { createBrowserRouter } from "react-router";
import Home from "../Layouts/AuthLayout/AuthLayout";
import HomeLayout from "../Layouts/HomeLayout/HomeLayout";
import Login from "../Auth/Login/Login";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Register from "../Auth/Register/Register";
import Dashboard from "../Layouts/Dashboard/Dashboard";
import AddedBook from "../pages/AddedBook/AddedBook";
import AllBooks from "../pages/AllBooks/AllBooks";
import BookDetails from "../pages/BookDetails/BookDetails";
import MyOrder from "../pages/Dashboard/MyOrder/MyOrder";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import paymentCancelled from "../pages/Dashboard/Payment/paymentCancelled";
import MyInvoice from "../pages/Dashboard/MyInvoice/MyInvoice";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        path: "/allbooks",
        Component: AllBooks,
      },
      {
        path: "/allbooks/:id",
        Component: BookDetails,
      },
    ],
  },

  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },

  {
    path: "/dashboard",
    Component: Dashboard,
    children: [
      {
        path: "addbook",
        Component: AddedBook,
      },
      {
        path: "myorder",
        Component: MyOrder,
      },
      {
        path: "payment/:id",
        Component: Payment,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: 'payment-cancelled',
        Component: paymentCancelled
      },
      {
        path: 'myinvoice',
        Component: MyInvoice
      }
    ],
  },
]);
