import React from 'react';
import { OptionsMemo } from '../../plugins/options/Options';

export type IImageElementProps = {};

const ImageElement: React.FC<IImageElementProps> = (props: any) => {
  const editor = props.editor;
  const illustration = require('@notizen/frontend-common/assets/undraw/undraw_Appreciation_re_p6rl.svg')
  .default;
  return (
    <div {...props.attributes} className="editor-block relative pointer-events-none">
      <OptionsMemo editor={editor}></OptionsMemo>
      <img src={illustration} alt="" className="w-60" />
      {props.children}
    </div>
  );
};

export default React.memo(ImageElement);