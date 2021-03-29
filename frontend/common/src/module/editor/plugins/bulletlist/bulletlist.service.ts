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
  setBulletListAction,
  SetBulletListActionPayload,
  unsetBulletListAction,
  UnsetBulletListActionPayload,
} from './bulletlist.action';

export type BulletedListElement = {
  type: ElementType.BulletList;
  children: Descendant[];
};

export const setBulletList = (editor: Editor, range: Range): Node[] => {
  console.log('setBulletList');

  const path = range.anchor.path;
  const partialSlateElement: Partial<SlateElement> = {
    type: ElementType.BulletListItem,
  };

  Transforms.setNodes(editor, partialSlateElement, {
    match: (n) => Editor.isBlock(editor, n),
  });

  // if (type === ElementType.ListItem) {
  const list: BulletedListElement = {
    type: ElementType.BulletList,
    children: [],
  };
  Transforms.wrapNodes(editor, list, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      n.type === ElementType.ListItem,
    at: path,
  });
  // }

  return editor.children;
};

export const unsetBulletList = (editor: Editor, range: Range): Node[] => {
  console.log('unsetBulletList');

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

export const toggleBulletList = (
  editor: Editor,
  noteId: string,
  range: Range,
  dispatch: Dispatch<any>
) => {
  console.log('toggleBulletList');

  if (isNodeActive(editor, ElementType.BulletList)) {
    const unsetBulletListActionPayload: UnsetBulletListActionPayload = {
      noteId: noteId,
      range: range,
    };
    dispatchCommand({
      name: unsetBulletListAction.type,
      action: unsetBulletListAction(unsetBulletListActionPayload),
      dispatch,
      payload: unsetBulletListActionPayload,
    });
  } else {
    const setBulletListActionPayload: SetBulletListActionPayload = {
      noteId: noteId,
      range: range,
    };
    dispatchCommand({
      name: setBulletListAction.type,
      action: setBulletListAction(setBulletListActionPayload),
      dispatch,
      payload: setBulletListActionPayload,
    });
  }
};
