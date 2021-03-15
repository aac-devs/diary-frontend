import { useDispatch, useSelector } from "react-redux";
import { NoteCard } from "./NoteCard";
import styled from "styled-components";
import { deactiveNote, selectNewNote } from "../../actions/notes.actions";
import { startLogout } from "../../actions/auth.actions";

const Box = styled.div`
  border: 1px solid black;
  background-color: wheat;
  width: ${(props) => props.size};
`;

export const NotesList = () => {
  const dispatch = useDispatch();
  const { notes } = useSelector((state) => state.notes);
  const { name } = useSelector((state) => state.auth);

  const handleAddNew = () => {
    // dispatch(deactiveNote());
    dispatch(selectNewNote());
  };

  const handleLogout = () => {
    dispatch(startLogout());
  };

  return (
    <Box size={`${300}px`}>
      {notes && (
        <>
          <span>{name}</span>
          <button onClick={handleLogout}>Logout</button>
          <br />
          <button onClick={handleAddNew}>New</button>
          {notes.map((note, index) => (
            <NoteCard key={index} {...note} />
          ))}
        </>
      )}
    </Box>
  );
};
