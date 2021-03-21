/**
 * TODO: Remove this namespace, use the new organisation
 */
import { Editor, Transforms, Text, Node, RangeRef } from 'slate';
import { ReactEditor } from 'slate-react';
import { ElementType } from './elements/elements';
import { LeafType } from './leafs/Leaf';

// TODO: Debug
declare global {
  interface Window {
    Editor: any;
    Transforms: any;
    Text: any;
    RangeRef: any;
    ReactEditor: any;
  }
}
window.Editor = Editor;
window.Transforms = Transforms;
window.Text = Text;
window.RangeRef = RangeRef;
window.ReactEditor = ReactEditor;

export const Commands = {
  isBoldMarkActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === LeafType.Bold,
      universal: true,
    });

    return !!match;
  },
  toggleBoldMark(editor: Editor) {
    console.log('toggleBoldMark');
    
    const isActive = Commands.isBoldMarkActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : LeafType.Bold },
      { match: (n) => Text.isText(n), split: true }
    );
  },

  /**
   * Code
   */
  isCodeBlockActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === ElementType.Code,
    });

    return !!match;
  },
  toggleCodeBlock(editor: Editor) {
    const isActive = Commands.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : ElementType.Code },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },

  /**
   * Heading1
   */
  isHeading1BlockActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === ElementType.Heading1,
    });

    return !!match;
  },
  toggleHeading1Block(editor: Editor) {
    const isActive = Commands.isHeading1BlockActive(editor);

    // const path = ReactEditor.findPath(editor, element);
    // const node: Node = { type: BlockType.Heading1, text: 'bla bla' };
    // Transforms.setNodes(editor, node, { at: path });

    // Transforms.setNodes(
    //   editor,
    //   { type: isActive ? null : BlockType.Heading1 },

    //   {
    //     match: (n) => {
    //       console.log('match', n);

    //       return Editor.isBlock(editor, n);
    //     },
    //   }, {at?: [0, 1]}
    // );
  },

  /**
   * Image
   */
  isImageBlockActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === ElementType.Image,
    });

    return !!match;
  },
  toggleImageBlock(editor: Editor) {
    const isActive = Commands.isImageBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : ElementType.Image },
      {
        match: (n) => {
          console.log('match', n);

          return Editor.isBlock(editor, n);
        },
      }
    );
  },
};
