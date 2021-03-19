// Define a rendering function based on the element passed to `props`. We use

import React, { useCallback } from 'react';
import { CodeElement } from './code/CodeElement';
import { DefaultElement } from './default/DefaultElement';
import { Heading1Element } from './heading1/Heading1';
import { ImageElement } from './image/ImageElement';

export enum BlockType {
  Code = 'CODE',
  Heading1 = 'HEADING1',
  Image = 'IMAGE',
}

export const renderElement = (editor) =>
  useCallback((props) => {
    switch (props.element.type) {
      case BlockType.Code:
        return <CodeElement {...props} />;
      case BlockType.Heading1:
        return <Heading1Element {...props} />;
      case BlockType.Image:
        return <ImageElement {...props} />;
      default:
        return <DefaultElement {...props} editor={editor} />;
    }
  }, []);
