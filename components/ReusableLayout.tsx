"use client";

import React, { useState } from 'react';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const currentYear = new Date().getFullYear();

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className={darkMode ? 'dark' : 'light'}>
            <div className={`min-h-screen flex flex-col justify-between ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} transition-all`}>
                <header className="flex justify-between items-center p-4 shadow-lg w-full">
                    <h1 className="text-xl font-bold whitespace-nowrap">Conversors Suite</h1>
                    <nav className="hidden md:flex gap-6 justify-center flex-grow">
                        <Link href="/">
                            <span className={`cursor-pointer relative group ${darkMode ? 'text-white' : 'text-gray-900'} transition-all duration-300`}>
                                Home
                                <span className="absolute left-0 bottom-0 w-0 h-1 bg-blue-500 transition-all duration-300 ease-in-out group-hover:w-full"></span>
                            </span>
                        </Link>
                        <Link href="/markdown">
                            <span className={`cursor-pointer relative group ${darkMode ? 'text-white' : 'text-gray-900'} transition-all duration-300`}>
                                Markdown
                                <span className="absolute left-0 bottom-0 w-0 h-1 bg-blue-500 transition-all duration-300 ease-in-out group-hover:w-full"></span>
                            </span>
                        </Link>
                        <Link href="/json">
                            <span className={`cursor-pointer relative group ${darkMode ? 'text-white' : 'text-gray-900'} transition-all duration-300`}>
                                JSON
                                <span className="absolute left-0 bottom-0 w-0 h-1 bg-blue-500 transition-all duration-300 ease-in-out group-hover:w-full"></span>
                            </span>
                        </Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="flex items-center gap-2 px-3 py-2 bg-gray-300 text-gray-900 rounded-lg shadow-md hover:bg-gray-400 transition-transform transform hover:-translate-y-1"
                        >
                            {darkMode ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
                        </button>
                        <button
                            onClick={toggleMenu}
                            className="md:hidden flex items-center justify-center p-2 rounded-md bg-gray-300 text-gray-900 hover:bg-gray-400 transition-transform transform hover:-translate-y-1"
                        >
                            {isMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
                        </button>
                    </div>
                </header>
                {isMenuOpen && (
                    <nav className="md:hidden flex flex-col items-center gap-4 p-6 bg-gray-200 dark:bg-gray-800">
                        <Link href="/">
                            <span onClick={toggleMenu} className="cursor-pointer text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-all duration-300">
                                Home
                            </span>
                        </Link>
                        <Link href="/markdown">
                            <span onClick={toggleMenu} className="cursor-pointer text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-all duration-300">
                                Markdown
                            </span>
                        </Link>
                        <Link href="/json">
                            <span onClick={toggleMenu} className="cursor-pointer text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-all duration-300">
                                JSON
                            </span>
                        </Link>
                    </nav>
                )}
                <main className="p-4 flex-grow max-w-4xl mx-auto w-full md:mt-10">
                    {children}
                </main>
                <footer className="p-4 text-center bg-gray-800 text-white">
                    {currentYear} - All rights reserved - Made by Wilfredo Aaron Sosa Ramos
                </footer>
            </div>
        </div>
    );
};

export default Layout;