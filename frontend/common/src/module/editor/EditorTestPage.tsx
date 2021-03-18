import React, { useMemo } from 'react';
import { NotizenEditor } from './Editor';
import { createEditor, Node } from 'slate';
import { withReact } from 'slate-react';

export type IEditorTestPageProps = {};
const nodes: Node[] = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
];

const EditorTestPage: React.FC<IEditorTestPageProps> = ({}) => {
  const editor = useMemo(() => withReact(createEditor()), []);
  return (
    <div className="bg-white dark:bg-black p-20 h-screen">
      <h2 className="dark:text-white text-xl">Editor test</h2>
      <NotizenEditor editor={editor} nodes={nodes}></NotizenEditor>
    </div>
  );
};

export { EditorTestPage };
