import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import MainLayout from "./layouts/main";

const LoginPage = lazy(() => import("./pages/auth/login"));
const BHXHPage = lazy(() => import("./pages/bhxh"));
const PhongBanPage = lazy(() => import("./pages/phong-ban"));

const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  {
    path: "/",
    element: <MainLayout />,

    children: [
      {
        path: "bhxh",
        element: <BHXHPage />,
      },
      {
        path: "phong-ban",
        element: <PhongBanPage />,
      },
    ],
  },
]);

export default router;
