import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import { login } from "../../redux/actions/authentication/auth";

const Login = ({ login, isAuthenticated }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    login(email, password);
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="container mt-5">
        <h1>Sign In</h1>
        <p>Sing into your Account</p>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input className="form-control" type="email" placeholder="Email" name="email" value={email} onChange={(e) => onChange(e)} required />
          </div>
          <div className="form-group mt-3">
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              minLength="6"
              required
            />
          </div>
          <button className="btn btn-primary mt-3" type="submit">
            Login
          </button>
        </form>
        <p className="mt-3">
          Dont have an account? <Link to="/register">Register here</Link>
        </p>
        <p className="mt-3">
          Forgot your password? <Link to="/reset_password">Reset password</Link>
        </p>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  login,
})(Login);
