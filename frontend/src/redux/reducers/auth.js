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
} from "../actions/authentication/types";

const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: null,
  user: null,
};

export default function auth(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("access", payload.access);
      return {
        ...state,
        isAuthenticated: true,
        access: payload.access,
        refresh: payload.refresh,
      };

    case LOGOUT:
    case LOGIN_FAIL:
    case REGISTRATION_FAIL:
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...state,
        access: null,
        isAuthenticated: false,
        refresh: null,
        user: null,
      };

    case REGISTRATION_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      };

    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };

    case AUTHENTICATED_FAIL:
      return {
        ...state,
        isAuthenticated: false,
      };

    case USER_LOADED_SUCCESS:
      return {
        ...state,
        user: payload,
      };

    case USER_LOADED_FAIL:
      return {
        ...state,
        user: null,
      };

    case PASSWORD_RESET_FAIL:
    case PASSWORD_RESET_SUCCESS:
    case PASSWORD_RESET_CONFIRM_FAIL:
    case PASSWORD_RESET_CONFIRM_SUCCESS:
    case ACTIVATION_FAIL:
    case ACTIVATION_SUCCESS:
      return {
        ...state,
      };

    default:
      return state;
  }
}
