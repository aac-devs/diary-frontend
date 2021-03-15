import { useSelector } from "react-redux";

export const NoteAppbar = ({
  date,
  showDeleteButton,
  showSaveButton,
  handleSaveNote,
}) => {
  const {
    active: { id },
  } = useSelector((state) => state.notes);
  console.log({ id });
  const buttonMsg = id ? "Update" : "Save";

  return (
    <div style={{ border: "1px solid black" }}>
      <span>{date}</span>
      {showSaveButton && <button onClick={handleSaveNote}>{buttonMsg}</button>}
      {showDeleteButton && <button>Delete</button>}
    </div>
  );
};
