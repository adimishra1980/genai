import { LoaderCircle } from "lucide-react";
import { Navigate } from "react-router";
import { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth.ts";

interface ProtectedProps {
  children: ReactNode;
}

const Protected = ({ children }: ProtectedProps) => {
  const { loading, user } = useAuth();

  if (loading) {
    return (
      <div className="loader-container">
        <LoaderCircle />
      </div>
    );
  }

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return children;
};

export default Protected;
