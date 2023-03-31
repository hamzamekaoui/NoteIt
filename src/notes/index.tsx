import { useEffect, useState } from "react";
import { Note } from "./types";
import NoteEditor from "./editor";
import NoteList from "./list";
import Actions from "./actions";
import "./styles.scss";

export const NOTES_KEY = "notes";

export const generateDefaultNote = (): Note => {
  const note = new Object({
    id: crypto.randomUUID(),
    title: "Type your title...",
    content: "Type your content...",
    lastEdited: new Date().toUTCString(),
  }) as Note;
  return note;
};

const Notes = () => {
  console.log("re-render");
  const [notes, setNotes] = useState<Note[]>(() => {
    const currentNote = window.localStorage.getItem(NOTES_KEY);
    return currentNote ? JSON.parse(currentNote) : [generateDefaultNote()];
  });

  const [currentNoteId, setCurrentNoteId] = useState(() => notes[0].id);

  useEffect(() => {
    console.log("effect");
    window.localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    const note = generateDefaultNote();
    setNotes([...notes, note]);
  };

  const deleteNote = () => {
    setNotes(notes.filter((note) => note.id !== currentNoteId));
  };

  const updateContent = (content: string) => {
    setNotes(
      notes.map((note) => {
        if (note.id === currentNoteId) {
          note.content = content;
          note.lastEdited = new Date().toUTCString();
        }
        return note;
      })
    );
  };

  const updateTitle = (title: string) => {
    setNotes(
      notes.map((note) => {
        if (note.id === currentNoteId) {
          note.title = title;
          note.lastEdited = new Date().toUTCString();
        }
        return note;
      })
    );
  };

  const updateCurrentNoteId = (id: string) => {
    setCurrentNoteId(id);
  };

  const currentNote: Note =
    notes.find((note) => note.id === currentNoteId) ?? notes[0];

  return (
    <>
      <div className="bar">
        <NoteList
          notes={notes}
          currentNoteId={currentNoteId}
          updateCurrentNoteIdHandler={updateCurrentNoteId}
        />
        <Actions addNoteHandler={addNote} deleteNoteHandler={deleteNote} />
      </div>
      <NoteEditor
        note={currentNote}
        updateTitleHandler={updateTitle}
        updateContentHandler={updateContent}
      />
    </>
  );
};

export default Notes;
