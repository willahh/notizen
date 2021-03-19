import React from 'react';
import { Options } from '../../plugins/options/Options';


export type IImageElementProps = {};

export const ImageElement: React.FC<IImageElementProps> = (props: any) => {
  const editor = props.editor;
  const illustration = require('@notizen/frontend-common/assets/undraw/undraw_Appreciation_re_p6rl.svg')
  .default;
  return (
    <div {...props.attributes} className="editor-block relative pointer-events-none">
      <Options editor={editor}></Options>
      <img src={illustration} alt="" className="w-60" />
      {props.children}
    </div>
  );
};
