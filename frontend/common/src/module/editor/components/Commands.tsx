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
