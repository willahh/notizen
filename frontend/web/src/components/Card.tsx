import React from 'react';


export type ICardProps = {};

const Card: React.FC<ICardProps> = ({}) => {
  return (
    <div className="py-8 px-8 max-w-sm mx-auto rounded-xl shadow-md space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 bg-white dark:bg-black">
      <img
        className="block mx-auto h-24 rounded-full sm:mx-0 sm:flex-shrink-0"
        src="https://avatars.githubusercontent.com/u/18645142?s=460&u=c02c7980ab6336cf487e219715ea1351ea6ed42a&v=4"
        alt="William's Face"
      />
      <div className="text-center space-y-2 sm:text-left">
        <div className="space-y-0.5">
          <p className="text-lg text-black font-semibold">William Ravel</p>
          <p className="text-gray-500 font-medium">Product Engineer</p>
        </div>
        <button className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border-1 border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
          Message
        </button>
      </div>
    </div>
  );
};

export { Card };
