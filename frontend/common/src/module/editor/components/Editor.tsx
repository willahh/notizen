import React, { useMemo, useState, useCallback } from 'react';

/***
 *
 *
 *
 * - Montre une page (représentation d'un page)
 *   Fond sombre + page en blanc
 * - Mettre le coeur en rouge / rose - trop petit
 *
 * Notion de page dans des notes
 *
 * Personne qui note des cours
 *  - Chapitre / page
 *
 *  - Marges latérales
 *  - Entête
 *  - Bas de page
 *  - Numéro de page en bas à droite
 *  - COmmentaire
 *  - Surlignage  en toggle :
 *    []
 *    - Toggle surlignage ON : tous les textes sélectionés sont surlignés
 *
 *   Bold / Italic / Strike en toggle
 *
 *  - [ ] Représenter des pages et des petites pages
 *
 * Une page commence à la taille d'un post-it et si trop taille max page a4 sio n écrit plus ajoute des pages
 *
 *   - [ ] Notion de portrait ou paysage
 *   - [ ]
 *
 * - Une section peut etre de type post-it ou page
 *  (une section est un item 2 eme colonne
 *
 *  - Postit mode :
 *    (n postits et un + pour ajouter) en grille
 *    [ ] [ ] +
 *    [ ] [ ]
 *    [ ] [ ]
 *
 *
 *  - Sections
 *    - Pages
 *    - Stick (Post-it)
 *
 *  - Laisser les bandes de couleur visible sur les sections
 *
 *  - Section
 *  somaire :
 * Partie I.
 * Section I.
 * Chapitre I.
 * I.
 * A.
 * 1.
 * 2.
 * B.
 * 1.
 * 2.
 * II..
 * Chapitre II.
 * Section II.
 * Partie II.
 *
 *
 * Mode Light / Dark / Dark + page blanche
 *
 */

// Import the Slate editor factory.
import { createEditor, Editor, Node, Transforms, RangeRef } from 'slate';

// Import the Slate components and React plugin.
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { Commands } from './Commands';
import { HoveringToolbar } from './plugins/hoveringToolbar/HoveringToolbar';
import { renderElement } from './elements/elements';
import { UpdateNoteDTO } from '../../../common/interfaces';
import { noteIconColorMap } from '../../../common/components/TagIcon';
import {
  updateNoteActionAction,
  UpdateNoteActionPayload,
} from '../../note/note.actions';
import { dispatchCommand } from '../../../common/utils';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  updateContentAction,
  UpdateContentActionPayload,
} from '../editor.actions';
import { ErrorBoundary } from '../../../common/components/ErrorBoundary';
import { renderLeaf } from './leafs/Leaf';

// Define a React component to render leaves with bold text.
// const Leaf = (props:any) => {
//   return (
//     <span
//       {...props.attributes}
//       className={`${props.leaf.bold ? `font-bold` : ``}`}
//       // style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
//     >
//       {props.children}
//     </span>
//   );
// };

interface IEditor {
  editor: Editor & ReactEditor;
  nodes: Node[];
  noteId: string;
}

export const NotizenEditor: React.FC<IEditor> = ({ editor, nodes, noteId }) => {
  console.log('NotizenEditor', noteId);

  const dispatch = useDispatch();

  // Keep track of state for the value of the editor.
  const [value, setValue] = useState(nodes);

  useEffect(() => {
    console.log('[x] useEffect nodes');
    setValue(nodes);
  }, [nodes]);

  const renderElementMemoized = renderElement(editor);
  const renderLeafMemoized = renderLeaf(editor);

  // Define a leaf rendering function that is memoized with `useCallback`.
  // const renderLeaf = useCallback((props) => {
  //   return <Leaf {...props} />;
  // }, []);


  const addDefaultAtTheEndAndFocus = (editor: Editor & ReactEditor) => {
    console.log('addDefaultAtTheEndAndFocus', editor);

    const node: Node = {
      type: 'paragraph',
      children: [{ type: 'paragraph', text: '' }],
    };
    Transforms.insertNodes(editor, nodes, {
      at: [editor.children.length],
    });
    ReactEditor.focus(editor);
  };

  const handleEditorBlur = (event: any) => {
    console.log('handleEditorBlur', event, editor);
    // return false;
    const content = editor.children;
    const updateNoteDTO: UpdateNoteDTO = {
      id: noteId,
      content: content,
    };
    const payload: UpdateNoteActionPayload = {
      updateNoteDTO: updateNoteDTO,
    };
    dispatchCommand({
      name: updateNoteActionAction.typePrefix,
      action: updateNoteActionAction(payload),
      dispatch: dispatch,
      payload: payload,
    });
  };

  return (
    <ErrorBoundary>
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => {
          console.log('onChange');

          // const payload: UpdateContentActionPayload = {
          //   noteId: noteId,
          //   nodes: value,
          // };
          // dispatchCommand({
          //   name: updateContentAction.type,
          //   action: updateContentAction(payload),
          //   dispatch,
          //   payload,
          // });

          // This is required to keep editor state synchronized
          setValue(value);
        }}
      >
        <HoveringToolbar />
        {/* <button
        onClick={() => {
          addDefaultAtTheEndAndFocus(editor);
        }}
      >
        Add default row
      </button> */}
        <Editable
          renderElement={renderElementMemoized}
          renderLeaf={renderLeafMemoized}
          className="h-full font-normal text-sm text-gray-700 dark:text-gray-300"
          onBlur={handleEditorBlur}
          onClick={(event) => {
            console.log('onClick');

            window._event = event; // TODO
          }}
          onKeyDown={(event) => {
            console.log('on key down');
            if (!event.ctrlKey) {
              return;
            }

            // Replace the `onKeyDown` logic with our new commands.
            switch (event.key) {
              case 'p': {
                event.preventDefault();
                Commands.toggleCodeBlock(editor);
                break;
              }

              case 'b': {
                event.preventDefault();
                Commands.toggleBoldMark(editor);
                break;
              }

              case 'h': {
                event.preventDefault();
                Commands.toggleHeading1Block(editor);
                break;
              }
            }
          }}
        />
      </Slate>
    </ErrorBoundary>
  );
};

export default NotizenEditor;
