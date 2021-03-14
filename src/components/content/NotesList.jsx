import { useSelector } from "react-redux";
import { Note } from "./Note";

export const NotesList = ({ screen }) => {
  const { notes } = useSelector((state) => state.notes);
  console.log(notes);
  let size = 0;

  if (screen < 768) {
    size = screen - 20;
  } else if (screen < 1100) {
    size = Math.floor((screen - 30) / 2);
  } else {
    size = 500;
  }
  if (size > 500) {
    size = 500;
  }
  if (size < 300) {
    size = 300;
  }

  console.log(size);

  return (
    <div
      style={{
        width: `${size}px`,
        border: "1px solid black",
      }}
    >
      <h1>NotesList</h1>
      {notes && notes.map((note) => <Note key={note.id} {...note} />)}
    </div>
  );
};
