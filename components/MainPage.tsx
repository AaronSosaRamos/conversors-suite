import React from 'react';
import Link from 'next/link';
import { FaMarkdown, FaCode } from 'react-icons/fa';

const MainPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-purple-500 to-blue-500 text-white">
      <div className="text-center max-w-4xl p-4 md:p-8">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-fade-in-down">
          Welcome to ConversorsSuite
        </h1>
        <p className="text-lg md:text-2xl mb-8 animate-fade-in-up">
          ConversorsSuite is your ultimate tool for converting and formatting content seamlessly. We offer two main services to help streamline your work:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          <Link href="/json">
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
        </div>
      </div>
    </div>
  );
};

export default MainPage;
