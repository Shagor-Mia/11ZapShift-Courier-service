import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import About from "../pages/AboutUs/About";
import AuthLayout from "../layouts/Authlayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PrivateRoute from "./PrivateRoute";
import Rider from "../pages/Rider/Rider";
import ForgetPassword from "../pages/Auth/ForgetPassword";
import SendParcel from "../pages/SendParcel/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/Dashboards/MyParcels";
import Payment from "../pages/Dashboards/Payment";
import PaymentSuccess from "../pages/Dashboards/PaymentSuccess";
import PaymentFailed from "../pages/Dashboards/PaymentFailed";
import PaymentHistory from "../pages/Dashboards/PaymentHistory";
import ApproveRiders from "../pages/Dashboards/ApproveRiders";
import UsersManagement from "../pages/Dashboards/UsersManagement";
import AdminRoute from "./AdminRoute";
import AssignRiders from "../pages/Dashboards/AssignRiders";
import RidersRoute from "./RidersRoute";
import AssignedDeliveries from "../pages/Dashboards/AssignedDeliveries";
import CompetedDeliveries from "../pages/Dashboards/CompetedDeliveries";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, Component: Home },
      {
        path: "/rider",
        element: (
          <PrivateRoute>
            <Rider />
          </PrivateRoute>
        ),
        loader: () => fetch("/service-center.json").then((res) => res.json()),
      },
      {
        path: "/send-parcel",
        element: (
          <PrivateRoute>
            <SendParcel />
          </PrivateRoute>
        ),
        loader: () => fetch("/service-center.json").then((res) => res.json()),
      },
      {
        path: "/coverage",
        Component: Coverage,
        loader: () => fetch("/service-center.json").then((res) => res.json()),
      },
      {
        path: "/about-us",
        Component: About,
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
      {
        path: "forget-password",
        Component: ForgetPassword,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-parcels",
        Component: MyParcels,
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentFailed,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },
      // riders only
      {
        path: "assigned-deliveries",
        element: (
          <RidersRoute>
            <AssignedDeliveries />
          </RidersRoute>
        ),
      },
      {
        path: "completed-deliveries",
        element: (
          <RidersRoute>
            <CompetedDeliveries />
          </RidersRoute>
        ),
      },

      // admin only
      {
        path: "approve-rider",
        element: (
          <AdminRoute>
            <ApproveRiders />
          </AdminRoute>
        ),
      },
      {
        path: "assign-rider",
        element: (
          <AdminRoute>
            <AssignRiders />
          </AdminRoute>
        ),
      },
      {
        path: "users-management",
        element: (
          <AdminRoute>
            <UsersManagement />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
