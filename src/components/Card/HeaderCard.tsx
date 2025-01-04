import React from 'react';

interface HeaderCardProps {
  title: string;
  description: string;
  header: React.ReactNode;
}

export const HeaderCard = ({ title, description, header }: HeaderCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="bg-gray-100 dark:bg-gray-700 p-4">
        {header}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </div>
    </div>
  );
};
