import React from 'react';

export type IUserProfileCardProps = {};

const UserProfileCard: React.FC<IUserProfileCardProps> = ({}) => {
  return ( 
    <div className="flex-shrink-0 flex border-t-1 border-gray-200 p-4 dark:border-gray-800">
      <a href="#" className="flex-shrink-0 w-full group block">
        <div className="flex items-center">
          <div>
            <img
              className="inline-block h-9 w-9 rounded-full"
              src="/user_wravel.jpeg"
              alt=""
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
              William Ravel
            </p>
            <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
              Preferences
            </p>
          </div>
        </div>
      </a>
    </div>
  );
};

export { UserProfileCard };
