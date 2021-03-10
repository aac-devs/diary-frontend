import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AppRouter } from "./routers/app.routes";

export const DairyApp = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};
