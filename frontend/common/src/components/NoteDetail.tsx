import React, { useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './../rootReducer';
import { dispatchQuery } from '../utils';
import { fetchNoteAction, FetchNoteActionPayload } from '../module/note/note.actions';
const scrollbar = require('smooth-scrollbar-react');
const ScrollBar = scrollbar.default;

interface INoteDetailProps {}

const NoteDetail: React.FC<INoteDetailProps> = ({}) => {
  console.log('NoteDetail');

  const dispatch = useDispatch();
  const { error, isLoading, notes } = useSelector(
    (state: RootState) => state.notes
  );
  const selectedNoteId = useSelector(
    (state: RootState) => state.notes.selectedNoteId
  );

  const showLoading = true;
  const note = selectedNoteId ? notes[selectedNoteId] : null;

  useEffect(() => {
    if (selectedNoteId) {
      const payload: FetchNoteActionPayload = {
        noteId: selectedNoteId
      }
      dispatchQuery({
        name: fetchNoteAction.typePrefix,
        payload: payload,
        action: fetchNoteAction(payload),
        dispatch: dispatch,
      })
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
    return (
      <Suspense fallback={<div>Chargement</div>}>
        <ScrollBar damping={0.5} thumbMinSize={20}>
          <div className="flex h-full py-4 space-y-2 sm:px-6 sm:space-y-4 lg:px-8 base-style items-center justify-center bg-gray-50 dark:text-gray-300 dark:bg-gray-900">
            <div
              className="max-w-lg text-justify"
              dangerouslySetInnerHTML={{ __html: note?.content || '' }}
            ></div>
          </div>
        </ScrollBar>
      </Suspense>
    );
  }
};

export { NoteDetail };
