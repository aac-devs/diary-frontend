import { types } from "../types/types";

const initialState = {
  checking: true,
  // uid: '1',
  // name: 'Andres Arana Castillo',
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.auth.login:
      return {
        // uid: action.payload.uid,
        // name: action.payload.displayName,
      };
    case types.auth.checkingFinish:
      return {
        ...state,
        checking: false,
      };
    case types.auth.logout:
      return {};
    default:
      return state;
  }
};
