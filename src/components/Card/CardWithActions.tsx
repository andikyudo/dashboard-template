import React from 'react';

interface CardWithActionsProps {
  title: string;
  description: string;
  actions: React.ReactNode;
}

export const CardWithActions = ({ title, description, actions }: CardWithActionsProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {description}
        </p>
        <div className="flex gap-2">
          {actions}
        </div>
      </div>
    </div>
  );
};
