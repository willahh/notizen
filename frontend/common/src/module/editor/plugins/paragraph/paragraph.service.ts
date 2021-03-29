import { Dispatch } from '@reduxjs/toolkit';
import { Editor, Transforms, Range, Node } from 'slate';
import { dispatchCommand } from '../../../../common/utils';
import { ElementType } from '../../components/elements/elements';
import { isNodeActive } from '../../service/editor.action.service';
import {
  setParagraphAction,
  SetParagraphActionPayload,
  unsetParagraphAction,
  UnsetParagraphActionPayload,
} from './paragraph.action';

export const setParagraph = (editor: Editor, range: Range): Node[] => {
  console.log('setParagraph');

  const path = range.anchor.path;
  Transforms.setNodes(
    editor,
    { type: ElementType.Paragraph },
    {
      match: (n) => Editor.isBlock(editor, n),
      at: path,
      split: false,
    }
  );

  return editor.children;
};

export const unsetParagraph = (editor: Editor, range: Range): Node[] => {
  console.log('unsetParagraph');

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

export const toggleParagraph = (
  editor: Editor,
  noteId: string,
  range: Range,
  dispatch: Dispatch<any>
) => {
  console.log('toggleParagraph');

  if (isNodeActive(editor, ElementType.Paragraph)) {
    const unsetParagraphActionPayload: UnsetParagraphActionPayload = {
      noteId: noteId,
      range: range,
    };
    dispatchCommand({
      name: unsetParagraphAction.type,
      action: unsetParagraphAction(unsetParagraphActionPayload),
      dispatch,
      payload: unsetParagraphActionPayload,
    });
  } else {
    const setParagraphActionPayload: SetParagraphActionPayload = {
      noteId: noteId,
      range: range,
    };
    dispatchCommand({
      name: setParagraphAction.type,
      action: setParagraphAction(setParagraphActionPayload),
      dispatch,
      payload: setParagraphActionPayload,
    });
  }
};
