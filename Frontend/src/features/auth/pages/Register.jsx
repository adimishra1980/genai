import { useNavigate, Link } from "react-router";
import "../auth.form.scss";

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/login");
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
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="button primary-button">
            Register
          </button>
        </form>

        <p className="account-text">Already have an account? <Link to="/login">Sign In</Link></p>
      </div>
    </main>
  );
};

export default Register;
