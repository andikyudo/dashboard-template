import React from 'react';
import Table from '../components/Table/Table';

type Priority = 'High' | 'Medium' | 'Low';

interface TableData {
  id: string;
  taskName: string;
  description: string;
  estimation: string;
  type: string;
  people: {
    id: string;
    avatar: string;
  }[];
  priority: Priority;
}

const TablePage: React.FC = () => {
  const sampleData: TableData[] = [
    {
      id: '1',
      taskName: 'Employee Details',
      description: 'Create a page where there is information about employees',
      estimation: 'Feb 14, 2024 - Feb 1, 2024',
      type: 'Dashboard',
      people: [
        {
          id: '1',
          avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff',
        },
      ],
      priority: 'Medium',
    },
    {
      id: '2',
      taskName: 'Darkmode version',
      description: 'Darkmode version for all screens',
      estimation: 'Feb 14, 2024 - Feb 1, 2024',
      type: 'Mobile App',
      people: [
        {
          id: '1',
          avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=0D8ABC&color=fff',
        },
      ],
      priority: 'Low',
    },
    {
      id: '3',
      taskName: 'Super Admin Role',
      description: '-',
      estimation: 'Feb 14, 2024 - Feb 1, 2024',
      type: 'Dashboard',
      people: [
        {
          id: '1',
          avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=0D8ABC&color=fff',
        },
      ],
      priority: 'High',
    },
    {
      id: '4',
      taskName: 'Settings Page',
      description: '-',
      estimation: 'Feb 14, 2024 - Feb 1, 2024',
      type: 'Mobile App',
      people: [
        {
          id: '1',
          avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=0D8ABC&color=fff',
        },
        {
          id: '2',
          avatar: 'https://ui-avatars.com/api/?name=Tom+Brown&background=0D8ABC&color=fff',
        },
      ],
      priority: 'Medium',
    },
    {
      id: '5',
      taskName: 'KPI and Employee Statistics',
      description: 'Create a design that displays KPIs and employee statistics',
      estimation: 'Feb 14, 2024 - Feb 1, 2024',
      type: 'Dashboard',
      people: [
        {
          id: '1',
          avatar: 'https://ui-avatars.com/api/?name=Alex+Davis&background=0D8ABC&color=fff',
        },
      ],
      priority: 'Low',
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Task Management</h1>
        <p className="mt-2 text-sm text-gray-600">
          Manage and track your team's tasks and projects
        </p>
      </div>
      <div className="bg-white rounded-lg shadow">
        <Table data={sampleData} />
      </div>
    </div>
  );
};

export default TablePage;
