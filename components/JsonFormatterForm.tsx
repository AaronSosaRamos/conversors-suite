import React, { useState } from 'react';
import { FiClipboard, FiTrash } from 'react-icons/fi';
import { FaCode } from 'react-icons/fa';
import JSONPretty from 'react-json-pretty';

interface JsonFormatterFormProps {
  darkMode: boolean;
}

const JsonFormatterForm: React.FC<JsonFormatterFormProps> = ({ darkMode }) => {
  const [jsonInput, setJsonInput] = useState<string>('');
  const [formattedJson, setFormattedJson] = useState<object | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleJsonChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(event.target.value);
  };

  const handleFormatJson = () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      setFormattedJson(parsedJson);
      setError(null);
    } catch (e: any) {
      setError(`Invalid JSON: ${e.message}`);
      setFormattedJson(null);
    }
  };

  const handleClearContent = () => {
    setJsonInput('');
    setFormattedJson(null);
    setError(null);
  };

  const handleCopyToClipboard = () => {
    if (formattedJson) {
      navigator.clipboard.writeText(JSON.stringify(formattedJson, null, 2));
      alert('JSON copied to clipboard!');
    } else {
      alert('Nothing to copy!');
    }
  };

  return (
    <div className={`max-w-2xl mx-auto p-4 md:p-6 rounded-lg shadow-lg animate-fade-in-down ${darkMode ? 'bg-gray-800 text-white' : 'bg-gradient-to-r from-green-500 to-blue-500 text-white'}`}>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold flex items-center justify-center gap-2 mb-4 md:mb-0">
          <FaCode className="text-3xl md:text-4xl" /> JSON Formatter
        </h1>
      </div>
      <textarea
        value={jsonInput}
        onChange={handleJsonChange}
        className={`w-full p-3 md:p-4 mb-4 border rounded-md focus:outline-none focus:ring-2 transition-all ${
          darkMode ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-gray-500' : 'border-green-300 bg-white text-gray-800 placeholder-gray-400 focus:ring-green-600'
        }`}
        rows={6}
        placeholder="Enter your JSON here..."
      />
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-4">
        <button
          onClick={handleFormatJson}
          className={`w-full md:w-auto px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-md transition-transform transform hover:-translate-y-1 ${
            darkMode ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          Format JSON
        </button>
        <button
          onClick={handleClearContent}
          className={`w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-md transition-transform transform hover:-translate-y-1 ${
            darkMode ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          <FiTrash className="text-xl md:text-2xl" />
          Clear
        </button>
      </div>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      <div className="mt-6">
        {formattedJson && (
          <>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">Formatted JSON:</h2>
            <div className={`border p-4 rounded-md shadow-lg overflow-auto max-h-64 md:max-h-96 custom-scrollbar ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-green-300'}`}>
              <JSONPretty data={formattedJson} className="text-black"></JSONPretty>
            </div>
            <button
              onClick={handleCopyToClipboard}
              className={`flex items-center justify-center gap-2 px-4 py-2 md:px-6 md:py-3 mt-4 rounded-lg shadow-md transition-transform transform hover:-translate-y-1 ${
                darkMode ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <FiClipboard className="text-xl md:text-2xl" />
              Copy JSON to Clipboard
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default JsonFormatterForm;
