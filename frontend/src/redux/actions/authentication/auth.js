import axios from "axios";
import {
  LOGOUT,
  LOGIN_SUCCESS,
  ACTIVATION_SUCCESS,
  USER_LOADED_SUCCESS,
  REGISTRATION_SUCCESS,
  AUTHENTICATED_SUCCESS,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  LOGIN_FAIL,
  ACTIVATION_FAIL,
  USER_LOADED_FAIL,
  REGISTRATION_FAIL,
  AUTHENTICATED_FAIL,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_CONFIRM_FAIL,
} from "./types";

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });
  // console.log(await axios.post(`${process.env.REACT_APP_API_URL}auth/jwt/create/`, body, config));

  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}auth/jwt/create/`, body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(load_user());
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const register = (name, email, password, re_password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password, re_password });

  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}auth/users/`, body, config);

    dispatch({
      type: REGISTRATION_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: REGISTRATION_FAIL,
    });
  }
};

export const load_user = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    };

    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}auth/users/me/`, config);

      dispatch({
        type: USER_LOADED_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USER_LOADED_FAIL,
      });
    }
  } else {
    dispatch({
      type: USER_LOADED_FAIL,
    });
  }
};

export const checkAuthentication = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ token: localStorage.getItem("access") });

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}auth/jwt/verify/`, body, config);

      if (res.data.code !== "token_not_valid") {
        dispatch({
          type: AUTHENTICATED_SUCCESS,
        });
      } else {
        dispatch({
          type: AUTHENTICATED_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: AUTHENTICATED_FAIL,
      });
    }
  } else {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
  }
};

export const activate_user = (uid, token) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ uid, token });

  try {
    await axios.post(`${process.env.REACT_APP_API_URL}auth/users/activation/`, body, config);

    dispatch({
      type: ACTIVATION_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: ACTIVATION_FAIL,
    });
  }
};

export const reset_password = (email) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email });

  try {
    await axios.post(`${process.env.REACT_APP_API_URL}auth/users/reset_password/`, body, config);

    dispatch({
      type: PASSWORD_RESET_SUCCESS,
    });

    dispatch(load_user());
  } catch (err) {
    dispatch({
      type: PASSWORD_RESET_FAIL,
    });
  }
};

export const confirm_password = (uid, token, new_password, re_new_password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ uid, token, new_password, re_new_password });

  try {
    await axios.post(`${process.env.REACT_APP_API_URL}auth/users/reset_password_confirm/`, body, config);

    dispatch({
      type: PASSWORD_RESET_CONFIRM_SUCCESS,
    });

    dispatch(load_user());
  } catch (err) {
    dispatch({
      type: PASSWORD_RESET_CONFIRM_FAIL,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
