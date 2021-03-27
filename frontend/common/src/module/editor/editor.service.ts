/**
 * editor.service.ts
 * This is where all the logical part of the editor is present.
 * Actions should be kept simple.
 * Reducers should only update internal state with little to no actions. If a Reducer needs complex processing, it should
 * refer to this namespace.
 */
import { Dispatch } from 'react';
import { Editor, Node, Transforms, Range, Text } from 'slate';
import { dispatchCommand } from '../../common/utils';
import { ElementType } from './components/elements/elements';
import { LeafType } from './components/leafs/Leaf';
import {
  setBlockQuoteAction,
  SetBlockQuoteActionPayload,
  setBoldAction,
  SetBoldActionPayload,
  setDefaultAction,
  SetDefaultActionPayload,
  setHeading1Action,
  SetHeading1ActionPayload,
  setHeading2Action,
  SetHeading2ActionPayload,
  setHeading3Action,
  SetHeading3ActionPayload,
  unsetBlockQuoteAction,
  UnsetBlockQuoteActionPayload,
  unsetBoldAction,
  UnsetBoldActionPayload,
  unsetDefaultAction,
  UnsetDefaultActionPayload,
  unsetHeading1Action,
  UnsetHeading1ActionPayload,
  unsetHeading2Action,
  UnsetHeading2ActionPayload,
  unsetHeading3Action,
  UnsetHeading3ActionPayload,
} from './editor.actions';

type NodeType = ElementType | LeafType;

interface DispatchToggleAction {
  editor: Editor;
  nodeType: NodeType;
  noteId: string;
  range: Range;
  dispatch: Dispatch<any>;
  setAction: any;
  setActionPayload: any;
  unsetAction: any;
  unsetActionPayload: any;
}
const dispatchToggleAction = ({
  nodeType,
  dispatch,
  editor,
  setAction,
  setActionPayload,
  unsetAction,
  unsetActionPayload,
}: DispatchToggleAction) => {
  const isActive = isNodeActive(editor, nodeType);

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

const isNodeActive = (editor: Editor, nodeType: NodeType) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === nodeType,
    // universal: true,
    mode: 'all',
  });
  return !!match;
};

const setNodes = (
  editor: Editor,
  range: Range,
  nodeType: ElementType | LeafType,
  matchingFn: (node: Node) => boolean,
  split: boolean
): Node[] => {
  const path = range.anchor.path;
  Transforms.setNodes(
    editor,
    { type: nodeType },
    {
      match: matchingFn,
      at: path,
      split: split,
    }
  );

  return editor.children;
};

/**
 * DEFAULT
 */
export const setDefault = (editor: Editor, range: Range): Node[] => {
  console.log('setDefault');
  // TODO: Should be ElementType.Text
  setNodes(
    editor,
    range,
    ElementType.Paragraph,
    (n) => Editor.isBlock(editor, n),
    false
  );
  return editor.children;
};

export const unsetDefault = (editor: Editor, range: Range): Node[] => {
  console.log('unsetDefault');
  setNodes(
    editor,
    range,
    ElementType.Paragraph,
    (n) => Editor.isBlock(editor, n),
    false
  );
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
    nodeType: ElementType.Paragraph,
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
  setNodes(
    editor,
    range,
    ElementType.Heading1,
    (n) => Editor.isBlock(editor, n),
    false
  );
  return editor.children;
};

export const unsetHeading1 = (editor: Editor, range: Range): Node[] => {
  console.log('unsetHeading1');
  setNodes(
    editor,
    range,
    ElementType.Paragraph,
    (n) => Editor.isBlock(editor, n),
    false
  );
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
    nodeType: ElementType.Heading1,
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
  setNodes(
    editor,
    range,
    ElementType.Heading2,
    (n) => Editor.isBlock(editor, n),
    false
  );
  return editor.children;
};

export const unsetHeading2 = (editor: Editor, range: Range): Node[] => {
  console.log('unsetHeading2');
  setNodes(
    editor,
    range,
    ElementType.Paragraph,
    (n) => Editor.isBlock(editor, n),
    false
  );
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
    nodeType: ElementType.Heading2,
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
  setNodes(
    editor,
    range,
    ElementType.Heading3,
    (n) => Editor.isBlock(editor, n),
    false
  );
  return editor.children;
};

export const unsetHeading3 = (editor: Editor, range: Range): Node[] => {
  console.log('unsetHeading3');
  setNodes(
    editor,
    range,
    ElementType.Paragraph,
    (n) => Editor.isBlock(editor, n),
    false
  );
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
    nodeType: ElementType.Heading3,
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

/**
 * BOLD
 */
export const setBold = (editor: Editor, range: Range): Node[] => {
  console.log('setBold');
  // setNodes(editor, range, LeafType.Bold, (n) => Text.isText(n), true);
  
  Transforms.setNodes(
    editor,
    { type: LeafType.Bold },
    {
      match: (n) => {
        return Text.isText(n);
      },
      split: true,
    }
  );

  return editor.children;
};

export const unsetBold = (editor: Editor, range: Range): Node[] => {
  console.log('unsetBold');
  // setNodes(editor, range, LeafType.Default, (n) => Text.isText(n), true);
  Transforms.setNodes(
    editor,
    { type: LeafType.Default },
    {
      match: (n) => {
        return Text.isText(n);
      },
      split: true,
    }
  );

  return editor.children;
};

export const toggleBold = (
  editor: Editor,
  noteId: string,
  range: Range,
  dispatch: Dispatch<any>
) => {
  console.log('toggleBold');

  const setBoldActionPayload: SetBoldActionPayload = {
    noteId: noteId,
    range: range,
  };
  const unsetBoldActionPayload: UnsetBoldActionPayload = {
    noteId: noteId,
    range: range,
  };
  dispatchToggleAction({
    nodeType: LeafType.Bold,
    dispatch: dispatch,
    editor: editor,
    noteId: noteId,
    range: range,
    setAction: setBoldAction,
    setActionPayload: setBoldActionPayload,
    unsetAction: unsetBoldAction,
    unsetActionPayload: unsetBoldActionPayload,
  });
};

















/**
 * BLOCKQUOTE
 */
 export const setBlockQuote = (editor: Editor, range: Range): Node[] => {
  console.log('setBlockQuote', range);
  setNodes(
    editor,
    range,
    ElementType.BlockQuote,
    (n) => Editor.isBlock(editor, n),
    true
  );
  return editor.children;
};

export const unsetBlockQuote = (editor: Editor, range: Range): Node[] => {
  console.log('unsetBlockQuote');
  setNodes(
    editor,
    range,
    ElementType.Paragraph,
    (n) => Editor.isBlock(editor, n),
    false
  );
  return editor.children;
};

export const toggleBlockquote = (
  editor: Editor,
  noteId: string,
  range: Range,
  dispatch: Dispatch<any>
) => {
  console.log('toggleBlockQuote');
  const setBlockQuoteActionPayload: SetBlockQuoteActionPayload = {
    noteId: noteId,
    range: range,
  };
  const unsetBlockQuoteActionPayload: UnsetBlockQuoteActionPayload = {
    noteId: noteId,
    range: range,
  };
  dispatchToggleAction({
    nodeType: ElementType.BlockQuote,
    dispatch: dispatch,
    editor: editor,
    noteId: noteId,
    range: range,
    setAction: setBlockQuoteAction,
    setActionPayload: setBlockQuoteActionPayload,
    unsetAction: unsetBlockQuoteAction,
    unsetActionPayload: unsetBlockQuoteActionPayload,
  });
};