import React from 'react';
import { FiUser, FiChevronDown } from 'react-icons/fi';

const Profile = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
        <FiUser className="text-gray-500 dark:text-gray-300" />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium">John Doe</span>
        <span className="text-xs text-gray-500 dark:text-gray-400">Admin</span>
      </div>
      <FiChevronDown className="text-gray-500 dark:text-gray-300" />
    </div>
  );
};

export default Profile;
