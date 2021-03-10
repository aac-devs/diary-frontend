import { combineReducers } from "redux";
import { authReducer } from "./auth.reducer";
import { notesReducer } from "./notes.reducer";
import { uiReducer } from "./ui.reducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  notes: notesReducer,
  ui: uiReducer,
});
