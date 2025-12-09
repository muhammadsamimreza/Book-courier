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
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
import PrivateRoute from "./PrivateRoute";
import AllOrders from "../pages/Dashboard/AllOrders/AllOrders";
import AllBook from "../pages/Dashboard/AllBook/AllBook";

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
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
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
      },
      {
        path: 'myprofile',
        Component: MyProfile
      },
      {
        path: 'allorders',
        Component: AllOrders,
      },
      {
        path: 'allBook',
        Component: AllBook
      }
    ],
  },
]);
