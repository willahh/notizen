import React from 'react';

export type IUserProfileCardProps = {};

const UserProfileCard: React.FC<IUserProfileCardProps> = ({}) => {
  return (
    <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
      <a href="#" className="flex-shrink-0 w-full group block">
        <div className="flex items-center">
          <div>
            <img
              className="inline-block h-9 w-9 rounded-full"
              src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
              Whitney Francis
            </p>
            <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
              View profile
            </p>
          </div>
        </div>
      </a>
    </div>
  );
};

export { UserProfileCard };
