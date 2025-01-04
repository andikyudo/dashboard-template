import React from 'react';
import { CardWithActions } from './CardWithActions';
import { StatsCard } from './StatsCard';
import { HeaderCard } from './HeaderCard';
import { FooterCard } from './FooterCard';
import { FiSettings, FiUser } from 'react-icons/fi';

export const CardExamples = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {/* Card with Actions */}
      <CardWithActions
        title="Project Tasks"
        description="Manage your project tasks efficiently"
        actions={
          <>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Edit
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              Delete
            </button>
          </>
        }
      />

      {/* Stats Card */}
      <StatsCard
        title="Project Progress"
        value="75%"
        description="Completed tasks"
        progress={75}
      />

      {/* Header Card */}
      <HeaderCard
        title="User Profile"
        description="Manage your account settings"
        header={
          <div className="flex items-center gap-2">
            <FiUser className="w-6 h-6" />
            <span className="font-medium">John Doe</span>
          </div>
        }
      />

      {/* Footer Card */}
      <FooterCard
        title="System Settings"
        description="Configure your system preferences"
        footer={
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded">
            <FiSettings />
            Open Settings
          </button>
        }
      />
    </div>
  );
};
