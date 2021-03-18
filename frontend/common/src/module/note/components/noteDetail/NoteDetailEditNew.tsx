import React, { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../rootReducer';
import { dispatchCommand, dispatchQuery } from '../../../../utils';
import {
  fetchNoteAction,
  FetchNoteActionPayload,
  updateNoteActionAction,
  UpdateNoteActionPayload,
} from '../../note.actions';
import { UpdateNoteDTO } from '../../../../interfaces';
import { NoteTags } from '../../../../components/NoteTags';
import NotizenEditor from '../../../editor/Editor';
import { createEditor, Node } from 'slate';
import { NoteToolbar } from './NoteToolbar';
import { withReact } from 'slate-react';
import { SideToolbar } from './SideToolbar';

interface INoteDetailProps {}

const NoteDetailEditNew: React.FC<INoteDetailProps> = ({}) => {
  console.log('NoteDetailEditNew');

  const dispatch = useDispatch();
  const { error, isLoading, notes } = useSelector(
    (state: RootState) => state.notes
  );
  const selectedNoteId = useSelector(
    (state: RootState) => state.notes.selectedNoteId
  );

  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const showLoading = true;
  const note = selectedNoteId ? notes[selectedNoteId] : null;

  const handleContentBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    const noteId = selectedNoteId;
    if (noteId) {
      const content = contentRef.current?.innerText;

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
        payload,
        dispatch,
      });
    } else {
      console.error(`noteId : ${selectedNoteId} is undefined`);
    }
  };

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

  const initNodes: Node[] = [
    {
      type: 'paragraph',
      // text: '',
      children: [
        { type: 'paragraph', text: 'test' },
        { type: 'paragraph', text: 'test' },
      ],
    },
  ];
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
    }
    if (note?.content === '') {
      // Focus on content when note has no content (new note)
      contentRef.current?.focus();
    }
  }, [dispatch, selectedNoteId]);

  // Create a Slate editor object that won't change across renders.
  const editor = useMemo(() => withReact(createEditor()), []);

  if (error) {
    return (
      <p className="error text" style={{ color: '#fff' }}>
        {error}
      </p>
    );
  }
  if (isLoading && showLoading) {
    return (
      <p className="error text" style={{ color: '#fff' }}>
        Loading
      </p>
    );
  } else {
    return (
      <>
        {/* <CSSTransition in={selectedNoteId} timeout={400} classNames="noteDetail"> */}
        {/* <div className="relative"> */}
        {/* <Suspense fallback={<div>Chargement</div>}> */}
        {/* <ScrollBar damping={0.5} thumbMinSize={20}> */}

        <div className="h-full overflow-auto base-style bg-gray-50 dark:text-gray-300 dark:bg-gray-900 ">
          {note && (
            <div className="flex justify-center h-full p-8 pt-0">
              <div className="">
                <div className="relative self-auto" style={{ width: 800 }}>
                  <NoteTags />
                  <div
                    className="bg-white dark:bg-black
               
               shadow-2xl
               border border-gray-200 dark:border-black
               dark:ring-1 dark:ring-offset-black"
                    style={{ minHeight: 600 }}
                  >
                    <NoteToolbar editor={editor} />

                    <div className="p-10 ">
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

                      <NotizenEditor editor={editor} nodes={initNodes} />
                      {/* </CSSTransition> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <SideToolbar />
              </div>
            </div>
          )}
        </div>
        {/* </ScrollBar> */}
        {/* </Suspense> */}
        {/* </div> */}
        {/* </CSSTransition> */}
      </>
    );
  }
};

export { NoteDetailEditNew };
