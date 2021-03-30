import { Range } from 'slate';
import { createAction } from '../../../../common/actions';

/**
 * EDITOR_SET_TODO
 */
export const EDITOR_SET_TODO = 'EDITOR/EDITOR_SET_TODO';
export interface SetTodoActionPayload {
  noteId: string;
  range: Range;
}
export const setTodoAction = createAction(
  EDITOR_SET_TODO,
  (payload: SetTodoActionPayload) => {
    return {
      payload: payload,
    };
  }
);

/**
 * EDITOR_UNSET_TODO
 */
export const EDITOR_UNSET_TODO = 'EDITOR/EDITOR_UNSET_TODO';
export interface UnsetTodoActionPayload {
  noteId: string;
  range: Range;
}
export const unsetTodoAction = createAction(
  EDITOR_UNSET_TODO,
  (payload: UnsetTodoActionPayload) => {
    return {
      payload: payload,
    };
  }
);
