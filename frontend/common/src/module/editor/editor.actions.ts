import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { Editor, Range } from 'slate';
import { ReactEditor } from 'slate-react';
import { addAction } from './../../common/actions';


/**
 * EDITOR_TOGGLE_HEADING1
 */
export const EDITOR_TOGGLE_HEADING1 = 'EDITOR/TOGGLE_HEADING1';
export interface ToggleHeading1ActionPayload {
  noteId: string;
  range: Range
}
export const toggleHeading1Action = createAction(
  EDITOR_TOGGLE_HEADING1,
  (payload: ToggleHeading1ActionPayload) => {
    return {
      payload: payload
    };
  }
);
addAction(EDITOR_TOGGLE_HEADING1, toggleHeading1Action);
