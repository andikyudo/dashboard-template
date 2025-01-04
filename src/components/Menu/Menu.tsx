import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FiHome,
  FiTrendingUp,
  FiSettings,
  FiDollarSign,
  FiPieChart,
  FiShield
} from 'react-icons/fi';

interface MenuItem {
  title: string;
  icon: React.ReactNode;
  subItems?: {
    title: string;
    icon: React.ReactNode;
  }[];
}

interface MenuProps {
  isOpen: boolean;
}

const Menu = ({ isOpen }: MenuProps) => {
  const [openMenus, setOpenMenus] = useState({} as Record<string, boolean>);

  const menuItems: MenuItem[] = [
    { 
      title: 'Dashboard',
      icon: <FiHome className="w-5 h-5" />
    },
    {
      title: 'Cards',
      icon: <FiHome className="w-5 h-5" />,
      subItems: [
        { title: 'Card Examples', icon: <FiHome className="w-4 h-4" /> },
        { title: 'Drag Drop Cards', icon: <FiHome className="w-4 h-4" /> },
        { title: 'Table', icon: <FiHome className="w-4 h-4" /> }
      ]
    },
    { 
      title: 'Reports',
      icon: <FiTrendingUp className="w-5 h-5" />,
      subItems: [
        { title: 'Sales', icon: <FiDollarSign className="w-4 h-4" /> },
        { title: 'Expenses', icon: <FiPieChart className="w-4 h-4" /> },
        { title: 'Profit', icon: <FiTrendingUp className="w-4 h-4" /> }
      ]
    },
    {
      title: 'Settings',
      icon: <FiSettings className="w-5 h-5" />,
      subItems: [
        { title: 'Account', icon: <FiShield className="w-4 h-4" /> },
        { title: 'Preferences', icon: <FiSettings className="w-4 h-4" /> }
      ]
    }
  ];

  const toggleMenu = (title: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <motion.div
      className="space-y-1"
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {menuItems.map((item) => (
        <motion.div key={item.title}>
          <button
            onClick={() => toggleMenu(item.title)}
            className="w-full p-2 hover:bg-gray-700 dark:hover:bg-gray-800 flex items-center gap-3 rounded-lg transition-all"
            disabled={!isOpen}
          >
            <div className="text-gray-400">
              {item.icon}
            </div>
            <motion.span
              animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -10 }}
              transition={{ duration: 0.2 }}
              className="flex-1 text-left whitespace-nowrap"
            >
              {item.title}
            </motion.span>
          </button>

          {isOpen && item.subItems && openMenus[item.title] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.2 }}
              className="pl-4 overflow-hidden"
            >
              {item.subItems.map((subItem) => (
                <Link 
                  to={
                    subItem.title === 'Card Examples' ? '/cards' :
                    subItem.title === 'Drag Drop Cards' ? '/drag-drop-cards' :
                    subItem.title === 'Table' ? '/table' : '/'
                  }
                  key={subItem.title}
                >
                  <motion.div 
                    className="p-2 hover:bg-gray-700 dark:hover:bg-gray-800 flex items-center gap-3 rounded-lg"
                  >
                    <div className="text-gray-400">
                      {subItem.icon}
                    </div>
                    <span>{subItem.title}</span>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Menu;
