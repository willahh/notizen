/**
 * Editor reducer.
 * This reducer is stateless, it only mutates the `Editor` instance.
 * TODO: This is maybe wrong, we can't use Redux time travel without a clean state reducer.
 */
import { createSlice } from '@reduxjs/toolkit';
import { toggleHeading1Action } from '../editor/editor.actions';
import { BlockType } from '../editor/components/elements/elements';
import { Editor, Transforms } from 'slate';
import { isHeading1BlockActive } from '../editor/editor.utils';

declare global {
  interface Window {
    store: any; // TODO: Debug
    requestPending: any; // TODO: Debug
    _event: any; // TODO: Debug
  }
}
const editor = createSlice({
  name: 'editor',
  initialState: [],
  extraReducers: (builder) => {
    builder

      /**
       * EDITOR_TOGGLE_HEADING1
       * TODO: Move this into a custom Editor reducer
       */
      .addCase(toggleHeading1Action, (state, action) => {
        console.log('toggleHeading1Action', action);

        const noteId = action.payload.noteId;
        // TODO: Move to editor.state file ?
        // TODO: Get editor from noteId ?
        const editor = window.editor;
        const range = action.payload.range;
        const path = range.anchor.path;
        const isActive = isHeading1BlockActive(editor);
        Transforms.setNodes(
          editor,
          { type: isActive ? null : BlockType.Heading1 },
          {
            match: (n) => Editor.isBlock(editor, n),
            at: path,
          }
        );
      });
  },
  reducers: {},
});

export default editor.reducer;
