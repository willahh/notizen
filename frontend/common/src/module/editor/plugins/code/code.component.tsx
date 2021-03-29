import React from 'react';
import { OptionsMemo } from '../../components/plugins/options/Options';

export type ICodeElementProps = {};

const CodeElement: React.FC<ICodeElementProps> = (props: any) => {
  const editor = props.editor;
  return (
    <pre {...props.attributes} className="editor-block relative p-4 rounded-md
    bg-gray-50 dark:bg-gray-900
    border border-gray-200 dark:border-gray-700">
      <OptionsMemo editor={editor}></OptionsMemo>
      <code className="language-html">{props.children}</code>
    </pre>
  );
};

export default React.memo(CodeElement);
