import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { startAuth } from "../actions/auth.actions";
import { HomePage } from "../components/views/HomePage";
import { AuthRouter } from "./auth.routes";
import { PrivateRoute } from "./private.routes";
import { PublicRoute } from "./public.routes";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, logged: isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startAuth());
  }, [dispatch]);

  if (checking) {
    return <h5>Espere...</h5>;
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            path="/auth"
            component={AuthRouter}
            isAuthenticated={isLoggedIn}
          />
          <PrivateRoute
            exact
            path="/"
            component={HomePage}
            isAuthenticated={isLoggedIn}
          />
        </Switch>
      </div>
    </Router>
  );
};
