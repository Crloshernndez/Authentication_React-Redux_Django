import { useEffect } from "react";
import { connect } from "react-redux";

import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";
import { checkAuthentication, load_user } from "../redux/actions/authentication/auth";

const Layout = ({ checkAuthentication, load_user, children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    checkAuthentication();
    load_user();
  });

  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default connect(null, {
  checkAuthentication,
  load_user,
})(Layout);
