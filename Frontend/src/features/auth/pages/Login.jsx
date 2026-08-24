import "../auth.form.scss";
import { Link } from "react-router";

const Login = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>

        <form onSubmit={(e) => handleSubmit(e)}>
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
            Log In
          </button>
        </form>

        <p className="account-text">Don't have an account? <Link to="/register">Sign Up</Link></p>
      </div>
    </main>
  );
};

export default Login;
