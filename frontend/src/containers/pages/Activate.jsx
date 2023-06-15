import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

// import Layout from "../../hocs/Layout";
import { activate_user } from "../../redux/actions/authentication/auth";

const Activate = ({ activate_user }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const params = useParams();
  const [activate, setActivate] = useState(false);

  const activateAccount = (e) => {
    const uid = params.uid;
    const token = params.token;

    activate_user(uid, token);
    setActivate(true);
  };

  if (activate) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="container">
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ marginTop: "200px" }}>
          <h1>Verify your Account:</h1>
          <button onClick={activateAccount} style={{ marginTop: "50px" }} type="button" className="btn btn-primary">
            Verify
          </button>
        </div>
      </div>
    </>
  );
};

export default connect(null, {
  activate_user,
})(Activate);
