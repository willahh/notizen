import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';
import { mapOfKeyValueToArrayOfMap } from '../app/utils';
import { INote, TagEntity } from '../interfaces/INote.interface';
import { NewTag } from './NewTag';

interface INoteTagsProps {}

const NoteTags: React.FC<INoteTagsProps> = ({}) => {
  console.log('NoteTags');
  const { notes } = useSelector((state: RootState) => state.notes);
  const selectedNoteId = useSelector(
    (state: RootState) => state.notes.selectedNoteId
  );
  const tags = useSelector((state: RootState) => state.tags.tags);

  const note: INote | null = selectedNoteId ? notes[selectedNoteId] : null;
  const tagsList: TagEntity[] = mapOfKeyValueToArrayOfMap(tags);
  const noteTags = note.tags;
  const noteId = note?.id;

  // Note: This is required to manage border-left / border-right / radius left / radius right, because of the use
  // of Utility css....
  // In standard CSS, it will be managed with :firsts-child and :last-child
  const getTagClassName = (tags: TagEntity[], name: string, index: number) => {
    let noteClassName =
      'inline-flex items-center px-2 py-0.5 rounded border border-indigo-100 dark:border-indigo-800 text-xs font-medium dark:text-indigo-100';

    if (tags.length === 0) {
    } else if (tags.length === 1) {
      noteClassName += '';
    } else if (tags.length > 0 && index === 0) {
      noteClassName += ' border-r-0 rounded-r-none';
    } else if (tags.length > 0 && index === tags.length - 1) {
      noteClassName += ' rounded-l-none';
    }

    return noteClassName;
  };
  return (
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
          {noteTags &&
            noteTags.map(({ id, name }, index) => (
              <span key={`notetag-${id}`} className={getTagClassName(noteTags, name, index)}>
                <svg
                  className="mr-1.5 h-2 w-2 text-indigo-400"
                  fill="currentColor"
                  viewBox="0 0 8 8"
                >
                  <circle cx="4" cy="4" r="3" />
                </svg>
                {name}
              </span>
            ))}
        </span>
        {noteTags && <NewTag noteId={Number(noteId)} tags={tagsList} noteTags={noteTags} />}
      </div>
    </div>
  );
};

export { NoteTags };
