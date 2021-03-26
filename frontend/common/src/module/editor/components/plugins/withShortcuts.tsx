// https://github.com/ianstormtaylor/slate/blob/master/site/examples/markdown-shortcuts.tsx

// Import the Slate editor factory.
import {
  createEditor,
  Editor,
  Node,
  Transforms,
  RangeRef,
  Text,
  Range,
  Point,
  Element as SlateElement,
  Descendant,
} from 'slate';
import { ElementType } from '../elements/elements';
// import { BulletedListElement } from './custom-types'

export type BulletedListElement = {
  type: ElementType.BulletedList;
  children: Descendant[];
};

const SHORTCUTS = {
  '*': ElementType.ListItem,
  '-': ElementType.ListItem,
  '+': ElementType.ListItem,
  '>': ElementType.BlockQuote,
  '#': ElementType.Heading1,
  '##': ElementType.Heading2,
  '###': ElementType.Heading3,
  '####': ElementType.Heading4,
  '#####': ElementType.Heading5,
  '######': ElementType.Heading6,
  '---': ElementType.Divider,
};

export const withShortcuts = (editor) => {
  const { deleteBackward, insertText } = editor;

  editor.insertText = (text) => {
    console.log('[x] insertText', text);

    const { selection } = editor;

    if (text === ' ' && selection && Range.isCollapsed(selection)) {
      const { anchor } = selection;
      const block = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      });
      const path = block ? block[1] : [];
      const start = Editor.start(editor, path);
      const range = { anchor, focus: start };
      const beforeText = Editor.string(editor, range);
      const type = SHORTCUTS[beforeText];
      // console.log('[x] type', type);

      if (type) {
        Transforms.select(editor, range);
        Transforms.delete(editor);
        const newProperties: Partial<SlateElement> = {
          type,
        };
        Transforms.setNodes(editor, newProperties, {
          match: (n) => Editor.isBlock(editor, n),
        });

        if (type === ElementType.ListItem) {
          const list: BulletedListElement = {
            type: ElementType.BulletedList,
            children: [],
          };
          Transforms.wrapNodes(editor, list, {
            match: (n) =>
              !Editor.isEditor(n) &&
              SlateElement.isElement(n) &&
              n.type === ElementType.ListItem,
          });
        }

        return;
      }
    }

    insertText(text);
  };

  editor.deleteBackward = (...args) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const match = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      });

      if (match) {
        const [block, path] = match;
        const start = Editor.start(editor, path);

        if (
          !Editor.isEditor(block) &&
          SlateElement.isElement(block) &&
          block.type !== ElementType.Paragraph &&
          Point.equals(selection.anchor, start)
        ) {
          const newProperties: Partial<SlateElement> = {
            type: ElementType.Paragraph,
          };
          Transforms.setNodes(editor, newProperties);

          if (block.type === ElementType.ListItem) {
            Transforms.unwrapNodes(editor, {
              match: (n) =>
                !Editor.isEditor(n) &&
                SlateElement.isElement(n) &&
                n.type === ElementType.BulletedList,
              split: true,
            });
          }

          return;
        }
      }

      deleteBackward(...args);
    }
  };

  return editor;
};
