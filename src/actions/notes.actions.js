import { fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";
import {
  finishLoading,
  removeError,
  setError,
  startLoading,
} from "./ui.actions";

// Inicia la petición al backend para cargar todas las notas del usuario logueado
export const startLoadingNotes = () => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      dispatch(removeError());
      const resp = await fetchWithToken("notes");
      const { ok, notes, msg } = await resp.json();
      ok ? dispatch(loadNotes(notes)) : dispatch(setError(msg));
      dispatch(finishLoading());
    } catch (error) {
      console.log(`Something went wrong fetching data!`);
    }
  };
};

// Carga la lista de notas leídas desde el backend a la lista del redux
const loadNotes = (notes) => ({
  type: types.notes.load,
  payload: notes,
});

// Carga la nota activa del redux con la nota que se desea actualizar
export const activeNote = (id, note) => ({
  type: types.notes.active,
  payload: {
    id,
    ...note,
  },
});

// Limpia la nota activa del redux
export const deactiveNote = () => ({
  type: types.notes.unactive,
});

// Carga la nota activa del redux con una nueva nota que se desea crear
export const selectNewNote = () => {
  return async (dispatch) => {
    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };
    dispatch(activeNote(null, newNote));
  };
};

// Inicia la petición al backend para crear una nueva nota o para actualizar una ya existente
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
      if (ok) {
        const { id, uid, ...rest } = note;
        method === "POST"
          ? dispatch(addNewNote(id, rest))
          : dispatch(refreshNote(id, rest));
        dispatch(activeNote(id, rest));
      } else {
        dispatch(setError(msg));
      }
      dispatch(finishLoading());
    } catch (error) {
      console.log(`Something went wrong fetching data!`);
    }
  };
};

// Agrega una nueva nota a la lista de notas del redux
const addNewNote = (id, note) => ({
  type: types.notes.addNew,
  payload: {
    id,
    ...note,
  },
});

// Limpia la lista de notas, la nota activa, etc. del redux, cuando el usuario cierra sesión
export const noteLogout = () => ({
  type: types.notes.logoutCleaning,
});

// Actualiza la lista de notas del redux
const refreshNote = (id, note) => ({
  type: types.notes.updated,
  payload: {
    id,
    note: {
      id,
      ...note,
    },
  },
});

// Inicia la petición al backend para la eliminación de una nota
export const startDeleting = (id) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      dispatch(removeError());
      const resp = await fetchWithToken(`notes/${id}`, undefined, "DELETE");
      const { ok, msg } = await resp.json();
      ok ? dispatch(deleteNote(id)) : dispatch(setError(msg));
      dispatch(finishLoading());
    } catch (error) {
      console.log(`Something went wrong fetching data!`);
    }
  };
};

// Borra la nota de las lista de notas del redux
const deleteNote = (id) => ({
  type: types.notes.delete,
  payload: id,
});

// Inicia la petición al backend para la eliminación de todas las notas
export const startDeleteAllNotes = () => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      dispatch(removeError());
      const resp = await fetchWithToken(`notes`, undefined, "DELETE");
      const { ok, msg } = await resp.json();
      ok ? dispatch(noteLogout()) : dispatch(setError(msg));
      dispatch(finishLoading());
    } catch (error) {
      console.log(`Something went wrong fetching data!`);
    }
  };
};
