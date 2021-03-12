import { TagColor, TagIcon } from '../interfaces';

export const tagIconColorMap = {
  [TagColor.GRAY]: 'gray',
  [TagColor.RED]: 'red',
  [TagColor.YELLOW]: 'yellow',
  [TagColor.GREEN]: 'green',
  [TagColor.BLUE]: 'blue',
  [TagColor.INDIGO]: 'indigo',
  [TagColor.PURPLE]: 'purple',
  [TagColor.PINK]: 'pink',
};

export const noteIconColorMap = {
  [TagColor.GRAY]: 'gray',
  [TagColor.RED]: 'red',
  [TagColor.YELLOW]: 'yellow',
  [TagColor.GREEN]: 'green',
  [TagColor.BLUE]: 'blue',
  [TagColor.INDIGO]: 'indigo',
  [TagColor.PURPLE]: 'purple',
  [TagColor.PINK]: 'pink',
};

export const tagIconIconMap = {
  [TagIcon.TAG]: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
      />
    </svg>
  ),
  [TagIcon.HASHTAG]: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
      />
    </svg>
  ),
};