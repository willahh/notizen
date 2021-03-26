import React from 'react';
import { OptionsMemo } from '../plugins/options/Options';

export type ICodeElementProps = {};

const CodeElement: React.FC<ICodeElementProps> = (props: any) => {
  const editor = props.editor;
  return (
    <pre {...props.attributes} className="editor-block relative bg-gray-50">
      <OptionsMemo editor={editor}></OptionsMemo>
      <code>{props.children}</code>
    </pre>
  );
};

export default React.memo(CodeElement);
