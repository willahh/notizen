import React, { useEffect, Suspense, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';
import {
  fetchNoteThunk,
  updateNoteThunk,
} from '../features/note/noteListSlice';
import { UpdateNoteDTO } from '../interfaces/INote.interface';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { NewTag } from './NewTag';

const scrollbar = require('smooth-scrollbar-react');
const ScrollBar = scrollbar.default;

interface INoteDetailProps {}

const NoteDetailEdit: React.FC<INoteDetailProps> = ({}) => {
  console.log('NoteDetailEdit');

  // const delay = 5;
  const dispatch = useDispatch();
  const { error, isLoading, notes } = useSelector(
    (state: RootState) => state.notes
  );
  // const [show, setShow] = useState(false);
  const selectedNoteId = useSelector(
    (state: RootState) => state.notes.selectedNoteId
  );

  const contentRef = useRef<HTMLDivElement>(null);
  // const contentRef2 = React.createRef();
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

  // const handleContentKeyUp = (e: React.KeyboardEvent) => {
  //   console.log('key up', e);

  //   const noteId = selectedNoteId;
  //   const input = e.target as HTMLElement;
  //   const updateNoteDTO: UpdateNoteDTO = {
  //     content: input.innerText,
  //   };
  //   dispatch(updateNoteThunk({ noteId, updateNoteDTO, serverSync: false }));
  //   contentRef.current?.focus();
  // };

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

  // const [inProp, setInProp] = useState(false);

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
        <div className="flex h-full p-16 base-style bg-gray-50 dark:text-gray-300 dark:bg-gray-900">
          {note ? (
            <div
              className=""
              style={{
                width: '482px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4 mb-2 select-none">
                <span
                  title="fav"
                  className="inline-flex items-center px-2 py-0.5 first-child:border-r-0 rounded border border-indigo-100 dark:border-indigo-800 text-xs font-medium dark:text-indigo-100"
                  style={{ caretColor: '#06afbf' }}
                >
                  <svg
                    className="h-3 w-3 text-indigo-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </span>
                <span className="inline-flex">
                  <span className="inline-flex items-center px-2 py-0.5 first-child:border-r-0 rounded rounded-r-none border-r-0 border border-indigo-100 dark:border-indigo-800 text-xs font-medium dark:text-indigo-100">
                    <svg
                      className="mr-1.5 h-2 w-2 text-indigo-400"
                      fill="currentColor"
                      viewBox="0 0 8 8"
                    >
                      <circle cx="4" cy="4" r="3" />
                    </svg>
                    Tag 1
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded rounded-l-none border border-indigo-100 dark:border-indigo-800 text-xs font-medium dark:text-indigo-100">
                    <svg
                      className="mr-1.5 h-2 w-2 text-indigo-400"
                      fill="currentColor"
                      viewBox="0 0 8 8"
                    >
                      <circle cx="4" cy="4" r="3" />
                    </svg>
                    Tag 2
                  </span>
                </span>
                <NewTag />
              </div>
              <h1
                className="max-w-lg text-justify outline-none"
                onBlur={handleTitleBlur}
                ref={titleRef}
                contentEditable={true}
                dangerouslySetInnerHTML={{ __html: note?.name || '' }}
              ></h1>
              <div
                className="max-w-lg text-justify outline-none"
                onBlur={handleContentBlur}
                // onKeyUp={handleContentKeyUp}
                ref={contentRef}
                contentEditable={true}
                dangerouslySetInnerHTML={{ __html: note?.content || '' }}
              ></div>
            </div>
          ) : (
            <div></div>
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

export { NoteDetailEdit };
