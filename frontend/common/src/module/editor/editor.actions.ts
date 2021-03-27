/**
 * Redux editor actions.
 *
 */
import { Node, Range } from 'slate';
import { createAction } from './../../common/actions';
import {
  setBold,
  unsetBold,
  setDefault,
  setHeading1,
  setHeading2,
  setHeading3,
  unsetDefault,
  unsetHeading1,
  unsetHeading2,
  unsetHeading3,
} from './editor.service';

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

/**
 * EDITOR_SET_DEFAULT
 */
export const EDITOR_SET_DEFAULT = 'EDITOR/EDITOR_SET_DEFAULT';
export interface SetDefaultActionPayload {
  noteId: string;
  range: Range;
}
export const setDefaultAction = createAction(
  EDITOR_SET_DEFAULT,
  (payload: SetDefaultActionPayload) => {
    return {
      payload: payload,
    };
  }
);

/**
 * EDITOR_UNSET_DEFAULT
 */
export const EDITOR_UNSET_DEFAULT = 'EDITOR/EDITOR_UNSET_DEFAULT';
export interface UnsetDefaultActionPayload {
  noteId: string;
  range: Range;
}
export const unsetDefaultAction = createAction(
  EDITOR_UNSET_DEFAULT,
  (payload: UnsetDefaultActionPayload) => {
    return {
      payload: payload,
    };
  }
);

/**
 * EDITOR_SET_HEADING1
 */
export const EDITOR_SET_HEADING1 = 'EDITOR/EDITOR_SET_HEADING1';
export interface SetHeading1ActionPayload {
  noteId: string;
  range: Range;
}
export const setHeading1Action = createAction(
  EDITOR_SET_HEADING1,
  (payload: SetHeading1ActionPayload) => {
    return {
      payload: payload,
    };
  }
);

/**
 * EDITOR_UNSET_HEADING1
 */
export const EDITOR_UNSET_HEADING1 = 'EDITOR/EDITOR_UNSET_HEADING1';
export interface UnsetHeading1ActionPayload {
  noteId: string;
  range: Range;
}
export const unsetHeading1Action = createAction(
  EDITOR_UNSET_HEADING1,
  (payload: UnsetHeading1ActionPayload) => {
    return {
      payload: payload,
    };
  }
);

/**
 * EDITOR_SET_HEADING2
 */
export const EDITOR_SET_HEADING2 = 'EDITOR/EDITOR_SET_HEADING2';
export interface SetHeading2ActionPayload {
  noteId: string;
  range: Range;
}
export const setHeading2Action = createAction(
  EDITOR_SET_HEADING2,
  (payload: SetHeading2ActionPayload) => {
    return {
      payload: payload,
    };
  }
);

/**
 * EDITOR_UNSET_HEADING2
 */
export const EDITOR_UNSET_HEADING2 = 'EDITOR/EDITOR_UNSET_HEADING2';
export interface UnsetHeading2ActionPayload {
  noteId: string;
  range: Range;
}
export const unsetHeading2Action = createAction(
  EDITOR_UNSET_HEADING2,
  (payload: UnsetHeading2ActionPayload) => {
    return {
      payload: payload,
    };
  }
);

/**
 * EDITOR_SET_HEADING3
 */
export const EDITOR_SET_HEADING3 = 'EDITOR/EDITOR_SET_HEADING3';
export interface SetHeading3ActionPayload {
  noteId: string;
  range: Range;
}
export const setHeading3Action = createAction(
  EDITOR_SET_HEADING3,
  (payload: SetHeading3ActionPayload) => {
    return {
      payload: payload,
    };
  }
);

/**
 * EDITOR_UNSET_HEADING3
 */
export const EDITOR_UNSET_HEADING3 = 'EDITOR/EDITOR_UNSET_HEADING3';
export interface UnsetHeading3ActionPayload {
  noteId: string;
  range: Range;
}
export const unsetHeading3Action = createAction(
  EDITOR_UNSET_HEADING3,
  (payload: UnsetHeading3ActionPayload) => {
    return {
      payload: payload,
    };
  }
);

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
