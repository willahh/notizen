import React from 'react';
import { OptionsMemo } from './../../../../module/editor/components/plugins/options/Options';

export type IBlockQuoteElementProps = {};

const BlockQuoteElement: React.FC<IBlockQuoteElementProps> = (props: any) => {
  const editor = props.editor;
  return (
    <blockquote
      {...props.attributes}
      className="editor-block relative border-gray-500 pl-4"
      style={{ borderLeftWidth: '3px', left: '-20px' }}
    >
      <OptionsMemo editor={editor}></OptionsMemo>
      {props.children}
    </blockquote>
  );
};

export default React.memo(BlockQuoteElement);
