/**
 * editor.action.service.ts
 * This is where all the logical part of the editor is present.
 * Actions should be kept simple.
 * Reducers should only update internal state with little to no actions. If a Reducer needs complex processing, it should
 * refer to this namespace.
 */
import { Dispatch } from 'react';
import { Editor, Node, Transforms, Range, Text } from 'slate';
import { dispatchCommand } from '../../../common/utils';
import { ElementType } from '../components/elements/elements';
import { LeafType } from '../components/leafs/Leaf';
import {
  setBoldAction,
  SetBoldActionPayload,
  unsetBoldAction,
  UnsetBoldActionPayload,
} from '../editor.actions';

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

export const isNodeActive = (editor: Editor, nodeType: NodeType) => {
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



