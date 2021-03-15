import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deactiveNote, startSaveNote } from "../../actions/notes.actions";
import { useForm } from "../../hooks/useForm";
import { NoteAppbar } from "./NoteAppbar";
import { NothingSelected } from "./NothingSelected";

export const ActiveNote = () => {
  const dispatch = useDispatch();
  const { active: note } = useSelector((state) => state.notes);

  const [formValues, handleInputChange, reset] = useForm(note);
  const { title, body } = formValues;

  const activeId = useRef(note.id);

  useEffect(() => {
    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);

  const handleBackToList = () => {
    dispatch(deactiveNote());
  };

  const handleSaveNote = () => {
    dispatch(
      startSaveNote({
        title,
        body,
      })
    );
  };

  return (
    <div
      style={{
        width: `${300}px`,
        border: "1px solid black",
      }}
    >
      <div>
        <NoteAppbar
          date={note.date}
          showDeleteButton={!!note.id}
          showSaveButton={note.title !== title || note.body !== body}
          handleSaveNote={handleSaveNote}
        />
        <>
          <input
            type="text"
            name="title"
            value={title}
            placeholder="Some awesome title"
            onChange={handleInputChange}
          />
          <textarea
            name="body"
            value={body}
            onChange={handleInputChange}
            placeholder="What happened today??"
          ></textarea>
          <button onClick={handleBackToList}>back</button>
        </>
      </div>
      {/* {!active && <NothingSelected />} */}
    </div>
  );
};
