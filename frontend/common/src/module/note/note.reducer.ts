import { createSlice } from '@reduxjs/toolkit';

import {
  INote,
  Tag,
  NoteColor,
  TagColor,
  TagIcon,
  Mode,
} from '../../interfaces';
import { addTagToNoteAction, createNoteAction, createTagAndAddToNoteAction, deleteNoteAction, fetchNoteAction, fetchNotesAction, removeTagToNoteAction, setSelectedNoteIdAction, updateNoteActionAction } from './note.actions';
import { initialNotesState } from './note.state';

const notes = createSlice({
  name: 'notes',
  initialState: initialNotesState,
  extraReducers: (builder) => {
    builder
      // setSelectedNoteId
      .addCase(setSelectedNoteIdAction, (state, action) => {
        console.log('setSelectedNoteId', action);

        state.selectedNoteId = action.payload.selectedNoteId;
      })

      // fetchNoteThunk
      .addCase(fetchNoteAction.pending, (state, action) => {
        console.log('fetchNote.pending');
        state.error = null;

        const noteId = action.meta.arg.noteId;
        const note = state.notesCache[noteId];
        const newNotes = { ...state.notes, [noteId]: note };
        state.notes = newNotes;
      })
      .addCase(fetchNoteAction.fulfilled, (state, action) => {
        console.log('fetchNote.fulfilled', state, action);

        const noteId = action.meta.arg.noteId;
        const note = action.payload.note;
        const newNotes = { ...state.notes, [noteId]: note };
        state.notes = newNotes;
        state.notesCache = newNotes;
      })
      .addCase(fetchNoteAction.rejected, (state, action) => {
        console.log('# fetchNote.rejected', action);

        if (!navigator.onLine) {
          return;
        }
        // TODO: Need fallback to this optimistic rendering
        // state.isLoading = false;
        // state.error = action.error.message;
      })

      // fetchNotes
      .addCase(fetchNotesAction.pending, (state, action) => {
        console.log('# fetchNotes.pending', action);

        if (Object.keys(state.notes).length === 0) {
          state.isLoading = true;
        }
        state.error = null;
      })
      .addCase(fetchNotesAction.fulfilled, (state, action) => {
        console.log('# fetchNotes.fulfilled', action);

        state.isLoading = false;
        state.error = null;
        var notes = action.payload.notes;
        state.notes = notes;
        state.notesCache = notes;
      })
      .addCase(fetchNotesAction.rejected, (state, action) => {
        console.log('# fetchNotes.rejected', state, action);

        if (!navigator.onLine) {
          return;
        }
        state.isLoading = false;
        // state.error = action.error.message;
      })

      // createNoteThunk
      .addCase(createNoteAction.pending, (state, action) => {
        console.log('createNoteThunk.pending', state, action);

        const note: INote = {
          ...action.meta.arg.createNoteDTO,
          color: NoteColor.GRAY,
          createDate: new Date().toISOString(),
          updateDate: new Date().toISOString(),
          isFav: false,
          tags: [],
        };
        const noteId = note.id;
        state.notes[noteId] = note;
      })
      .addCase(createNoteAction.fulfilled, (state, action) => {
        console.log('createNoteThunk.fulfilled', state, action);

        const note: INote = action.payload.note;

        state.notes[note.id] = note;
        state.notesCache[note.id] = note;
      })
      .addCase(createNoteAction.rejected, (state, action) => {
        console.log('createNoteThunk.rejected', state, action);

        if (!navigator.onLine) {
          return;
        }

        const noteId = action.meta.arg.createNoteDTO.id;
        const note = state.notesCache[noteId];
        state.notes[note.id] = note;
      })

      // updateNoteThunk
      .addCase(updateNoteActionAction.pending, (state, action) => {
        console.log('updateNoteThunk.pending', state, action);

        // Optimistic rendering
        const noteId = action.meta.arg.updateNoteDTO.id;
        if (noteId) {
          const note = state.notes[noteId];
          const newNote = {
            ...note,
            ...action.meta.arg.updateNoteDTO,
            noteId: noteId,
          };
          const notes = { ...state.notes, [noteId]: newNote };

          state.notes = notes;
          state.notesCache = notes;
        }
      })
      .addCase(updateNoteActionAction.fulfilled, (state, action) => {
        console.log('updateNoteThunk.fulfilled', state, action);

        const note = action.payload.note;
        const noteId = note.id;
        const notes = { ...state.notes, [noteId]: note };

        state.notes = notes;
        state.notesCache = notes;
      })
      .addCase(updateNoteActionAction.rejected, (state, action) => {
        console.log('updateNoteThunk.rejected', state, action);

        if (!navigator.onLine) {
          return;
        }

        // Rollback delete action with note from cache
        // TODO: Display error to user (notification)
        const noteId = action.meta.arg.updateNoteDTO.id;
        if (noteId) {
          const noteCached = state.notesCache[noteId];
          const notes = { ...state.notes, [noteId]: noteCached };

          state.notes = notes;
          state.notesCache = notes;
        }
      })

      // deleteNoteThunk
      .addCase(deleteNoteAction.pending, (state, action) => {
        console.log('deleteNoteThunk.pending', state, action);

        const noteId = action.meta.arg.noteId;
        const notes = { ...state.notes };
        delete notes[noteId];

        state.notes = notes;
        state.notesCache = notes;
      })
      .addCase(deleteNoteAction.fulfilled, (state, action) => {
        console.log('deleteNoteThunk.fulfilled', action);

        const noteId = action.meta.arg.noteId;
        const notes = { ...state.notes };
        delete notes[noteId];

        state.notes = notes;
        state.notesCache = notes;
      })
      .addCase(deleteNoteAction.rejected, (state, action) => {
        console.log('deletNoteThunk.rejected', action);

        if (!navigator.onLine) {
          return;
        }
        // Rollback delete action with note from cache
        // TODO: Display error to user (notification)
        const noteId = action.meta.arg.noteId;
        const noteCached = state.notesCache[noteId];
        const notes = { ...state.notes, [noteId]: noteCached };

        state.notes = notes;
        state.notesCache = notes;
      })

      // createTagAndAddToNoteAction
      .addCase(createTagAndAddToNoteAction.pending, (state, action) => {
        console.log('createTagAndAddToNoteAction.pending', action);

        const tempTagId = action.meta.requestId;
        const tag: Tag = {
          id: tempTagId,
          color: action.meta.arg.noteActionDTO.tagColor
            ? TagColor[action.meta.arg.noteActionDTO.tagColor]
            : TagColor.GRAY,
          name: action.meta.arg.noteActionDTO.tagName || '',
          icon: action.meta.arg.noteActionDTO.tagIcon
            ? TagIcon[action.meta.arg.noteActionDTO.tagIcon]
            : TagIcon.TAG,
          createDate: new Date().toISOString(),
          updateDate: new Date().toISOString(),
          isActive: true,
          mode: Mode.Default, // TODO: Is this required ?
        };

        const noteId = action.meta.arg.noteActionDTO.noteId;
        const note = state.notes[noteId];
        note.tags.push(tag);

        state.notes[noteId] = note;
      })
      .addCase(createTagAndAddToNoteAction.fulfilled, (state, action) => {
        console.log('createTagAndAddToNoteAction.fulfilled', action);

        const note: INote = action.payload.note;
        const noteId = note.id;

        state.notes[noteId] = note;
        state.notesCache[noteId] = note;
      })
      .addCase(createTagAndAddToNoteAction.rejected, (state, action) => {
        console.log('createTagAndAddToNoteAction.rejected', action);

        if (!navigator.onLine) {
          return;
        }
        const noteId = action.meta.arg.noteActionDTO.noteId;
        const noteCached = state.notesCache[noteId];
        state.notes[noteId] = noteCached;
      })

      // addTagToNoteAction
      .addCase(addTagToNoteAction.pending, (state, action) => {
        console.log('addTagToNoteAction.pending', action);

        const noteId = action.meta.arg.noteActionDTO.noteId;
        const tag = action.meta.arg.tag;
        const note = state.notes[noteId];

        note.tags.push(tag);
        state.notes[noteId] = note;
      })
      .addCase(addTagToNoteAction.fulfilled, (state, action) => {
        console.log('addTagToNoteAction.fulfilled', action);

        const note = action.payload.note;
        const noteId = note.id;

        state.notes[noteId] = note;
        state.notesCache[noteId] = note;
      })
      .addCase(addTagToNoteAction.rejected, (state, action) => {
        console.log('addTagToNoteAction.rejected', action);

        if (!navigator.onLine) {
          return;
        }
        // const noteId = action.meta.arg.noteActionDTO.noteId;
        // const note = state.notesCache[noteId];
        // state.notes[noteId] = note;
      })

      // removeTagToNoteAction
      .addCase(removeTagToNoteAction.pending, (state, action) => {
        console.log('removeTagToNoteAction.pending', action);

        const noteId = action.meta.arg.noteActionDTO.noteId;
        const tagId = action.meta.arg.noteActionDTO.noteId;
        const note = state.notes[noteId];
        const tags = note.tags.filter((tag) => {
          return tag.id !== tagId;
        });

        note.tags = tags;
        state.notes[noteId] = note;
      })
      .addCase(removeTagToNoteAction.fulfilled, (state, action) => {
        console.log('removeTagToNoteAction.fulfilled', action);

        const note = action.payload.note;
        const tagId = action.meta.arg.noteActionDTO.tagId;
        const noteId = note.id;
        const tags = note.tags.filter((tag) => {
          return tag.id !== tagId;
        });

        note.tags = tags;
        state.notes[noteId] = note;
        state.notesCache[noteId] = note;
      })
      .addCase(removeTagToNoteAction.rejected, (state, action) => {
        console.log('removeTagToNoteAction.rejected', action);

        if (!navigator.onLine) {
          return;
        }
        const noteId = action.meta.arg.noteActionDTO.noteId;
        const noteCached = state.notesCache[noteId];
        state.notes[noteId] = noteCached;
      });
  },
  reducers: {},
});

export default notes.reducer;
