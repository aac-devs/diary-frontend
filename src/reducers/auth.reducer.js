import { types } from "../types/types";

const initialState = {
  checking: true,
  logged: false,
  uid: null,
  name: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.auth.startChecking:
      return {
        ...state,
        checking: true,
      };
    case types.auth.finishChecking:
      return {
        ...state,
        checking: false,
      };
    case types.auth.login:
      return {
        ...state,
        ...action.payload,
        logged: true,
      };
    case types.auth.logout:
      return initialState;
    default:
      return state;
  }
};
