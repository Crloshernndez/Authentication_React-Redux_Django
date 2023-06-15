import { Fragment } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "../../redux/actions/authentication/auth";

const Navbar = ({ logout, isAuthenticated }) => {
  const logout_user = () => {
    logout();
    return <Navigate to="/login" />;
  };

  const guestLinks = () => (
    <Fragment>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          Register
        </Link>
      </li>
    </Fragment>
  );

  const authLinks = () => (
    <li className="nav-item">
      <a className="nav-link" href="#!" onClick={logout_user}>
        Logout
      </a>
    </li>
  );
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
        <Link className="navbar-brand" to="/">
          Auth System
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">{isAuthenticated ? authLinks() : guestLinks()}</ul>
        </div>
      </nav>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  logout,
})(Navbar);
