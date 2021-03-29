import { Range } from 'slate';
import { createAction } from '../../../../common/actions';

/**
 * EDITOR_SET_PARAGRAPH
 */
export const EDITOR_SET_PARAGRAPH = 'EDITOR/EDITOR_SET_PARAGRAPH';
export interface SetParagraphActionPayload {
  noteId: string;
  range: Range;
}
export const setParagraphAction = createAction(
  EDITOR_SET_PARAGRAPH,
  (payload: SetParagraphActionPayload) => {
    return {
      payload: payload,
    };
  }
);

/**
 * EDITOR_UNSET_PARAGRAPH
 */
export const EDITOR_UNSET_PARAGRAPH = 'EDITOR/EDITOR_UNSET_PARAGRAPH';
export interface UnsetParagraphActionPayload {
  noteId: string;
  range: Range;
}
export const unsetParagraphAction = createAction(
  EDITOR_UNSET_PARAGRAPH,
  (payload: UnsetParagraphActionPayload) => {
    return {
      payload: payload,
    };
  }
);
