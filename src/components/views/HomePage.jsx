import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoadingNotes } from "../../actions/notes.actions";
import useWindowDimensions from "../../hooks/useWindowDimension";
import { ActiveNote } from "../content/ActiveNote";
import { NotesList } from "../content/NotesList";

export const HomePage = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);
  const { name } = useSelector((state) => state.auth);
  const { notes } = useSelector((state) => state.notes);
  const { height, width, orientation } = useWindowDimensions();
  let size = 0;

  if (width <= 1100) {
    size = width;
  } else {
    size = 1100;
  }

  console.log("******************Renderiza Home Page");

  useEffect(() => {
    console.log("useEffect HomePage");
    dispatch(startLoadingNotes());
  }, [dispatch]);

  console.log(notes);

  if (loading) {
    return <h5>Espere...</h5>;
  }

  console.log("size:", size);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "pink",
      }}
    >
      <h4>{name}</h4>
      <h3>
        width: {width} ~ height: {height}, orientation: {orientation}
      </h3>
      <div
        style={{
          // margin: "0 auto",
          width: `${size}px`,
          backgroundColor: "yellow",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <NotesList screen={width} />
        {width >= 768 && <ActiveNote screen={width} />}
      </div>
    </div>
  );
};
