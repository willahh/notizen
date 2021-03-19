import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import NotizenEditor from '../../../editor/Editor';
import { createEditor, Node } from 'slate';
import { NoteToolbar } from './NoteToolbar';
import { withReact } from 'slate-react';
import { SideToolbar } from './SideToolbar';
import { CSSTransition } from 'react-transition-group';

// import {} from './../../../../../assets/undraw/undraw_Appreciation_re_p6rl.svg'

const illustration = require('./../../../../../assets/undraw/undraw_Appreciation_re_p6rl.svg')
  .default;

interface INoteDetailProps {}

const NoteDetailEditNew: React.FC<INoteDetailProps> = ({}) => {
  console.log('NoteDetailEditNew');

  const dispatch = useDispatch();
  const { notes } = useSelector((state: RootState) => state.notes);
  const selectedNoteId = useSelector(
    (state: RootState) => state.notes.selectedNoteId
  );

  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const note = selectedNoteId ? notes[selectedNoteId] : null;



  // Create a Slate editor object that won't change across renders.
  const editor = useMemo(() => withReact(createEditor()), []);
  useEffect(() => {
    console.log('#notedetail effect selectedNoteId', selectedNoteId);

    if (selectedNoteId) {
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

  let nodes = note.content;

  if (Array.isArray(nodes) && nodes.length === 0) {
    console.log('[x] nodes empty array');

    nodes = [
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

  const anim = false;

  return (
    <>
      {/* <CSSTransition in={selectedNoteId} timeout={400} classNames="noteDetail"> */}
      {/* <div className="relative"> */}
      {/* <Suspense fallback={<div>Chargement</div>}> */}
      {/* <ScrollBar damping={0.5} thumbMinSize={20}> */}

      <div className="h-full overflow-auto base-style bg-gray-50 dark:text-gray-300 dark:bg-gray-900 ">
        <CSSTransition
          in={anim}
          timeout={300}
          classNames="style-dropdown"
          // unmountOnExit
        >
          <div className="flex justify-center h-full p-8 pt-0">
            <div className="">
              <div className="relative self-auto" style={{ width: 800 }}>
                <NoteTags />
                <div
                  className="flex bg-white dark:bg-black
               shadow-2xl
               dark:border-black
               dark:ring-1 dark:ring-offset-black"
                  style={{ minHeight: 600 }}
                >
                  {/* <NoteToolbar editor={editor} /> */}

                  <div className="flex flex-col w-full p-10">
                    {/* <CSSTransition in={note.isFav} timeout={400} classNames="item"> */}
                    <h1
                      className="outline-none cursor-default text-4xl font-semibold"
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
                      nodes={nodes}
                      noteId={selectedNoteId}
                    />
                    {/* </CSSTransition> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <SideToolbar />
            </div>
          </div>
        </CSSTransition>
      </div>
      {/* </ScrollBar> */}
      {/* </Suspense> */}
      {/* </div> */}
      {/* </CSSTransition> */}
    </>
  );
};

export { NoteDetailEditNew };
