"use client"

import MarkdownForm from '@/components/MarkdownForm';
import React, { useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const currentYear = new Date().getFullYear();

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'dark' : 'light'}>
      <div className={`min-h-screen flex flex-col justify-between ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} transition-all`}>
        <header className="flex justify-between items-center p-6 shadow-lg">
          <h1 className="text-2xl font-bold">Markdown to Text Converter</h1>
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-900 rounded-lg shadow-md hover:bg-gray-400 transition-transform transform hover:-translate-y-1"
          >
            {darkMode ? <FaSun className="text-2xl" /> : <FaMoon className="text-2xl" />}
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </header>
        <main className="p-6 flex-grow">
          <MarkdownForm darkMode={darkMode} />
        </main>
        <footer className="p-4 text-center bg-gray-800 text-white">
          {currentYear} - All rights reserved - Made by Wilfredo Aaron Sosa Ramos
        </footer>
      </div>
    </div>
  );
};

export default App;
