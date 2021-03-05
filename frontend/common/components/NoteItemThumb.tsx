import React from 'react';
// import { useSpring, animated } from 'react-spring';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';
import {
  deleteNoteThunk,
  setSelectedNoteId,
} from '../features/note/noteListSlice';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { JsxElement } from 'typescript';
// import TransitionGroup from 'react-transition-group/TransitionGroup';
// import ReactTransitionGroup from 'react/lib/ReactTransitionGroup';

// TODO: Share with INote (and with back Note)
interface INoteItemProps {
  id: string;
  title: string | undefined;
  text: string | undefined;
  tags: string[];
  isSelected: boolean;
}
function truncateString(str: string, num: number) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
}

const NoteItemThumb: React.FC<INoteItemProps> = ({ id, text, title, tags }) => {
  console.log('NoteItemThumb', id);

  const dispatch = useDispatch();
  const selectedNoteId = useSelector(
    (state: RootState) => state.notes.selectedNoteId
  );
  const isSelected = id === selectedNoteId;

  let className = 'relative py-5 px-4 bg-white dark:bg-black';
  if (isSelected) {
    className += ' border-l-4 border-indigo-700';
  } else {
    className += ' border-white dark:border-black';
  }
  const btnClassName =
    'relative inline-flex items-center p-2 border-1 border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 rounded-md bg-white dark:bg-black dark:border-gray-800';

  const tagType = Math.round(Math.random() * 5);
  let tagColorClassName = ' text-green-800 bg-green-100';
  switch (tagType) {
    case 0:
      tagColorClassName = ' text-red-800 bg-red-100';
      break;
    case 1:
      tagColorClassName = ' text-yellow-800 bg-yellow-100';
      break;
    case 2:
      tagColorClassName = ' text-blue-800 bg-blue-100';
      break;
    case 3:
      tagColorClassName = ' text-indigo-800 bg-indigo-100';
      break;
    case 4:
      tagColorClassName = ' text-purple-800 bg-purple-100';
      break;
  }
  return (
    <li className="w-52 h-52 overflow-hidden border border-gray-200 dark:border-gray-700 rounded-md p-4">
      <div className="flex flex-col h-full">
        <div className="relative">
          <span className="absolute right-2 top-2 flex-shrink-0 inline-block px-2 py-0.5 text-xs font-medium rounded-full">
            Pin
          </span>

          <h3
            className="text-gray-900 dark:text-gray-50"
            style={{ fontSize: 'xx-small' }}
          >
            {title}
          </h3>
          <div
            className="text-gray-300 dark:text-gray-700"
            style={{ fontSize: 'xx-small' }}
          >
            {text}
          </div>
        </div>
        <div className="h-10">
          <span
            className={
              'flex-shrink-0 inline-block px-2 py-0.5 text-xs font-medium rounded-full' +
              tagColorClassName
            }
          >
            {tags}
          </span>
        </div>
      </div>
    </li>
  );
};

export { NoteItemThumb };

// import React from 'react';
// // import { useSpring, animated } from 'react-spring';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../app/rootReducer';
// import {
//   deleteNoteThunk,
//   setSelectedNoteId,
// } from '../features/note/noteListSlice';
// import { RouteComponentProps, withRouter } from 'react-router-dom';
// import { JsxElement } from 'typescript';
// // import TransitionGroup from 'react-transition-group/TransitionGroup';
// // import ReactTransitionGroup from 'react/lib/ReactTransitionGroup';

// // TODO: Share with INote (and with back Note)
// interface INoteItemProps {
//   id: string;
//   title: string | undefined;
//   text: string | undefined;
//   tags: string[];
//   isSelected: boolean;
// }
// function truncateString(str: string, num: number) {
//   if (str.length <= num) {
//     return str;
//   }
//   return str.slice(0, num) + '...';
// }

// const NoteItemThumb: React.FC<INoteItemProps> = ({ id, text, title, tags }) => {
//   console.log('NoteItemThumb', id);

//   const dispatch = useDispatch();
//   const selectedNoteId = useSelector(
//     (state: RootState) => state.notes.selectedNoteId
//   );
//   const isSelected = id === selectedNoteId;

//   let className = 'relative py-5 px-4 bg-white dark:bg-black';
//   if (isSelected) {
//     className += ' border-l-4 border-indigo-700';
//   } else {
//     className += ' border-white dark:border-black';
//   }
//   const btnClassName =
//     'relative inline-flex items-center p-2 border-1 border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 rounded-md bg-white dark:bg-black dark:border-gray-800';

//   const tagType = Math.round(Math.random() * 5);
//   let tagColorClassName = ' text-green-800 bg-green-100';
//   switch (tagType) {
//     case 0:
//       tagColorClassName = ' text-red-800 bg-red-100';
//       break;
//     case 1:
//       tagColorClassName = ' text-yellow-800 bg-yellow-100';
//       break;
//     case 2:
//       tagColorClassName = ' text-blue-800 bg-blue-100';
//       break;
//     case 3:
//       tagColorClassName = ' text-indigo-800 bg-indigo-100';
//       break;
//     case 4:
//       tagColorClassName = ' text-purple-800 bg-purple-100';
//       break;
//   }
//   return (
//     <li className="col-span-1 bg-white dark:bg-black rounded-lg shadow divide-y divide-gray-200 dark:divide-gray-700">
//       <div className="w-full flex items-center justify-between p-6 space-x-6">
//         <div className="flex-1 ">
//           <div className="flex items-center space-x-3">
//             <h3 className="text-gray-900 dark:text-gray-50 text-sm font-medium ">
//               {title}
//             </h3>
//             <span
//               className={
//                 'flex-shrink-0 inline-block px-2 py-0.5 text-xs font-medium rounded-full' +
//                 tagColorClassName
//               }
//             >
//               {tags}
//             </span>
//           </div>
//           <p className="mt-1 text-gray-500 text-sm ">{text}</p>
//         </div>
//       </div>
//       <div>
//         <div className="-mt-px flex divide-x divide-gray-200 dark:divide-gray-700">
//           <div className="w-0 flex-1 flex">
//             <a
//               href="#"
//               className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
//             >
//               {/* Heroicon name: solid/mail */}
//               <svg
//                 className="w-5 h-5 text-gray-400"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//                 aria-hidden="true"
//               >
//                 <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
//                 <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
//               </svg>
//               <span className="ml-3">Email</span>
//             </a>
//           </div>
//           <div className="-ml-px w-0 flex-1 flex">
//             <a
//               href="#"
//               className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
//             >
//               {/* Heroicon name: solid/phone */}
//               <svg
//                 className="w-5 h-5 text-gray-400"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//                 aria-hidden="true"
//               >
//                 <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
//               </svg>
//               <span className="ml-3">Call</span>
//             </a>
//           </div>
//           <div className="-ml-px w-0 flex-1 flex">
//             <a
//               href="#"
//               className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
//             >
//               {/* Heroicon name: solid/phone */}
//               <svg
//                 className="w-5 h-5 text-gray-400"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                 />
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                 />
//               </svg>

//               <span className="ml-3">Pin</span>
//             </a>
//           </div>
//         </div>
//       </div>
//     </li>
//   );

// };

// export { NoteItemThumb };
