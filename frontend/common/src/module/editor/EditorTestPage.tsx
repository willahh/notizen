import React from 'react';
import { NotizenEditor } from './Editor';

export type IEditorTestPageProps = {};

const EditorTestPage: React.FC<IEditorTestPageProps> = ({}) => {
  return (
    <div className="bg-white dark:bg-black p-20 h-screen">
      <h2 className="dark:text-white text-xl">Editor test</h2>
      <NotizenEditor></NotizenEditor>
    </div>
  );
};

export { EditorTestPage };
