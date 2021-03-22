import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { RootState } from '../../../../common/rootReducer';
import { dispatchCommand, dispatchQuery } from '../../../../common/utils';
import {
  fetchNoteAction,
  FetchNoteActionPayload,
  updateNoteActionAction,
  UpdateNoteActionPayload,
} from '../../note.actions';
import { UpdateNoteDTO } from '../../../../common/interfaces';
import { NoteTags } from './NoteTags';
import NotizenEditor from '../../../editor/components/Editor';
import { createEditor, Editor, Node } from 'slate';
import { NoteToolbar } from './NoteToolbar';
import { ReactEditor, withReact } from 'slate-react';
import { SideToolbar } from './SideToolbar';
import {
  CSSTransition,
  SwitchTransition,
  TransitionGroup,
} from 'react-transition-group';
import { withShortcuts } from '../../../editor/components/plugins/withShortcuts';

// import {} from './../../../../../assets/undraw/undraw_Appreciation_re_p6rl.svg'

const illustration = require('./../../../../../assets/undraw/undraw_Appreciation_re_p6rl.svg')
  .default;

interface INoteDetailProps {}
declare global {
  interface Window {
    editor: Editor & ReactEditor;
    previousNoteId: string;
  }
}
const NoteDetailEditNew: React.FC<INoteDetailProps> = ({}) => {
  console.log('NoteDetailEditNew');

  const dispatch = useDispatch();
  const { notes } = useSelector((state: RootState) => state.notes);
  const selectedNoteId = useSelector(
    (state: RootState) => state.notes.selectedNoteId
  );
  // let editorNodes = useSelector((state: RootState) => state.editor.nodes);

  // const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const note = selectedNoteId ? notes[selectedNoteId] : null;

  // Create a Slate editor object that won't change across renders.
  const editor = useMemo(() => withShortcuts(withReact(createEditor())), [])
  // dispatch(setCurrentEditorAction({ editor: editor }));

  // TODO: Where to put a reference to this editor ????
  // Can't be in Redux store, because complex object can't transit inside actions
  window.editor = editor;
  const [mode, setMode] = React.useState('out-in');
  const [state, setState] = React.useState(true);

  useEffect(() => {
    console.log('#notedetail effect selectedNoteId', selectedNoteId);

    if (selectedNoteId) {
      window.previousNoteId = selectedNoteId;
      const payload: FetchNoteActionPayload = {
        noteId: selectedNoteId,
      };
      dispatchQuery({
        name: fetchNoteAction.typePrefix,
        action: fetchNoteAction(payload),
        payload,
        dispatch,
      });
      // setNodes();
    }
    // if (note?.content === '') {
    //   // Focus on content when note has no content (new note)
    //   contentRef.current?.focus();
    // }
  }, [dispatch, selectedNoteId]);

  if (!note) {
    return (
      <div>
        <img
          className="absolute bottom-0 right-0 opacity-30"
          src={illustration}
          alt=""
        />
      </div>
    );
  }
  const noteId = note.id;
  const anim = window.previousNoteId !== noteId;

  let editorNodes = note.content;

  if (Array.isArray(editorNodes) && editorNodes.length === 0) {
    editorNodes = [
      {
        type: 'paragraph',
        children: [{ type: 'paragraph', text: 'empty' }],
      },
    ];
  }

  const handleTitleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    const noteId = selectedNoteId;
    if (noteId) {
      const updateNoteDTO: UpdateNoteDTO = {
        id: noteId,
        name: titleRef.current?.innerText,
      };
      const payload: UpdateNoteActionPayload = {
        updateNoteDTO: updateNoteDTO,
      };
      dispatchCommand({
        name: updateNoteActionAction.typePrefix,
        action: updateNoteActionAction(payload),
        payload,
        dispatch,
      });
    } else {
      console.error(`noteId: ${noteId} is undefined`);
    }
  };

  return (
    <>
      {/* <CSSTransition in={selectedNoteId} timeout={400} classNames="noteDetail"> */}
      {/* <div className="relative"> */}
      {/* <Suspense fallback={<div>Chargement</div>}> */}
      {/* <ScrollBar damping={0.5} thumbMinSize={20}> */}

      <div className="pointer-events-none absolute h-24 inset-x-0 z-10 bg-gradient-to-b from-white dark:from-gray-900"></div>
      <div className="pointer-events-none absolute bottom-0 h-24 inset-x-0 z-10 bg-gradient-to-t from-white dark:from-gray-900"></div>
      <div className="relative h-full overflow-auto base-style   ">
        {/* <SwitchTransition mode="out-in"> */}
        {/* TODO: Need to use a specific route for note detail */}
        <TransitionGroup
        // childFactory={(child) => {
        //   console.log('[x] childFactory', child);
        //   // debugger;
        //   return React.cloneElement(child);
        // }}
        >
          <CSSTransition
            onExit={() => {
              console.log('on exit', this);
            }}
            key={anim ? 'a' : 'b'}
            timeout={300}
            // classNames="style-dropdown"
            classNames="fade"
            unmountOnExit
          >
            <div className="absolute flex justify-center w-full h-full p-14 pt-0">
              <div
                className="relative w-full app-region-drag-off"
                style={{ maxWidth: 800 }}
              >
                <NoteTags />
                <div
                  className="note-page flex
                  xl:bg-white xl:dark:bg-black
                  transform ease-out duration-300 transition
                  xl:shadow-2xl
                 
                  "
                  style={{ minHeight: 600 }}
                >
                  {/* <NoteToolbar editor={editor} /> */}

                  <div
                    className="relative flex flex-col w-full p-0 xl:p-14
                  transform ease-out duration-300 transition-all"
                  >
                    {/* <CSSTransition in={note.isFav} timeout={400} classNames="item"> */}
                    <h1
                      className="outline-none cursor-default text-4xl font-semibold dark:text-white"
                      onBlur={handleTitleBlur}
                      placeholder="Titre"
                      ref={titleRef}
                      contentEditable={true}
                      dangerouslySetInnerHTML={{ __html: note?.name || '' }}
                    ></h1>
                    {/* <div
                    className="text-justify outline-none cursor-default font-thin"
                    onBlur={handleContentBlur}
                    // onKeyUp={handleContentKeyUp}
                    placeholder="Le contenu de ma superbe note"
                    ref={contentRef}
                    contentEditable={true}
                    dangerouslySetInnerHTML={{ __html: note?.content || '' }}
                  ></div> */}

                    <NotizenEditor
                      editor={editor}
                      nodes={editorNodes}
                      noteId={note.id}
                    />
                    {/* </CSSTransition> */}
                  </div>
                </div>
              </div>
              <div className="">
                <SideToolbar editor={editor} noteId={noteId} />
              </div>
            </div>
          </CSSTransition>
          {/* </SwitchTransition> */}
        </TransitionGroup>
      </div>
      {/* </ScrollBar> */}
      {/* </Suspense> */}
      {/* </div> */}
      {/* </CSSTransition> */}
    </>
  );
};

export { NoteDetailEditNew };
