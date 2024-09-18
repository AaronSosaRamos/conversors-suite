import React from 'react';
import Link from 'next/link';
import { FaMarkdown, FaCode, FaDatabase, FaTable, FaCalculator, FaLanguage, FaImages } from 'react-icons/fa';

const MainPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-purple-500 to-blue-500 text-white">
      <div className="text-center w-full max-w-screen-2xl p-4 md:p-8">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-fade-in-down">
          Welcome to ConversorsSuite
        </h1>
        <p className="text-lg md:text-2xl mb-8 animate-fade-in-up">
          ConversorsSuite is your ultimate tool for converting and formatting content seamlessly. We offer various services to help streamline your work:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link href="/markdown">
            <div className="group bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:-translate-y-2 hover:bg-gray-700">
              <div className="flex justify-center mb-4">
                <FaMarkdown className="text-6xl text-blue-400 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h2 className="text-2xl font-bold text-center mb-2 group-hover:text-blue-400">
                Markdown Converter
              </h2>
              <p className="text-center text-gray-300 group-hover:text-gray-200">
                Convert your Markdown text to HTML and format it easily with our intuitive Markdown Converter.
              </p>
            </div>
          </Link>

          <Link href="/json-formatter">
            <div className="group bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:-translate-y-2 hover:bg-gray-700">
              <div className="flex justify-center mb-4">
                <FaCode className="text-6xl text-green-400 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h2 className="text-2xl font-bold text-center mb-2 group-hover:text-green-400">
                JSON Formatter
              </h2>
              <p className="text-center text-gray-300 group-hover:text-gray-200">
                Format and validate your JSON code effortlessly with our powerful JSON Formatter.
              </p>
            </div>
          </Link>

          <Link href="/json-to-sql">
            <div className="group bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:-translate-y-2 hover:bg-gray-700">
              <div className="flex justify-center mb-4">
                <FaDatabase className="text-6xl text-yellow-400 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h2 className="text-2xl font-bold text-center mb-2 group-hover:text-yellow-400">
                JSON to SQL
              </h2>
              <p className="text-center text-gray-300 group-hover:text-gray-200">
                Convert your JSON data into SQL queries with ease.
              </p>
            </div>
          </Link>

          <Link href="/xml-to-sql">
            <div className="group bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:-translate-y-2 hover:bg-gray-700">
              <div className="flex justify-center mb-4">
                <FaDatabase className="text-6xl text-red-400 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h2 className="text-2xl font-bold text-center mb-2 group-hover:text-red-400">
                XML to SQL
              </h2>
              <p className="text-center text-gray-300 group-hover:text-gray-200">
                Convert XML data to SQL schema efficiently.
              </p>
            </div>
          </Link>

          <Link href="/math-to-latex">
            <div className="group bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:-translate-y-2 hover:bg-gray-700">
              <div className="flex justify-center mb-4">
                <FaCalculator className="text-6xl text-pink-400 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h2 className="text-2xl font-bold text-center mb-2 group-hover:text-pink-400">
                Math Formulas in LaTeX
              </h2>
              <p className="text-center text-gray-300 group-hover:text-gray-200">
                Convert mathematical formulas to LaTeX for easy rendering.
              </p>
            </div>
          </Link>

          <Link href="/translator">
            <div className="group bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:-translate-y-2 hover:bg-gray-700">
              <div className="flex justify-center mb-4">
                <FaLanguage className="text-6xl text-indigo-400 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h2 className="text-2xl font-bold text-center mb-2 group-hover:text-indigo-400">
                Translator
              </h2>
              <p className="text-center text-gray-300 group-hover:text-gray-200">
                Translate text between different languages effortlessly.
              </p>
            </div>
          </Link>

          <Link href="/info-to-table">
            <div className="group bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:-translate-y-2 hover:bg-gray-700">
              <div className="flex justify-center mb-4">
                <FaTable className="text-6xl text-teal-400 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h2 className="text-2xl font-bold text-center mb-2 group-hover:text-teal-400">
                Info. to Table
              </h2>
              <p className="text-center text-gray-300 group-hover:text-gray-200">
                Convert structured information into tables with ease.
              </p>
            </div>
          </Link>

          <Link href="/image-transcription">
            <div className="group bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:-translate-y-2 hover:bg-gray-700">
              <div className="flex justify-center mb-4">
                <FaImages className="text-6xl text-purple-400 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h2 className="text-2xl font-bold text-center mb-2 group-hover:text-purple-400">
                Image Transcription
              </h2>
              <p className="text-center text-gray-300 group-hover:text-gray-200">
                Extract text from images and convert it to Markdown.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
