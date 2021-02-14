import React from 'react';

interface INoteItemProps {
  title: string;
  text: string;
  tags: string[];
  isSelected: boolean;
}
function truncateString(str: string, num: number) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
}

const NoteItem: React.FC<INoteItemProps> = ({
  text,
  title,
  tags,
  isSelected,
}) => {
  let className =
    'relative py-5 px-4 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 bg-white dark:bg-black';
  if (isSelected) {
    className += ' border-l-4 border-indigo-700 dark:border-black';
  } else {
    className += ' border-white dark:border-black';
  }
  return (
    <li className={className}>
      <div className="flex justify-between space-x-3 ">
        <div className="min-w-0 flex-1">
          <a href="#" className="block focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <p className="text-sm font-medium truncate text-gray-900 dark:text-gray-200">
              {title}
            </p>
            <p className="text-sm truncate text-gray-500 dark:text-gray-300">{tags}</p>
          </a>
        </div>
        <time
          dateTime="2021-01-27T16:35"
          className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
        >
          1d ago
        </time>
      </div>
      <div className="mt-1 max-h-10 overflow-hidden">
        <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-500">
          {truncateString(text, 64)}
        </p>
      </div>
    </li>
  );
};

export { NoteItem };
