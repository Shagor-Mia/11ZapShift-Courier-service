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
]);

export default router;
