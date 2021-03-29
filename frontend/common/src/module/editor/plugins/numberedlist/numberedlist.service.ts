import { Dispatch } from '@reduxjs/toolkit';
import {
  Editor,
  Transforms,
  Range,
  Node,
  Element as SlateElement,
  Descendant,
} from 'slate';
import { dispatchCommand } from '../../../../common/utils';
import { ElementType } from '../../components/elements/elements';
import { isNodeActive } from '../../service/editor.action.service';
import {
  setNumberedListAction,
  SetNumberedListActionPayload,
  unsetNumberedListAction,
  UnsetNumberedListActionPayload,
} from './numberedlist.action';

export type NumberedListElement = {
  type: ElementType.NumberedList;
  children: Descendant[];
};

export const setNumberedList = (editor: Editor, range: Range): Node[] => {
  console.log('setNumberedList');

  const path = range.anchor.path;
  const partialSlateElement: Partial<SlateElement> = {
    type: ElementType.NumberedListItem,
  };

  Transforms.setNodes(editor, partialSlateElement, {
    match: (n) => Editor.isBlock(editor, n),
  });

  const list: NumberedListElement = {
    type: ElementType.NumberedList,
    children: [],
  };
  Transforms.wrapNodes(editor, list, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      n.type === ElementType.ListItem,
    at: path,
  });

  return editor.children;
};

export const unsetNumberedList = (editor: Editor, range: Range): Node[] => {
  console.log('unsetNumberedList');

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

export const toggleNumberedList = (
  editor: Editor,
  noteId: string,
  range: Range,
  dispatch: Dispatch<any>
) => {
  console.log('toggleNumberedList');

  if (isNodeActive(editor, ElementType.NumberedList)) {
    const unsetNumberedListActionPayload: UnsetNumberedListActionPayload = {
      noteId: noteId,
      range: range,
    };
    dispatchCommand({
      name: unsetNumberedListAction.type,
      action: unsetNumberedListAction(unsetNumberedListActionPayload),
      dispatch,
      payload: unsetNumberedListActionPayload,
    });
  } else {
    const setNumberedListActionPayload: SetNumberedListActionPayload = {
      noteId: noteId,
      range: range,
    };
    dispatchCommand({
      name: setNumberedListAction.type,
      action: setNumberedListAction(setNumberedListActionPayload),
      dispatch,
      payload: setNumberedListActionPayload,
    });
  }
};
