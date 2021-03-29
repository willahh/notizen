import { Range } from 'slate';
import { createAction } from '../../../../common/actions';

/**
 * EDITOR_SET_DIVIDER
 */
export const EDITOR_SET_DIVIDER = 'EDITOR/EDITOR_SET_DIVIDER';
export interface SetDividerActionPayload {
  noteId: string;
  range: Range;
}
export const setDividerAction = createAction(
  EDITOR_SET_DIVIDER,
  (payload: SetDividerActionPayload) => {
    return {
      payload: payload,
    };
  }
);

/**
 * EDITOR_UNSET_DIVIDER
 */
export const EDITOR_UNSET_DIVIDER = 'EDITOR/EDITOR_UNSET_DIVIDER';
export interface UnsetDividerActionPayload {
  noteId: string;
  range: Range;
}
export const unsetDividerAction = createAction(
  EDITOR_UNSET_DIVIDER,
  (payload: UnsetDividerActionPayload) => {
    return {
      payload: payload,
    };
  }
);
