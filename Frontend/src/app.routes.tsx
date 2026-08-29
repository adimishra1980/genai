import { createBrowserRouter } from "react-router";
import Register from "./features/auth/pages/Register.tsx";
import Login from "./features/auth/pages/Login.tsx";
import Protected from "./features/auth/components/Protected.tsx";
import Home from "./features/interview/pages/Home.tsx";

export const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
]);
