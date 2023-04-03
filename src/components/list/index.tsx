import { Note } from "../../types";
import "./styles.scss";

type Props = {
  notes: Note[];
  currentNoteId: string;
  updateCurrentNoteIdHandler: Function;
};

export const Tab = ({
  notes,
  currentNoteId,
  updateCurrentNoteIdHandler,
}: Props) => {
  const isSelected = (id: string): boolean => id === currentNoteId;
  return (
    <ul className="list">
      {notes.map((note) => (
        <li
          {...(isSelected(note.id) ? { className: "selected" } : {})}
          key={note.id}
          onClick={() => updateCurrentNoteIdHandler(note.id)}
        >
          {note.title}
        </li>
      ))}
    </ul>
  );
};
