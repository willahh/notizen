import React from 'react';
import { Options } from '../../plugins/options/Options';

export type ICodeElementProps = {};

export const CodeElement: React.FC<ICodeElementProps> = (props:any) => {
  const editor = props.editor;
  return (
    <pre {...props.attributes} className="editor-block relative bg-gray-50">
      <Options editor={editor}></Options>
      <code>{props.children}</code>
    </pre>
  );
};
