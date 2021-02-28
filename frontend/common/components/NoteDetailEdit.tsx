import React, { useEffect, Suspense, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';
import {
  fetchNoteThunk,
  updateNoteThunk,
} from '../features/note/noteListSlice';
import { UpdateNoteDTO } from '../interfaces/INote.interface';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const scrollbar = require('smooth-scrollbar-react');
const ScrollBar = scrollbar.default;

interface INoteDetailProps {}

const NoteDetailEdit: React.FC<INoteDetailProps> = ({}) => {
  console.log('NoteDetailEdit');

  const delay = 5;
  const dispatch = useDispatch();
  const { error, isLoading, notes } = useSelector(
    (state: RootState) => state.notes
  );
  // const [show, setShow] = useState(false);
  const selectedNoteId = useSelector(
    (state: RootState) => state.notes.selectedNoteId
  );

  const contentRef = useRef<HTMLDivElement>(null);
  const contentRef2 = React.createRef();
  const titleRef = useRef<HTMLDivElement>(null);

  const handleContentBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    const noteId = selectedNoteId;
    const content = contentRef.current?.innerText;
    console.log('content', content);

    const updateNoteDTO: UpdateNoteDTO = {
      content: content,
    };
    dispatch(updateNoteThunk({ noteId, updateNoteDTO, serverSync: true }));
  };

  const handleContentKeyUp = (e: React.KeyboardEvent) => {
    console.log('key up', e);

    const noteId = selectedNoteId;
    const input = e.target as HTMLElement;
    const updateNoteDTO: UpdateNoteDTO = {
      content: input.innerText,
    };
    dispatch(updateNoteThunk({ noteId, updateNoteDTO, serverSync: false }));
    contentRef.current?.focus();
  };

  const handleTitleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    const noteId = selectedNoteId;
    const updateNoteDTO: UpdateNoteDTO = {
      name: titleRef.current?.innerText,
    };
    dispatch(updateNoteThunk({ noteId, updateNoteDTO, serverSync: true }));
  };

  // TODO showLoading
  const showLoading = true;
  const note = selectedNoteId ? notes[selectedNoteId] : null;

  useEffect(() => {
    console.log('#notedetail effect selectedNoteId', selectedNoteId);

    if (selectedNoteId) {
      dispatch(fetchNoteThunk(selectedNoteId));
    }
    // let timer1 = setTimeout(() => setShow(true), 1000);
    // return () => {
    //   clearTimeout(timer1);
    // };
  }, [dispatch, selectedNoteId]);

  const [inProp, setInProp] = useState(false);

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
        {/* <button onClick={() => setInProp(true)}>Click to Enter</button> */}
        {/* <CSSTransition in={selectedNoteId} timeout={400} classNames="noteDetail"> */}
        {/* <div className="relative"> */}
        {/* <Suspense fallback={<div>Chargement</div>}> */}
        {/* <ScrollBar damping={0.5} thumbMinSize={20}> */}
        <div className="flex h-full py-4 space-y-2 sm:px-6 sm:space-y-4 lg:px-8 base-style bg-gray-50 dark:text-gray-300 dark:bg-gray-900">
          <div className="max-w-screen-lg">
            <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4 mb-2 select-none">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100">
                <svg
                  className="mr-1.5 h-2 w-2 text-indigo-400"
                  fill="currentColor"
                  viewBox="0 0 8 8"
                >
                  <circle cx="4" cy="4" r="3" />
                </svg>
                Tag 1
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100">
                <svg
                  className="mr-1.5 h-2 w-2 text-indigo-400"
                  fill="currentColor"
                  viewBox="0 0 8 8"
                >
                  <circle cx="4" cy="4" r="3" />
                </svg>
                Tag 2
              </span>
            </div>
            <h1
              className="max-w-lg text-justify"
              onBlur={handleTitleBlur}
              ref={titleRef}
              contentEditable={true}
              dangerouslySetInnerHTML={{ __html: note?.name || '' }}
            ></h1>
            <div
              className="max-w-lg text-justify"
              onBlur={handleContentBlur}
              // onKeyUp={handleContentKeyUp}
              ref={contentRef}
              contentEditable={true}
              dangerouslySetInnerHTML={{ __html: note?.content || '' }}
            ></div>
          </div>
        </div>
        {/* </ScrollBar> */}
        {/* </Suspense> */}
        {/* </div> */}
        {/* </CSSTransition> */}
      </>
    );
  }
};

export { NoteDetailEdit };
