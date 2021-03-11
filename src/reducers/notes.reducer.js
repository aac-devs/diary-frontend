/*
  {
    notes: [],
    active: null,
    active: {
      id: 'fdahgdaodfjaklga4578safd',
      title: '',
      body: '',
      imageUrl: '',
      date: 124848338754
    }
  }
*/

import { types } from "../types/types";

const initialState = {
  count: 0,
  notes: [],
  active: null,
};

export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.notes.active:
      return {
        ...state,
        active: {
          ...action.payload,
        },
      };
    case types.notes.addNew:
      return {
        ...state,
        notes: [action.payload, ...state.notes],
      };
    case types.notes.load:
      return {
        ...state,
        count: action.payload.count,
        notes: [...action.payload.rows],
      };
    case types.notes.updated:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload.note : note
        ),
      };
    case types.notes.delete:
      return {
        ...state,
        active: null,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    case types.notes.logoutCleaning:
      return {
        ...state,
        notes: [],
        active: null,
      };
    default:
      return state;
  }
};
