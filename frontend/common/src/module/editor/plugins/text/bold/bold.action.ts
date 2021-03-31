import { Range } from 'slate';
import { createAction } from '../../../../../common/actions';

/**
 * EDITOR_SET_BOLD
 */
export const EDITOR_SET_BOLD = 'EDITOR/EDITOR_SET_BOLD';
export interface SetBoldActionPayload {
  noteId: string;
  range: Range;
}
export const setBoldAction = createAction(
  EDITOR_SET_BOLD,
  (payload: SetBoldActionPayload) => {
    return {
      payload: payload,
    };
  }
);

/**
 * EDITOR_UNSET_BOLD
 */
export const EDITOR_UNSET_BOLD = 'EDITOR/EDITOR_UNSET_BOLD';
export interface UnsetBoldActionPayload {
  noteId: string;
  range: Range;
}
export const unsetBoldAction = createAction(
  EDITOR_UNSET_BOLD,
  (payload: UnsetBoldActionPayload) => {
    return {
      payload: payload,
    };
  }
);
