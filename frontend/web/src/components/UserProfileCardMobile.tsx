import React from 'react';

export type IUserProfileCardMobileProps = {};

const UserProfileCardMobile: React.FC<IUserProfileCardMobileProps> = ({}) => {
  return (
    <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
      <a href="#" className="flex-shrink-0 group block">
        <div className="flex items-center">
          <div>
            <img
              className="inline-block h-10 w-10 rounded-full"
              src="/user_wravel.jpeg"
              alt=""
            />
          </div>
          <div className="ml-3">
            <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
              William Ravel
            </p>
            <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
              Preferences
            </p>
          </div>
        </div>
      </a>
    </div>
  );
};

export { UserProfileCardMobile };
