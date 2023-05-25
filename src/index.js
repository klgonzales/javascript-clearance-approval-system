import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Applications from "./pages/Applications";
import Notifications from "./pages/Notifications";
// import Home from "./pages/Home";
import CreateApplication from "./pages/CreateApplication";
import ViewPendingApplications from "./pages/Admin/ViewPendingApplications";
import ManageApprovers from "./pages/Admin/ManageApprovers";

import { redirect } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

// Send a POST request to API to check if the user is logged in. Redirect the user to /dashboard if already logged in
const checkIfLoggedInOnHome = async () => {
  const res = await fetch("http://localhost:3001/checkifloggedin", {
    method: "POST",
    credentials: "include",
  });

  const payload = await res.json();

  if (payload.isLoggedIn) {
    return redirect("/dashboard");
  } else {
    return 0;
  }
};

// Send a POST request to API to check if the user is logged in. Redirect the user back to / if not logged in
const checkIfLoggedInOnDash = async () => {
  const res = await fetch("http://localhost:3001/checkifloggedin", {
    method: "POST",
    credentials: "include",
  });

  const payload = await res.json();
  if (payload.isLoggedIn) {
    return true;
  } else {
    return redirect("/");
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      // { path: "/", element: <Home /> },
      { path: "/", element: <Home />, loader: checkIfLoggedInOnHome },
      { path: "/dashboard", element: <Dashboard />, loader: checkIfLoggedInOnDash },
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
