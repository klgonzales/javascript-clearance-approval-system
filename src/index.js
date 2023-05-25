import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Applications from "./pages/Applications";
import Notifications from "./pages/Notifications";
import Home from "./pages/Home";
import CreateApplication from "./pages/CreateApplication";
import ViewPendingApplications from "./pages/Admin/ViewPendingApplications";
import ManageApprovers from "./pages/Admin/ManageApprovers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "applications", element: <Applications /> },
      { path: "notifications", element: <Notifications /> },
      { path: "create-application", element: <CreateApplication /> },
      { path: "admin/view_pending_applications", element: <ViewPendingApplications /> },
      { path: "admin/approvers", element: <ManageApprovers /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals