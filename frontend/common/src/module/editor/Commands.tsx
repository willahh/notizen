import { Editor, Transforms, Text } from 'slate';
import { BlockType } from './elements/elements';

export const Commands = {
  isBoldMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.bold === true,
      universal: true,
    });

    return !!match;
  },
  toggleBoldMark(editor) {
    const isActive = Commands.isBoldMarkActive(editor);
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      { match: (n) => Text.isText(n), split: true }
    );
  },


  /**
   * Code
   */
  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === BlockType.Code,
    });

    return !!match;
  },
  toggleCodeBlock(editor) {
    const isActive = Commands.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : BlockType.Code },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },


  /**
   * Heading1
   */
  isHeading1BlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === BlockType.Heading1,
    });

    return !!match;
  },
  toggleHeading1Block(editor) {
    const isActive = Commands.isHeading1BlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : BlockType.Heading1 },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },


  /**
   * Image
   */
  isImageBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === BlockType.Image,
    });

    return !!match;
  },
  toggleImageBlock(editor) {
    const isActive = Commands.isImageBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : BlockType.Image },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },
};
