import { fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";

export const startChecking = () => {
  return async (dispatch) => {
    console.log("startChecking");
    const resp = await fetchWithToken("auth/renew");
    const body = await resp.json();
    if (body.ok) {
      console.log("si checking");
      // localStorage.setItem("token", body.token);
      // localStorage.setItem("token-init-date", new Date().getTime());
      // dispatch(
      //   login({
      //     uid: body.uid,
      //     name: body.name,
      //   })
      // );
    } else {
      console.log("no checking");
      dispatch(checkingFinish());
    }
  };
};

const checkingFinish = () => ({
  type: types.auth.checkingFinish,
});
