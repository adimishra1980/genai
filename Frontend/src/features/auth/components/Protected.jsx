import { LoaderCircle } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";

const Protected = ({ children }) => {
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
