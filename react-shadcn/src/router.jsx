import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import MainLayout from "./layouts/main";

const LoginPage = lazy(() => import("./pages/auth/login"));

const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  {
    path: "/",
    element: <MainLayout />,

    // children: [
    //   {
    //     index: true,
    //     element: <Book />,
    //   },
    //   {
    //     path: "book",
    //     element: <Book />,
    //   },
    //   {
    //     path: "e-book",
    //     element: <EBook />,
    //   },
    // ],
  },
]);

export default router;
