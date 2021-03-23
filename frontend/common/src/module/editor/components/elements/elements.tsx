// Define a rendering function based on the element passed to `props`. We use

import { useCallback } from 'react';
import { Editor } from 'slate';
import { ReactEditor } from 'slate-react';
import CodeElement from './code/CodeElement';
import DefaultElement from './default/DefaultElement';
import Heading1Element from './heading1/Heading1';
import Heading2Element from './heading2/Heading2';
import Heading3Element from './heading3/Heading3';
import ImageElement from './image/ImageElement';

export enum ElementType {
  Default = 'DEFAULT',
  Paragraph = 'PARAGRAPH',
  Heading1 = 'HEADING1',
  Heading2 = 'HEADING2',
  Heading3 = 'HEADING3',
  Heading4 = 'HEADING4',
  Heading5 = 'HEADING5',
  Heading6 = 'HEADING6',
  Code = 'CODE',
  Image = 'IMAGE',
  ListItem = 'LIST_ITEM',
  BlockQuote = 'BLOCK_QUOTE',
  BulletedList = 'BULLETED_LIST',
}

export const renderElement = (editor: Editor & ReactEditor) =>
  useCallback((props) => {
    switch (props.element.type) {
      case ElementType.Default:
        return <DefaultElement {...props} />;
      case ElementType.Paragraph:
        return <p {...props.attributes}>{props.children}</p>;
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

      case ElementType.BlockQuote:
        return <blockquote {...props.attributes}>{props.children}</blockquote>;
      case ElementType.BulletedList:
        return <ul {...props.attributes}>{props.children}</ul>;
      case ElementType.Heading1:
        return <Heading1Element {...props} />;
      case ElementType.Heading2:
        return <Heading2Element {...props} />;
      case ElementType.Heading3:
        return <Heading3Element {...props} />;
      case ElementType.Heading4:
        return <h4 {...props.attributes}>{props.children}</h4>;
      case ElementType.Heading5:
        return <h5 {...props.attributes}>{props.children}</h5>;
      case ElementType.Heading6:
        return <h6 {...props.attributes}>{props.children}</h6>;
      case ElementType.ListItem:
        return <li {...props.attributes}>{props.children}</li>;

      default:
        // return <DefaultElement {...props} editor={editor} />;
        return <p {...props.attributes}>{props.children}</p>;
    }
  }, []);
