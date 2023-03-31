export type Note = {
  id: string;
  title: string;
  content: string;
  lastEdited: string;
};

export type NoteCollection = {
  notes: Note[];
  current: string;
}