import { fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";
import {
  finishLoading,
  removeError,
  setError,
  startLoading,
} from "./ui.actions";

export const startLoadingNotes = () => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      dispatch(removeError());
      const resp = await fetchWithToken("notes");
      const { ok, notes, msg } = await resp.json();
      if (ok) {
        dispatch(loadNotes(notes));
      } else {
        console.log(msg);
        dispatch(setError(msg));
      }
      dispatch(finishLoading());
    } catch (error) {
      console.log(`Something went wrong fetching data!`);
    }
  };
};

const loadNotes = (notes) => ({
  type: types.notes.load,
  payload: notes,
});

export const activeNote = (id, note) => ({
  type: types.notes.active,
  payload: {
    id,
    ...note,
  },
});
