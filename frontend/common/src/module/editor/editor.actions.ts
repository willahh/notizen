/**
 * Redux editor actions.
 *
 */
import { Node } from 'slate';
import { createAction } from './../../common/actions';

/**
 * TODO: Try to not use this action as possible, use very specific actions like :
 * inserttext, removetext, delete, new line, new p, copy, paste
 * EDITOR_UPDATE_CONTENT
 */
export const EDITOR_UPDATE_CONTENT = 'EDITOR/UPDATE_CONTENT';
export interface UpdateContentActionPayload {
  noteId: string;
  nodes: Node[];
}
export const updateContentAction = createAction(
  EDITOR_UPDATE_CONTENT,
  (payload: UpdateContentActionPayload) => {
    const { noteId, nodes } = payload;
    return {
      payload: {
        noteId: noteId,
        nodes: nodes,
      },
    };
  }
);
