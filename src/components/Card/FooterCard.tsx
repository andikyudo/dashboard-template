import React from 'react';

interface FooterCardProps {
  title: string;
  description: string;
  footer: React.ReactNode;
}

export const FooterCard = ({ title, description, footer }: FooterCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col">
      <div className="p-4 flex-1">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </div>
      <div className="bg-gray-100 dark:bg-gray-700 p-4">
        {footer}
      </div>
    </div>
  );
};
