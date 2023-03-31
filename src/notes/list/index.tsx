import { Note } from "../types";
import "./styles.scss";

type Props = {
  notes: Note[];
  currentNoteId: string;
  updateCurrentNoteIdHandler: Function;
};

const NoteList = ({
  notes,
  currentNoteId,
  updateCurrentNoteIdHandler,
}: Props) => {
  const selectedClassName = (id: string) =>
    id === currentNoteId ? "selected" : "";
  return (
    <ul className="list">
      {notes.map((note) => (
        <li
          className={selectedClassName(note.id)}
          key={note.id}
          onClick={() => updateCurrentNoteIdHandler(note.id)}
        >
          {note.title}
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
