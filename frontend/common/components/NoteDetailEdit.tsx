import React, { useEffect, Suspense, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';
import {
  fetchNoteThunk,
  updateNoteThunk,
} from '../features/note/noteListSlice';
import { Tag, UpdateNoteDTO } from '../interfaces/INote.interface';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { NewTag } from './NewTag';
import { NoteTags } from './NoteTags';

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
    if (note?.content === '') {
      // Focus on content when note has no content (new note)
      contentRef.current?.focus();
    }
    
  }, [dispatch, selectedNoteId]);

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
    // Note: This is required to manage border-left / border-right / radius left / radius right, because of the use
    // of Utility css....
    // In standard CSS, it will be managed with :firsts-child and :last-child
    const getTagClassName = (notes: Tag[], name: string, index: number) => {
      let noteClassName =
        'inline-flex items-center px-2 py-0.5 rounded border border-indigo-100 dark:border-indigo-800 text-xs font-medium dark:text-indigo-100';

      if (notes.length === 0) {
      } else if (notes.length > 0 && index === 0) {
        noteClassName += ' border-r-0 rounded-r-none';
      } else if (notes.length > 0 && index === notes.length - 1) {
        noteClassName += ' rounded-l-none';
      }

      return noteClassName;
    };
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
              <NoteTags />
              <h1
                className="max-w-lg outline-none cursor-default text-4xl font-semibold"
                onBlur={handleTitleBlur}
                placeholder="Titre"
                ref={titleRef}
                contentEditable={true}
                dangerouslySetInnerHTML={{ __html: note?.name || '' }}
              ></h1>
              <div
                className="max-w-lg text-justify outline-none cursor-default font-thin"
                onBlur={handleContentBlur}
                // onKeyUp={handleContentKeyUp}
                placeholder="Le contenu de ma superbe note"
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
