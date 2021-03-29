import { Range } from 'slate';
import { createAction } from '../../../../common/actions';

/**
 * EDITOR_SET_HEADINGONE
 */
export const EDITOR_SET_HEADINGONE = 'EDITOR/EDITOR_SET_HEADINGONE';
export interface SetHeadingOneActionPayload {
  noteId: string;
  range: Range;
}
export const setHeadingOneAction = createAction(
  EDITOR_SET_HEADINGONE,
  (payload: SetHeadingOneActionPayload) => {
    return {
      payload: payload,
    };
  }
);

/**
 * EDITOR_UNSET_HEADINGONE
 */
export const EDITOR_UNSET_HEADINGONE = 'EDITOR/EDITOR_UNSET_HEADINGONE';
export interface UnsetHeadingOneActionPayload {
  noteId: string;
  range: Range;
}
export const unsetHeadingOneAction = createAction(
  EDITOR_UNSET_HEADINGONE,
  (payload: UnsetHeadingOneActionPayload) => {
    return {
      payload: payload,
    };
  }
);
