import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startChecking } from "../actions/auth.actions";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid, name } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) {
    return <h5>Espere...</h5>;
  }
  console.log({ uid, name });

  return (
    <div>
      <h1>App Router</h1>
    </div>
  );
};
