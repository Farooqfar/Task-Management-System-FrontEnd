import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./components/pages/user/Home";
import Edit from "./components/pages/user/Edit";
import UserProfile from "./components/pages/user/UserProfile";
import UpdateProfile from "./components/pages/user/UpdateProfile";
import AddTask from "./components/pages/user/AddTask";
import HomePage from "./components/pages/HomePage";
import PageNotFound from "./components/pages/PageNotFound";
import LoginUser from "./components/pages/user/LoginUser";
import RegisterUser from "./components/pages/user/RegisterUser";
import ProtectedRoute from "./middlewares/auth";
export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />
    },

    {
      path: "user",
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      )
    },
    {
      path: "user/edit/:id/:title/:description",
      element: (
        <ProtectedRoute>
          <Edit />
        </ProtectedRoute>
      )
    },
    {
      path: "user/profile",
      element: (
        <ProtectedRoute>
          <UserProfile />
        </ProtectedRoute>
      )
    },
    {
      path: "user/profile/update",
      element: (
        <ProtectedRoute>
          <UpdateProfile />
        </ProtectedRoute>
      )
    },
    {
      path: "user/add",
      element: (
        <ProtectedRoute>
          <AddTask />
        </ProtectedRoute>
      )
    },
    {
      path: "*",
      element: <PageNotFound />
    },
    {
      path: "login",
      element: <LoginUser />
    },
    {
      path: "register",
      element: <RegisterUser />
    }
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
