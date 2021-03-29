import { createSlice, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { INote, NoteColor } from '../../common/interfaces';
import { updateContentAction } from '../editor/editor.actions';
import { withEditorActionReducerMapBuilder } from '../editor/editor.reducer';
import { blockQuoteActionReducerMapBuilder } from '../editor/plugins/blockquote/blockquote.reducer';
import { BulletListActionReducerMapBuilder } from '../editor/plugins/bulletlist/bulletlist.reducer';
import { codeActionReducerMapBuilder } from '../editor/plugins/code/code.reducer';
import { headingOneActionReducerMapBuilder } from '../editor/plugins/headingone/headingone.reducer';
import { headingThreeActionReducerMapBuilder } from '../editor/plugins/headingthree/headingthree.reducer';
import { headingTwoActionReducerMapBuilder } from '../editor/plugins/headingtwo/headingtwo.reducer';
import { NumberedListActionReducerMapBuilder } from '../editor/plugins/numberedlist/numberedlist.reducer';
import { ParagraphActionReducerMapBuilder } from '../editor/plugins/paragraph/paragraph.reducer';
import { tagActionReducerMapBuilder } from '../editor/plugins/tag/tag.reducer';
import {
  addTagToNoteAction,
  createNoteAction,
  createTagAndAddToNoteAction,
  deleteNoteAction,
  fetchNoteAction,
  fetchNotesAction,
  removeTagToNoteAction,
  setSelectedNoteIdAction,
  updateNoteActionAction,
} from './note.actions';
import { initialNotesState, NoteListState } from './note.state';

const NOTE_ACTION = 'NOTES/ACTION';

const actionPendingAfterHook = (state: any, actionNameConst: string): void => {
  // console.log('[x] actionPendingAfterHook', actionNameConst);
  if (state.pendingRequests[actionNameConst] === undefined) {
    state.pendingRequests[actionNameConst] = 0;
  }
  state.pendingRequests[actionNameConst]++;
};
const isRequestPending = (state: any, actionNameConst: string): boolean => {
  // console.log('[x] actionFulfilledBeforeHook', actionNameConst);
  state.pendingRequests[actionNameConst]--;
  if (state.pendingRequests[actionNameConst] > 0) {
    return true;
  } else {
    return false;
  }
};

const notes = createSlice({
  name: 'notes',
  initialState: initialNotesState,
  extraReducers: (builder) => {
    // TODO
    tagActionReducerMapBuilder(
      codeActionReducerMapBuilder(
        blockQuoteActionReducerMapBuilder(
          NumberedListActionReducerMapBuilder(
            BulletListActionReducerMapBuilder(
              headingThreeActionReducerMapBuilder(
                headingTwoActionReducerMapBuilder(
                  headingOneActionReducerMapBuilder(
                    ParagraphActionReducerMapBuilder(
                      withEditorActionReducerMapBuilder(builder)
                    )
                  )
                )
              )
            )
          )
        )
      )
    )
      /**
       * NOTES_SET_SELECTED_NOTE_ID
       */
      .addCase(setSelectedNoteIdAction, (state, action) => {
        console.log('setSelectedNoteId', action);

        state.selectedNoteId = action.payload.selectedNoteId;
      })

      /**
       * NOTES_FETCH_NOTE
       */
      .addCase(fetchNoteAction.pending, (state, action) => {
        console.log('fetchNote.pending');
        state.error = null;

        const noteId = action.meta.arg.noteId;
        const note = state.notes[noteId];
        const newNotes = { ...state.notes, [noteId]: note };
        state.notes = newNotes;
        actionPendingAfterHook(state, String(NOTE_ACTION + noteId));
      })
      .addCase(fetchNoteAction.fulfilled, (state, action) => {
        console.log('fetchNote.fulfilled', action);

        const noteId = action.meta.arg.noteId;
        const note = action.payload.note;
        const newNotes = { ...state.notes, [noteId]: note };

        if (isRequestPending(state, String(NOTE_ACTION + noteId))) {
          return;
        }
        state.notes = newNotes;
        state.notesCache = newNotes;
      })
      .addCase(fetchNoteAction.rejected, (state, action) => {
        console.log('fetchNote.rejected', action);

        if (!navigator.onLine) {
          return;
        }
        const noteId = action.meta.arg.noteId;
        const note = state.notesCache[noteId];
        state.notes[noteId] = note;
      })

      /**
       * NOTES_FETCH_NOTES
       */
      .addCase(fetchNotesAction.pending, (state, action) => {
        console.log('fetchNotes.pending', action);

        if (Object.keys(state.notes).length === 0) {
          state.isLoading = true;
        }
        state.error = null;
      })
      .addCase(fetchNotesAction.fulfilled, (state, action) => {
        console.log('fetchNotes.fulfilled', action);

        state.isLoading = false;
        state.error = null;
        var notes = action.payload.notes;
        state.notes = notes;
        state.notesCache = notes;
      })
      .addCase(fetchNotesAction.rejected, (state, action) => {
        console.log('fetchNotes.rejected', state, action);

        if (!navigator.onLine) {
          return;
        }
        state.isLoading = false;
      })

      /**
       * NOTES_CREATE
       */
      .addCase(createNoteAction.pending, (state, action) => {
        console.log('createNoteAction.pending', state, action);

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
        actionPendingAfterHook(state, String(NOTE_ACTION + noteId));
      })
      .addCase(createNoteAction.fulfilled, (state, action) => {
        console.log('createNoteAction.fulfilled', state, action);

        const note: INote = action.payload.note;
        const noteId = note.id;
        if (isRequestPending(state, String(NOTE_ACTION + noteId))) {
          return;
        }

        state.notes[noteId] = note;
        state.notesCache[noteId] = note;
      })
      .addCase(createNoteAction.rejected, (state, action) => {
        console.log('createNoteAction.rejected', state, action);

        if (!navigator.onLine) {
          return;
        }

        const noteId = action.meta.arg.createNoteDTO.id;
        const note = state.notesCache[noteId];
        if (note) {
          state.notes[note.id] = note;
        } else {
          console.error(`note is undefined`);
        }
      })

      /**
       * NOTES_UPDATE
       */
      .addCase(updateNoteActionAction.pending, (state, action) => {
        console.log('updateNoteThunk.pending', state, action);

        const noteId = action.meta.arg.updateNoteDTO.id;
        const note = state.notes[noteId];
        const newNote: INote = {
          ...note,
          ...action.meta.arg.updateNoteDTO,
        };
        const notes = { ...state.notes, [noteId]: newNote };
        state.notes = notes;
        state.notesCache = notes;
        actionPendingAfterHook(state, String(NOTE_ACTION + noteId));
      })
      .addCase(updateNoteActionAction.fulfilled, (state, action) => {
        console.log('updateNoteThunk.fulfilled', state, action);

        const note = action.payload.note;
        const noteId = note.id;
        const notes = { ...state.notes, [noteId]: note };
        if (isRequestPending(state, String(NOTE_ACTION + noteId))) {
          return;
        }
        state.notes = notes;
        state.notesCache = notes;
      })
      .addCase(updateNoteActionAction.rejected, (state, action) => {
        console.log('updateNoteThunk.rejected', state, action);

        if (!navigator.onLine) {
          return;
        }

        const noteId = action.meta.arg.updateNoteDTO.id;
        const noteCached = state.notesCache[noteId];
        const notes = { ...state.notes, [noteId]: noteCached };
        state.notes = notes;
        state.notesCache = notes;
      })

      /**
       * NOTES_DELETE
       */
      .addCase(deleteNoteAction.pending, (state, action) => {
        console.log('deleteNoteThunk.pending', state, action);

        const noteId = action.meta.arg.noteId;
        const notes = { ...state.notes };
        delete notes[noteId];
        state.notes = notes;
        state.notesCache = notes;
        actionPendingAfterHook(state, String(NOTE_ACTION + noteId));
      })
      .addCase(deleteNoteAction.fulfilled, (state, action) => {
        console.log('deleteNoteThunk.fulfilled', action);

        const noteId = action.meta.arg.noteId;
        const notes = { ...state.notes };
        if (isRequestPending(state, String(NOTE_ACTION + noteId))) {
          return;
        }
        delete notes[noteId];
        state.notes = notes;
        state.notesCache = notes;
      })
      .addCase(deleteNoteAction.rejected, (state, action) => {
        console.log('deletNoteThunk.rejected', action);

        if (!navigator.onLine) {
          return;
        }
        const noteId = action.meta.arg.noteId;
        const noteCached = state.notesCache[noteId];
        const notes = { ...state.notes, [noteId]: noteCached };
        state.notes = notes;
        state.notesCache = notes;
      })

      /**
       * NOTES_CREATE_TAG_AND_ADD_TO_NOTE
       */
      .addCase(createTagAndAddToNoteAction.pending, (state, action) => {
        console.log('createTagAndAddToNoteAction.pending', action);

        const noteActionDTO = action.meta.arg.noteActionDTO;
        const noteId = noteActionDTO.noteId;
        const tag = action.meta.arg.tag;
        state.notes[noteId].tags.push(tag);
        actionPendingAfterHook(state, String(NOTE_ACTION + noteId));
      })
      .addCase(createTagAndAddToNoteAction.fulfilled, (state, action) => {
        console.log('createTagAndAddToNoteAction.fulfilled', action);

        const note: INote = action.payload.note;
        const noteId = note.id;
        if (isRequestPending(state, String(NOTE_ACTION + noteId))) {
          return;
        }
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

      /**
       * NOTES_ADD_TAG_TO_NOTE
       */
      .addCase(addTagToNoteAction.pending, (state, action) => {
        console.log('addTagToNoteAction.pending', action);

        const noteId = action.meta.arg.noteActionDTO.noteId;
        const tag = action.meta.arg.tag;
        const note = state.notes[noteId];
        note.tags.push(tag);
        state.notes[noteId] = note;
        actionPendingAfterHook(state, String(NOTE_ACTION + noteId));
      })
      .addCase(addTagToNoteAction.fulfilled, (state, action) => {
        console.log('addTagToNoteAction.fulfilled', action);

        const note = action.payload.note;
        const noteId = note.id;
        if (isRequestPending(state, String(NOTE_ACTION + noteId))) {
          return;
        }
        state.notes[noteId] = note;
        state.notesCache[noteId] = note;
      })
      .addCase(addTagToNoteAction.rejected, (state, action) => {
        console.log('addTagToNoteAction.rejected', action);

        if (!navigator.onLine) {
          return;
        }
        const noteId = action.meta.arg.noteActionDTO.noteId;
        const note = state.notesCache[noteId];
        state.notes[noteId] = note;
      })

      /**
       * NOTES_REMOVE_TAG_TO_NOTE
       */
      .addCase(removeTagToNoteAction.pending, (state, action) => {
        console.log('removeTagToNoteAction.pending', action);

        const noteId = action.meta.arg.noteActionDTO.noteId;
        const tagId = action.meta.arg.noteActionDTO.tagId;
        const note = state.notes[noteId];
        const tags = note.tags.filter((tag) => {
          return tag.id !== tagId;
        });

        note.tags = tags;

        state.notes[noteId] = note;
        actionPendingAfterHook(state, String(NOTE_ACTION + noteId));
      })
      .addCase(removeTagToNoteAction.fulfilled, (state, action) => {
        console.log('removeTagToNoteAction.fulfilled', action);

        const note = action.payload.note;
        const tagId = action.meta.arg.noteActionDTO.tagId;
        const noteId = note.id;
        const tags = note.tags.filter((tag) => {
          return tag.id !== tagId;
        });
        if (isRequestPending(state, String(NOTE_ACTION + noteId))) {
          return;
        }

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
