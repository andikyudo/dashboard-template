import React, { useState } from 'react';
import { FiFilter, FiPlus, FiSearch, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { FaTasks, FaAlignLeft, FaClock, FaTag, FaUsers, FaExclamation } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

interface TableProps {
  data: Array<{
    id: string;
    taskName: string;
    description: string;
    estimation: string;
    type: string;
    people: Array<{
      id: string;
      avatar: string;
    }>;
    priority: 'High' | 'Medium' | 'Low';
  }>;
}

const Table: React.FC<TableProps> = ({ data }) => {
  const { theme } = useTheme();
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTasks, setExpandedTasks] = useState<Record<string, boolean>>({});
  
  const filteredData = data.filter(item => 
    item.taskName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleTask = (id: string) => {
    setExpandedTasks(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="overflow-x-auto animate-fade-in">
      <div className="flex justify-between items-center mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-sm">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-purple-500" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..."
            className="block w-full pl-10 pr-3 py-2 border border-purple-200 rounded-md leading-5 bg-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-all duration-200"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-purple-100 rounded-lg transition-all duration-200 hover:scale-105">
            <FiFilter className="w-5 h-5 text-purple-600" />
          </button>
          <button className="p-2 hover:bg-purple-100 rounded-lg transition-all duration-200 hover:scale-105">
            <FiPlus className="w-5 h-5 text-purple-600" />
          </button>
        </div>
      </div>
      <table className="min-w-full divide-y divide-purple-100">
        <thead className="bg-gradient-to-r from-purple-50 to-blue-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('taskName')}
            >
              <div className="flex items-center">
                <FaTasks className="w-4 h-4 mr-2" />
                Task Name
              </div>
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('description')}
            >
              <div className="flex items-center">
                <FaAlignLeft className="w-4 h-4 mr-2" />
                Description
              </div>
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('estimation')}
            >
              <div className="flex items-center">
                <FaClock className="w-4 h-4 mr-2" />
                Estimation
              </div>
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('type')}
            >
              <div className="flex items-center">
                <FaTag className="w-4 h-4 mr-2" />
                Type
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              <div className="flex items-center">
                <FaUsers className="w-4 h-4 mr-2" />
                People
              </div>
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('priority')}
            >
              <div className="flex items-center">
                <FaExclamation className="w-4 h-4 mr-2" />
                Priority
              </div>
            </th>
          </tr>
        </thead>
        <tbody className={`divide-y ${
          theme === 'light'
            ? 'bg-white divide-gray-200'
            : 'bg-[#121212] divide-[#3f3f3f]'
        }`}>
          {filteredData.map((item) => (
            <tr key={item.id} className={`${
              theme === 'light' 
                ? 'hover:bg-gray-50' 
                : 'hover:bg-[#282828]'
            }`}>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </td>
            <td className="px-6 py-4 whitespace-nowrap group">
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => toggleTask(item.id)}
              >
                <div className="text-sm font-medium text-purple-900 dark:text-[#fddeae] group-hover:text-purple-700 dark:group-hover:text-[#f9cd87] transition-colors duration-200">
                  {item.taskName}
                </div>
                <div className="ml-2 text-purple-500">
                  {expandedTasks[item.id] ? (
                    <FiChevronUp className="w-4 h-4" />
                  ) : (
                    <FiChevronDown className="w-4 h-4" />
                  )}
                </div>
              </div>
              {expandedTasks[item.id] && (
                <div className="mt-2 text-sm text-purple-700">
                  Additional details about {item.taskName}
                </div>
              )}
            </td>
            <td className="px-6 py-4 transition-all duration-200">
                <div className="text-sm text-purple-900 dark:text-[#fbd59b]">{item.description}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-purple-900 dark:text-[#fbd59b]">{item.estimation}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors duration-200">
                  {item.type}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex -space-x-2">
                  {item.people.map((person) => (
                    <img
                      key={person.id}
                      className="w-8 h-8 rounded-full border-2 border-white"
                      src={person.avatar}
                      alt=""
                    />
                  ))}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full hover:opacity-80 transition-opacity duration-200 ${getPriorityColor(
                    item.priority
                  )}`}
                >
                  {item.priority}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
