import { useEffect, useState } from "react";
import { Note } from "./types";
import NoteEditor from "./editor";
import NoteList from "./list";
import Actions from "./actions";
import "./styles.scss";

const DEFAULT_TITLE = "Give your note a title...";
const DEFAULT_CONTENT = "Write down...";
const NOTES_KEY = "notes";

const generateDefaultNote = (): Note => {
  const note = new Object({
    id: crypto.randomUUID(),
    title: DEFAULT_TITLE,
    content: DEFAULT_CONTENT,
    lastEdited: new Date().toUTCString(),
  }) as Note;
  return note;
};

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    let currentNotes;
    const notesJSON = window.localStorage.getItem(NOTES_KEY);
    if (notesJSON) {
      try {
        currentNotes = JSON.parse(notesJSON);
      } catch (error) {
        currentNotes = [generateDefaultNote()];
      }
    } else {
      currentNotes = [generateDefaultNote()];
    }
    return currentNotes;
  });

  const [currentNoteId, setCurrentNoteId] = useState(() => notes[0].id);

  useEffect(() => {
    window.localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    const note = generateDefaultNote();
    setNotes([...notes, note]);
  };

  const deleteNote = () => {
    let filteredNotes = notes.filter((note) => note.id !== currentNoteId);
    if (filteredNotes.length === 0) {
      filteredNotes = [generateDefaultNote()];
    }
    setNotes(filteredNotes);
    setCurrentNoteId(filteredNotes[0].id);
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
