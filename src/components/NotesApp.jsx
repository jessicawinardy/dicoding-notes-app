import React from "react";
import NotesList from "./NotesList";
import { getInitialData, showFormattedDate } from "../utils/index";
import NotesInput from "./NotesInput";
import NotesSearch from "./NotesSearch";

class NotesApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getInitialData(),
    };

    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onDeleteNoteHandler = this.onDeleteNoteHandler.bind(this);
    this.onArchiveNoteHandler = this.onArchiveNoteHandler.bind(this);
    this.onSearchHandler = this.onSearchHandler.bind(this);
  }

  onAddNoteHandler({ title, createdAt, content }) {
    this.setState((prevState) => {
      return {
        notes: [
          ...prevState.notes,
          {
            title,
            createdAt: showFormattedDate(createdAt),
            content,
            id: +new Date(),
            isArchived: false,
          },
        ],
      };
    });
  }

  onArchiveNoteHandler(id) {
    this.setState((prevState) => {
      return {
        notes: prevState.notes.map((note) => {
          if (note.id === id) {
            if (note.archived) {
              return {
                ...note,
                archived: false,
              };
            } else {
              return {
                ...note,
                archived: true,
              };
            }
          }
          return note;
        }),
      };
    });
  }

  onDeleteNoteHandler(id) {
    this.setState((prevState) => {
      return {
        notes: prevState.notes.filter((note) => note.id !== id),
      };
    });
  }

  onSearchHandler(search) {
    this.setState((prevState) => {
      return {
        notes: prevState.notes.filter((note) => {
          return note.title.toLowerCase().includes(search.toLowerCase());
        }),
      };
    });
  }

  render() {
    const archivedNotes = this.state.notes.filter((note) => note.archived);
    const activeNotes = this.state.notes.filter((note) => !note.archived);

    return (
      <div className="notes-app">
        <div className="note-app__header">
            <h1>Notes App</h1>
            <NotesSearch onSearch={this.onSearchHandler}/>
        </div>
        <div className="note-app__body">
          <NotesInput addNote={this.onAddNoteHandler} />
          <h2>Active Notes</h2>
          {activeNotes.length > 0 ? (
            <NotesList
              notes={activeNotes}
              onDelete={this.onDeleteNoteHandler}
              onArchive={this.onArchiveNoteHandler}
            />
          ) : (
            <p className="notes-list__empty-message">No Active Notes</p>
          )}
          <h2>Archived</h2>
          {archivedNotes.length > 0 ? (
            <NotesList
              notes={archivedNotes}
              onDelete={this.onDeleteNoteHandler}
              onArchive={this.onArchiveNoteHandler}
            />
          ) : (
            <p className="notes-list__empty-message">No Archived Notes</p>
          )}
        </div>
      </div>
    );
  }
}
export default NotesApp;
