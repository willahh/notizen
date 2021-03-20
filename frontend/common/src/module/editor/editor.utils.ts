/**
 * editor.utils.ts
 * This is where all the logical part of the editor is present.
 * Actions should be kept simple.
 * Reducers should only update internal state with little to no actions. If a Reducer needs complex processing, it should
 * refer to this namespace.
 */
import { Dispatch } from 'react';
import { Editor, Node, Transforms, Range } from 'slate';
import { dispatchCommand } from './../../common/utils';
import { BlockType } from './components/elements/elements';
import {
  setDefaultAction,
  SetDefaultActionPayload,
  setHeading1Action,
  SetHeading1ActionPayload,
  setHeading2Action,
  SetHeading2ActionPayload,
  setHeading3Action,
  SetHeading3ActionPayload,
  unsetDefaultAction,
  UnsetDefaultActionPayload,
  unsetHeading1Action,
  UnsetHeading1ActionPayload,
  unsetHeading2Action,
  UnsetHeading2ActionPayload,
  unsetHeading3Action,
  UnsetHeading3ActionPayload,
} from './editor.actions';

interface DispatchToggleAction {
  editor: Editor;
  blockType: BlockType;
  noteId: string;
  range: Range;
  dispatch: Dispatch<any>;
  setAction: any;
  setActionPayload: any;
  unsetAction: any;
  unsetActionPayload: any;
}
const dispatchToggleAction = ({
  blockType,
  dispatch,
  editor,
  setAction,
  setActionPayload,
  unsetAction,
  unsetActionPayload,
}: DispatchToggleAction) => {
  const isActive = isBlockActive(editor, blockType);
  if (isActive) {
    dispatchCommand({
      name: unsetAction.type,
      action: unsetAction(unsetActionPayload),
      dispatch,
      payload: unsetActionPayload,
    });
  } else {
    dispatchCommand({
      name: setAction.type,
      action: setAction(setActionPayload),
      dispatch,
      payload: setActionPayload,
    });
  }
};

const isBlockActive = (editor, blockType: BlockType) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === blockType,
  });
  return !!match;
};

const setNodes = (
  editor: Editor,
  range: Range,
  blockType: BlockType,
  matchingFn: (node: Node) => boolean
): Node[] => {
  const path = range.anchor.path;
  Transforms.setNodes(
    editor,
    { type: blockType },
    {
      match: matchingFn,
      at: path,
    }
  );

  return editor.children;
};

/**
 * DEFAULT
 */
export const setDefault = (editor: Editor, range: Range): Node[] => {
  console.log('setDefault');
  setNodes(editor, range, BlockType.Default, (n) => Editor.isBlock(editor, n));
  return editor.children;
};

export const unsetDefault = (editor: Editor, range: Range): Node[] => {
  console.log('unsetDefault');
  setNodes(editor, range, null, (n) => Editor.isBlock(editor, n));
  return editor.children;
};

export const toggleDefault = (
  editor: Editor,
  noteId: string,
  range: Range,
  dispatch: Dispatch<any>
) => {
  console.log('toggleDefault');
  const setDefaultActionPayload: SetDefaultActionPayload = {
    noteId: noteId,
    range: range,
  };
  const unsetDefaultActionPayload: UnsetDefaultActionPayload = {
    noteId: noteId,
    range: range,
  };
  dispatchToggleAction({
    blockType: BlockType.Default,
    dispatch: dispatch,
    editor: editor,
    noteId: noteId,
    range: range,
    setAction: setDefaultAction,
    setActionPayload: setDefaultActionPayload,
    unsetAction: unsetDefaultAction,
    unsetActionPayload: unsetDefaultActionPayload,
  });
};

/**
 * HEADING1
 */
export const setHeading1 = (editor: Editor, range: Range): Node[] => {
  console.log('setHeading1');
  setNodes(editor, range, BlockType.Heading1, (n) => Editor.isBlock(editor, n));
  return editor.children;
};

export const unsetHeading1 = (editor: Editor, range: Range): Node[] => {
  console.log('unsetHeading1');
  setNodes(editor, range, null, (n) => Editor.isBlock(editor, n));
  return editor.children;
};

export const toggleHeading1 = (
  editor: Editor,
  noteId: string,
  range: Range,
  dispatch: Dispatch<any>
) => {
  console.log('toggleHeading1');
  const setHeading1ActionPayload: SetHeading1ActionPayload = {
    noteId: noteId,
    range: range,
  };
  const unsetHeading1ActionPayload: UnsetHeading1ActionPayload = {
    noteId: noteId,
    range: range,
  };
  dispatchToggleAction({
    blockType: BlockType.Heading1,
    dispatch: dispatch,
    editor: editor,
    noteId: noteId,
    range: range,
    setAction: setHeading1Action,
    setActionPayload: setHeading1ActionPayload,
    unsetAction: unsetHeading1Action,
    unsetActionPayload: unsetHeading1ActionPayload,
  });
};

/**
 * HEADING2
 */
export const setHeading2 = (editor: Editor, range: Range): Node[] => {
  console.log('setHeading2');
  setNodes(editor, range, BlockType.Heading2, (n) => Editor.isBlock(editor, n));
  return editor.children;
};

export const unsetHeading2 = (editor: Editor, range: Range): Node[] => {
  console.log('unsetHeading2');
  setNodes(editor, range, null, (n) => Editor.isBlock(editor, n));
  return editor.children;
};

export const toggleHeading2 = (
  editor: Editor,
  noteId: string,
  range: Range,
  dispatch: Dispatch<any>
) => {
  console.log('toggleHeading2');
  const setHeading2ActionPayload: SetHeading2ActionPayload = {
    noteId: noteId,
    range: range,
  };
  const unsetHeading2ActionPayload: UnsetHeading2ActionPayload = {
    noteId: noteId,
    range: range,
  };
  dispatchToggleAction({
    blockType: BlockType.Heading2,
    dispatch: dispatch,
    editor: editor,
    noteId: noteId,
    range: range,
    setAction: setHeading2Action,
    setActionPayload: setHeading2ActionPayload,
    unsetAction: unsetHeading2Action,
    unsetActionPayload: unsetHeading2ActionPayload,
  });
};

/**
 * HEADING3
 */
export const setHeading3 = (editor: Editor, range: Range): Node[] => {
  console.log('setHeading3');
  setNodes(editor, range, BlockType.Heading3, (n) => Editor.isBlock(editor, n));
  return editor.children;
};

export const unsetHeading3 = (editor: Editor, range: Range): Node[] => {
  console.log('unsetHeading3');
  setNodes(editor, range, null, (n) => Editor.isBlock(editor, n));
  return editor.children;
};

export const toggleHeading3 = (
  editor: Editor,
  noteId: string,
  range: Range,
  dispatch: Dispatch<any>
) => {
  console.log('toggleHeading3');
  const setHeading3ActionPayload: SetHeading3ActionPayload = {
    noteId: noteId,
    range: range,
  };
  const unsetHeading3ActionPayload: UnsetHeading3ActionPayload = {
    noteId: noteId,
    range: range,
  };
  dispatchToggleAction({
    blockType: BlockType.Heading3,
    dispatch: dispatch,
    editor: editor,
    noteId: noteId,
    range: range,
    setAction: setHeading3Action,
    setActionPayload: setHeading3ActionPayload,
    unsetAction: unsetHeading3Action,
    unsetActionPayload: unsetHeading3ActionPayload,
  });
};
