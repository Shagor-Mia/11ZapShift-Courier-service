import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Coverage/Coverage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, Component: Home },
      {
        path: "/coverage",
        Component: Coverage,
        loader: () => fetch("/service-center.json").then((res) => res.json()),
      },
    ],
  },
]);

export default router;
