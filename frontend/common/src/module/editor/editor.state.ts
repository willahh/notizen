import { Editor, Node } from 'slate';
import { ReactEditor } from 'slate-react';

interface EditorState {
  editor: Editor & ReactEditor;
  noteId: string;
}
export const initialEditorState: EditorState = {
  editor: undefined,
  noteId: null
};
