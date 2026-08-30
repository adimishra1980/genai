import "./style.scss";
import { RouterProvider } from "react-router";
import { router } from "./app.routes.tsx";
import { AuthProvider } from "./features/auth/auth.context.tsx";
import { InterviewProvider } from "./features/interview/interview.context.tsx";

function App() {
  return (
    <AuthProvider>
      <InterviewProvider>
        <RouterProvider router={router} />
      </InterviewProvider>
    </AuthProvider>
  );
}

export default App;
