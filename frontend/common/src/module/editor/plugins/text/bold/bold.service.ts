import { Dispatch } from '@reduxjs/toolkit';
import { Editor, Node, Range, Text, Transforms } from 'slate';
import { LeafType } from '../../../../editor/components/leafs/Leaf';
import { dispatchCommand } from '../../../../../common/utils';
import { isNodeActive } from '../../../service/editor.action.service';
import {
  setBoldAction,
  SetBoldActionPayload,
  unsetBoldAction,
  UnsetBoldActionPayload,
} from './bold.action';

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

  const isActive = isNodeActive(editor, LeafType.Bold);

  if (isActive) {
    const unsetBoldActionPayload: UnsetBoldActionPayload = {
      noteId: noteId,
      range: range,
    };
    dispatchCommand({
      name: unsetBoldAction.type,
      action: unsetBoldAction(unsetBoldActionPayload),
      dispatch,
      payload: unsetBoldActionPayload,
    });
  } else {
    const setBoldActionPayload: SetBoldActionPayload = {
      noteId: noteId,
      range: range,
    };
    dispatchCommand({
      name: setBoldAction.type,
      action: setBoldAction(setBoldActionPayload),
      dispatch,
      payload: setBoldActionPayload,
    });
  }
};
