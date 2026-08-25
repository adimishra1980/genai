import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { LoaderCircle } from "lucide-react";
import "../auth.form.scss";
import { useAuth } from "../hooks/useAuth.ts";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { loading, error, handleRegister } = useAuth();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    await handleRegister({ username, email, password });
    navigate("/");
  };

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="button primary-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <LoaderCircle className="loader" />
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        {error && <p className="error-text">{error}</p>}

        <p className="account-text">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
