// Define a rendering function based on the element passed to `props`. We use

import { useCallback } from 'react';
import { Editor } from 'slate';
import { ReactEditor } from 'slate-react';
import { CodeElement } from './code/CodeElement';
import { DefaultElement } from './default/DefaultElement';
import { Heading1Element } from './heading1/Heading1';
import { Heading2Element } from './heading2/Heading2';
import { Heading3Element } from './heading3/Heading3';
import { ImageElement } from './image/ImageElement';

export enum ElementType {
  Default = 'DEFAULT',
  Heading1 = 'HEADING1',
  Heading2 = 'HEADING2',
  Heading3 = 'HEADING3',
  Code = 'CODE',
  Image = 'IMAGE',
}

export const renderElement = (editor: Editor & ReactEditor) =>
  useCallback((props) => {
    switch (props.element.type) {
      case ElementType.Default:
        return <DefaultElement {...props} />;
      case ElementType.Heading1:
        return <Heading1Element {...props} />;
      case ElementType.Heading2:
        return <Heading2Element {...props} />;
      case ElementType.Heading3:
        return <Heading3Element {...props} />;
        case ElementType.Code:
          return <CodeElement {...props} />;
      case ElementType.Image:
        return <ImageElement {...props} />;
      default:
        return <DefaultElement {...props} editor={editor} />;
    }
  }, []);
