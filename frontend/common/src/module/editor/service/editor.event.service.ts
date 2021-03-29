import { Editor } from 'slate';
import { ElementType } from '../components/elements/elements';
import {
  onEnterKeydown as onEditorEnterKeydown,
  toggleBlockQuote,
} from '../plugins/blockquote/blockquote.service';
import { onEditorEnterKeydown as onCodeEditorEnterKeydown } from '../plugins/code/code.service';
import { toggleHeadingOne } from '../plugins/headingone/headingone.service';
import { toggleTag } from '../plugins/tag/tag.service';
import { toggleBold } from './editor.action.service';

export const onEditorKeydown = (
  event,
  editor: Editor,
  noteId: string,
  dispatch
) => {
  console.log('onEditorKeydown');

  if (event.key === 'Enter') {
    const match = Editor.above(editor, {
      match: (n) => Editor.isBlock(editor, n),
    });
    if (match) {
      const [block, path] = match;
      switch (block.type) {
        case ElementType.BlockQuote:
          onEditorEnterKeydown(event, editor);
          break;
        case ElementType.Code:
          onCodeEditorEnterKeydown(event, editor);
          break;
      }
    }
  }

  // TODO NEW LINE
  // debugger;

  if (!event.ctrlKey) {
    return;
  }

  // Replace the `onKeyDown` logic with our new commands.
  switch (event.key) {
    case 'p': {
      event.preventDefault();
      const range = editor.selection;
      toggleBlockQuote(editor, noteId, range, dispatch);
      break;
    }

    case 'b': {
      console.log('ctrl + b');
      event.preventDefault();
      const range = editor.selection;
      toggleBold(editor, noteId, range, dispatch);
      break;
    }

    case 'h': {
      event.preventDefault();
      const range = editor.selection;
      toggleHeadingOne(editor, noteId, range, dispatch);
      break;
    }

    case 't': {
      event.preventDefault();
      const range = editor.selection;
      toggleTag(editor, noteId, range, dispatch);
      break;
    }
  }
};
