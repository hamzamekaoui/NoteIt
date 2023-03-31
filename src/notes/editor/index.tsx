import { ChangeEvent } from "react";
import { Note } from "../types";
import "./styles.scss";

type Props = {
  note: Note;
  updateTitleHandler: Function;
  updateContentHandler: Function;
};

const NoteEditor = ({
  note,
  updateTitleHandler,
  updateContentHandler,
}: Props) => {
  const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateTitleHandler(event.target.value);
  };

  const onContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    updateContentHandler(event.target.value);
  };

  return (
    <div className="editor">
      <input onChange={onTitleChange} value={note.title}></input>
      <hr />
      <textarea onChange={onContentChange} value={note.content}></textarea>
      <i>Last edited: {note.lastEdited} </i>
    </div>
  );
};

export default NoteEditor;
