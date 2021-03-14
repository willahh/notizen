import React from 'react';

export type ICodeElementProps = {};

// const CodeElement: React.FC<ICodeElementProps> = (props) => {
export const CodeElement: React.FC<ICodeElementProps> = (props:any) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};
