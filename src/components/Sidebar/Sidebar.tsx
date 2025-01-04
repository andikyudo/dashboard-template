import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiSettings, FiChevronLeft } from 'react-icons/fi';
import Menu from '../Menu/Menu';
import Settings from '../Settings/Settings';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed inset-0 bg-black/50 z-40 cursor-pointer"
          />
        )}
      </AnimatePresence>

      <motion.div
        className="h-screen bg-gray-800 dark:bg-gray-900 text-white w-64 fixed z-50 shadow-xl"
        animate={{ x: isOpen ? 0 : -250 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-700">
          <motion.h1
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-xl font-bold"
          >
            Dashboard
          </motion.h1>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-all"
          >
            {isOpen ? <FiChevronLeft size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
        
        <div className="p-4">
          <Menu isOpen={isOpen} />
        </div>
        
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
          <button 
            onClick={() => setShowSettings(true)}
            className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-lg w-full transition-all"
          >
            <FiSettings size={20} />
            <motion.span
              animate={{ opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              Settings
            </motion.span>
          </button>
        </div>
      </motion.div>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="absolute bottom-0 w-full bg-white dark:bg-gray-800 rounded-t-lg p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <Settings />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
