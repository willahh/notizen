import { Range } from 'slate';
import { createAction } from '../../../../common/actions';

/**
 * EDITOR_SET_BLOCKQUOTE
 */
 export const EDITOR_SET_BLOCKQUOTE = 'EDITOR/EDITOR_SET_BLOCKQUOTE';
 export interface SetBlockQuoteActionPayload {
   noteId: string;
   range: Range;
 }
 export const setBlockQuoteAction = createAction(
   EDITOR_SET_BLOCKQUOTE,
   (payload: SetBlockQuoteActionPayload) => {
     return {
       payload: payload,
     };
   }
 );
 
 /**
  * EDITOR_UNSET_BLOCKQUOTE
  */
 export const EDITOR_UNSET_BLOCKQUOTE = 'EDITOR/EDITOR_UNSET_BLOCKQUOTE';
 export interface UnsetBlockQuoteActionPayload {
   noteId: string;
   range: Range;
 }
 export const unsetBlockQuoteAction = createAction(
   EDITOR_UNSET_BLOCKQUOTE,
   (payload: UnsetBlockQuoteActionPayload) => {
     return {
       payload: payload,
     };
   }
 );