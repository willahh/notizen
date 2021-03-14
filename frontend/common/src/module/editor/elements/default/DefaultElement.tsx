import { useState } from 'react';
import { Options } from './../../plugins/options/Options';

export type IDefaultElementProps = {};

// const CodeElement: React.FC<IDefaultElementProps> = (props) => {
export const DefaultElement: React.FC<IDefaultElementProps> = (props: any) => {
  return (
    <div {...props.attributes} className="editor-block relative flex">
      <Options editor={props.editor}></Options>
      <div className="w-full" style={{ minHeight: 24 }}>
        {props.children}
      </div>
      <div
        contentEditable={false}
        className="pl-6 dark:text-indigo-500"
        style={{ width: 200 }}
      >
        ... Add a new action
      </div>
    </div>
  );
};
