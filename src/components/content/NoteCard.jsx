import { useDispatch } from "react-redux";
import { activeNote } from "../../actions/notes.actions";

export const NoteCard = ({ id, title, body, date }) => {
  const dispatch = useDispatch();

  const handleNoteClick = () => {
    dispatch(
      activeNote(id, {
        title,
        body,
        date,
      })
    );
  };
  // console.log({ id, title, body, date });

  return (
    <div
      style={{
        width: "100%",
        border: "1px solid black",
      }}
      onClick={handleNoteClick}
    >
      <h3>{title}</h3>
      <p>{body}</p>
      <h5>{date}</h5>
    </div>
  );
};
