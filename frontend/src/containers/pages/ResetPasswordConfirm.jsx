import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

import { confirm_password } from "../../redux/actions/authentication/auth";

const ResetPasswordConfirm = ({ match, confirm_password }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const params = useParams();

  const [requestSend, setRequestSend] = useState(false);
  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });

  const { new_password, re_new_password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const uid = params.uid;
    const token = params.token;

    confirm_password(uid, token, new_password, re_new_password);
    setRequestSend(true);
  };

  if (requestSend) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="container mt-5">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group mt-3">
            <input
              className="form-control"
              type="password"
              placeholder="New Password"
              name="new_password"
              value={new_password}
              onChange={(e) => onChange(e)}
              minLength="6"
              required
            />
          </div>
          <div className="form-group mt-3">
            <input
              className="form-control"
              type="password"
              placeholder="Confirm New Password"
              name="re_new_password"
              value={re_new_password}
              onChange={(e) => onChange(e)}
              minLength="6"
              required
            />
          </div>
          <button className="btn btn-primary mt-3" type="submit">
            Reset Password
          </button>
        </form>
      </div>
    </>
  );
};

export default connect(null, { confirm_password })(ResetPasswordConfirm);
