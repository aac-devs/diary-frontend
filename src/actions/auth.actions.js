import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";
import { noteLogout } from "./notes.actions";
import {
  finishLoading,
  removeError,
  setError,
  startLoading,
} from "./ui.actions";

export const startAuth = (type = "renew", email, password, name) => {
  return async (dispatch) => {
    try {
      dispatch(startChecking());
      dispatch(startLoading());
      dispatch(removeError());
      const resp = await (type === "renew"
        ? fetchWithToken("auth/renew")
        : type === "login"
        ? fetchWithoutToken("auth", { email, password }, "POST")
        : fetchWithoutToken("auth/new", { name, email, password }, "POST"));
      const body = await resp.json();
      const { ok, uid, name: userName, token, msg, errors } = body;
      if (ok) {
        localStorage.setItem("token", token);
        localStorage.setItem("token-init-date", new Date().getTime());
        dispatch(login({ uid, userName }));
      } else {
        const message = msg ? msg : errors ? errors : "";
        dispatch(setError(message));
      }
      dispatch(finishLoading());
      dispatch(finishChecking());
    } catch (error) {
      console.log(`Something went wrong fetching data!`);
    }
  };
};

const login = ({ uid, userName: name }) => ({
  type: types.auth.login,
  payload: { uid, name },
});

const startChecking = () => ({
  type: types.auth.startChecking,
});

const finishChecking = () => ({
  type: types.auth.finishChecking,
});

export const startLogout = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    dispatch(removeError());
    localStorage.removeItem("token");
    localStorage.removeItem("token-init-date");
    dispatch(logout());
    dispatch(noteLogout());
    dispatch(finishLoading());
  };
};

export const logout = () => ({
  type: types.auth.logout,
});
