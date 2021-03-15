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

export const deactiveNote = () => ({
  type: types.notes.unactive,
});

export const selectNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    dispatch(activeNote(null, newNote));
  };
};

export const startSaveNote = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(startLoading());
      dispatch(removeError());
      const {
        active: { id, date },
      } = getState().notes;
      data.date = date;
      const endpoint = id ? `notes/${id}` : "notes";
      const method = id ? "PUT" : "POST";
      const resp = await fetchWithToken(endpoint, data, method);
      const { ok, note, msg } = await resp.json();
      console.log({ note });
      if (ok) {
        const { id, uid, ...rest } = note;
        method === "POST"
          ? dispatch(addNewNote(id, rest))
          : dispatch(refreshNote(id, rest));

        dispatch(activeNote(id, rest));
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

export const addNewNote = (id, note) => ({
  type: types.notes.addNew,
  payload: {
    id,
    ...note,
  },
});

export const noteLogout = () => ({
  type: types.notes.logoutCleaning,
});

export const refreshNote = (id, note) => ({
  type: types.notes.updated,
  payload: {
    id,
    note: {
      id,
      ...note,
    },
  },
});
