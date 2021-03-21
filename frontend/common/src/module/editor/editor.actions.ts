/**
 * Redux editor actions.
 *
 */
import { Node, Range } from 'slate';
import { createAction } from './../../common/actions';
import {
  setBold,
  setDefault,
  setHeading1,
  setHeading2,
  setHeading3,
  unsetBold,
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
    const { noteId, range } = payload;
    const editor = window.editor; // TODO
    const nodes = setDefault(editor, range);
    return {
      payload: {
        noteId: noteId,
        nodes: nodes,
      },
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
    const { noteId, range } = payload;
    const editor = window.editor; // TODO
    const nodes = unsetDefault(editor, range);
    return {
      payload: {
        noteId: noteId,
        nodes: nodes,
      },
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
    const { noteId, range } = payload;
    const editor = window.editor; // TODO
    const nodes = setHeading1(editor, range);
    return {
      payload: {
        noteId: noteId,
        nodes: nodes,
      },
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
    const { noteId, range } = payload;
    const editor = window.editor; // TODO
    const nodes = unsetHeading1(editor, range);
    return {
      payload: {
        noteId: noteId,
        nodes: nodes,
      },
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
    const { noteId, range } = payload;
    const editor = window.editor; // TODO
    const nodes = setHeading2(editor, range);
    return {
      payload: {
        noteId: noteId,
        nodes: nodes,
      },
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
    const { noteId, range } = payload;
    const editor = window.editor; // TODO
    const nodes = unsetHeading2(editor, range);
    return {
      payload: {
        noteId: noteId,
        nodes: nodes,
      },
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
    const { noteId, range } = payload;
    const editor = window.editor; // TODO
    const nodes = setHeading3(editor, range);
    return {
      payload: {
        noteId: noteId,
        nodes: nodes,
      },
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
    const { noteId, range } = payload;
    const editor = window.editor; // TODO
    const nodes = unsetHeading3(editor, range);
    return {
      payload: {
        noteId: noteId,
        nodes: nodes,
      },
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
    const { noteId, range } = payload;
    const editor = window.editor; // TODO
    const nodes = setBold(editor, range);
    return {
      payload: {
        noteId: noteId,
        nodes: nodes,
      },
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
    const { noteId, range } = payload;
    const editor = window.editor; // TODO
    const nodes = unsetBold(editor, range);
    return {
      payload: {
        noteId: noteId,
        nodes: nodes,
      },
    };
  }
);
