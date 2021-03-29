import React from 'react';
import NewTag from './../../../../module/note/components/noteDetail/NewTag';
import { OptionsMemo } from '../../components/plugins/options/Options';

export type ITagElementProps = {};

const TagElement: React.FC<ITagElementProps> = (props: any) => {
  console.log('TagElement', props);
  
  const editor = props.editor;
  // const noteId = "aaaa";
  const noteId = props.noteId;
  console.log('noteId', noteId);

  return (
    <div {...props.attributes} className="editor-block relative" contentEditable={false}> 
      <OptionsMemo editor={editor}></OptionsMemo>
      <span>
      <NewTag noteId={noteId}  />

      </span>
      <div>{props.children}</div>
    </div>
  );
};

export default React.memo(TagElement);
