import { Dispatch } from '@reduxjs/toolkit';
import { Editor, Transforms, Range, Node } from 'slate';
import { dispatchCommand } from '../../../../common/utils';
import { ElementType } from '../../components/elements/elements';
import { isNodeActive } from '../../service/editor.action.service';
import {
  setHeadingThreeAction,
  SetHeadingThreeActionPayload,
  unsetHeadingThreeAction,
  UnsetHeadingThreeActionPayload,
} from './headingthree.action';

export const setHeadingThree = (editor: Editor, range: Range): Node[] => {
  console.log('setHeadingThree');

  const path = range.anchor.path;
  Transforms.setNodes(
    editor,
    { type: ElementType.HeadingThree },
    {
      match: (n) => Editor.isBlock(editor, n),
      at: path,
      split: false,
    }
  );

  return editor.children;
};

export const unsetHeadingThree = (editor: Editor, range: Range): Node[] => {
  console.log('unsetHeadingThree');

  const path = range.anchor.path;
  Transforms.setNodes(
    editor,
    { type: ElementType.Default },
    {
      match: (n) => Editor.isBlock(editor, n),
      at: path,
      split: false,
    }
  );

  return editor.children;
};

export const toggleHeadingThree = (
  editor: Editor,
  noteId: string,
  range: Range,
  dispatch: Dispatch<any>
) => {
  console.log('toggleHeadingThree');

  if (isNodeActive(editor, ElementType.HeadingThree)) {
    const unsetHeadingThreeActionPayload: UnsetHeadingThreeActionPayload = {
      noteId: noteId,
      range: range,
    };
    dispatchCommand({
      name: unsetHeadingThreeAction.type,
      action: unsetHeadingThreeAction(unsetHeadingThreeActionPayload),
      dispatch,
      payload: unsetHeadingThreeActionPayload,
    });
  } else {
    const setHeadingThreeActionPayload: SetHeadingThreeActionPayload = {
      noteId: noteId,
      range: range,
    };
    dispatchCommand({
      name: setHeadingThreeAction.type,
      action: setHeadingThreeAction(setHeadingThreeActionPayload),
      dispatch,
      payload: setHeadingThreeActionPayload,
    });
  }
};
