import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";
import Error404 from "./containers/error/Error404";
import Home from "./containers/pages/Home";
import Login from "./containers/pages/Login";
import Layout from "./hocs/Layout";
import Register from "./containers/pages/Register";
import Activate from "./containers/pages/Activate";
import ResetPassword from "./containers/pages/ResetPassword";
import ResetPasswordConfirm from "./containers/pages/ResetPasswordConfirm";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            {/* Error Display */}
            <Route path="*" element={<Error404 />} />

            {/* Home Display */}
            <Route exact path="/" element={<Home />} />
            {/* Login Display */}
            <Route exact path="/login" element={<Login />} />
            {/* Display Register */}
            <Route exact path="/register" element={<Register />} />
            {/* Display Activate */}
            <Route exact path="/activate/:uid/:token" element={<Activate />} />
            {/* Display Reset Password */}
            <Route exact path="/reset_password" element={<ResetPassword />} />
            {/* Display Reset Password confirm */}
            <Route exact path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
