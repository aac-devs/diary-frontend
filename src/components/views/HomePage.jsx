import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoadingNotes } from "../../actions/notes.actions";

export const HomePage = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);
  const { name } = useSelector((state) => state.auth);
  const { notes } = useSelector((state) => state.notes);

  console.log("******************Renderiza Home Page");

  useEffect(() => {
    console.log("useEffect HomePage");
    dispatch(startLoadingNotes());
  }, [dispatch]);

  console.log(notes);

  if (loading) {
    return <h5>Espere...</h5>;
  }

  return (
    <div>
      <h4>{name}</h4>
    </div>
  );
};
