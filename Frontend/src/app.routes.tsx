import { createBrowserRouter } from "react-router";
import Register from "./features/auth/pages/Register.tsx";
import Login from "./features/auth/pages/Login.tsx";
import Protected from "./features/auth/components/Protected.tsx";

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
        <h1>Home page</h1>
      </Protected>
    ),
  },
]);
