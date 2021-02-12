import React from 'react';

export type INoteItemProps = {};

const NoteItem: React.FC<INoteItemProps> = ({}) => {
  return (
    <li className="relative bg-white py-5 px-4 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
      <div className="flex justify-between space-x-3">
        <div className="min-w-0 flex-1">
          <a href="#" className="block focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <p className="text-sm font-medium text-gray-900 truncate">
              Gloria Roberston
            </p>
            <p className="text-sm text-gray-500 truncate">
              Velit placeat sit ducimus non sed
            </p>
          </a>
        </div>
        <time
          dateTime="2021-01-27T16:35"
          className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500"
        >
          1d ago
        </time>
      </div>
      <div className="mt-1">
        <p className="line-clamp-2 text-sm text-gray-600">
          Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a
          rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium
          sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus
          quod dolor.
        </p>
      </div>
    </li>
  );
};

export { NoteItem };
