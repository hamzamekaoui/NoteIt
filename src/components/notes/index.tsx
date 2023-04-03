import { ChangeEvent, useEffect, useState } from "react";
import { Note } from "../../types";
import { Tab } from "../list";
import { Descendant } from "slate";
import { Toolbar } from "../toolbar";
import { Button } from "../button";
import { Icon } from "../icon";
import RichTextEditor from "../editor";
import "./styles.scss";

const DEFAULT_TITLE = "Give your note a title...";
const DEFAULT_CONTENT = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];
const NOTES_KEY = "notes";
const CONTENT_PLACEHOLDER = "Write down your note..."

const generateDefaultNote = (): Note => {
  const note = new Object({
    id: crypto.randomUUID(),
    title: DEFAULT_TITLE,
    content: DEFAULT_CONTENT,
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

  const updateContent = (content: Descendant[]) => {
    setNotes(
      notes.map((note) => {
        if (note.id === currentNoteId) {
          note.content = content;
        }
        return note;
      })
    );
  };

  const updateTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setNotes(
      notes.map((note) => {
        if (note.id === currentNoteId) {
          note.title = event.target.value;
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
      <aside className="bar">
        <Tab
          notes={notes}
          currentNoteId={currentNoteId}
          updateCurrentNoteIdHandler={updateCurrentNoteId}
        />
        <Toolbar className="actions">
          <Button hover onMouseDown={addNote}>
            <Icon>add_box</Icon>
          </Button>
          <Button hover onMouseDown={deleteNote}>
            <Icon>delete</Icon>
          </Button>
        </Toolbar>
      </aside>
      <div className="editor">
        <input onChange={updateTitle} value={currentNote.title}></input>
        <hr />
        <div>
          <RichTextEditor
            key={currentNote.id}
            placeholder={CONTENT_PLACEHOLDER}
            value={currentNote.content}
            updateContentHandler={updateContent}
          />
        </div>
      </div>
    </>
  );
};

export default Notes;
