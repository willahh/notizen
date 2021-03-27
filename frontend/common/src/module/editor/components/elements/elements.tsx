// Define a rendering function based on the element passed to `props`. We use

import { useCallback } from 'react';
import { Editor } from 'slate';
import { ReactEditor } from 'slate-react';
import CodeElement from './elements/CodeElement';
import BlockQuoteElement from './elements/BlockQuoteElement';
import DefaultElement from './elements/DefaultElement';
import Heading1Element from './elements/Heading1';
import Heading2Element from './elements/Heading2';
import Heading3Element from './elements/Heading3';
import ImageElement from './elements/ImageElement';

export enum ElementType {
  // Default = 'DEFAULT',
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
  NumberedList = 'NUMBERED_LIST',
  Divider = 'DIVIDER',
}

export const renderElement = (editor: Editor & ReactEditor) =>
  useCallback((props) => {
    switch (props.element.type) {
      // case ElementType.Default:
      //   return <DefaultElement {...props} />;
      case ElementType.Paragraph:
        return <p {...props.attributes}>{props.children}</p>;
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
      case ElementType.Code:
        return <CodeElement {...props} />;
      case ElementType.BlockQuote:
        return <BlockQuoteElement {...props} />;
      case ElementType.Image:
        return <ImageElement {...props} />;
      case ElementType.BlockQuote:
        return <blockquote {...props.attributes}>{props.children}</blockquote>;
      case ElementType.BulletedList:
        return <ul {...props.attributes}>{props.children}</ul>;
      case ElementType.ListItem:
        return <li {...props.attributes}>{props.children}</li>;
      // TODO
      case ElementType.NumberedList:
        return <li {...props.attributes}>{props.children}</li>;
      case ElementType.Divider:
        return <hr className="bg-black dark:bg-indigo-800 h-1" />;

      default:
        // return <DefaultElement {...props} editor={editor} />;
        return <p {...props.attributes}>{props.children}</p>;
    }
  }, []);
