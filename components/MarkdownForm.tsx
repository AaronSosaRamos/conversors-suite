import React, { useEffect, useState } from 'react';
import { useMarkdownStore } from '../store/useMarkdownStore';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';
import { FiClipboard, FiTrash } from 'react-icons/fi'; // Ícono de eliminar
import { FaMarkdown } from 'react-icons/fa';
import dynamic from 'next/dynamic';

const PDFButton = dynamic(() => import('./PDFButton'), { ssr: false });

const MarkdownForm: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const { markdown, setMarkdown, setFormattedText } = useMarkdownStore();
  const [htmlOutput, setHtmlOutput] = useState<string>('');

  const handleMarkdownChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const md = event.target.value;
    setMarkdown(md);
  };

  const handleClearContent = () => {
    setMarkdown(''); // Limpiar el contenido del campo de texto
  };

  useEffect(() => {
    const processMarkdown = async () => {
      const processed = await unified().use(remarkParse).use(remarkHtml).process(markdown);
      const htmlString = String(processed);
      setFormattedText(htmlString);
      setHtmlOutput(htmlString);
    };

    processMarkdown();
  }, [markdown, setFormattedText]);

  const handleCopyToClipboard = () => {
    const container = document.createElement('div');
    container.innerHTML = htmlOutput;
    document.body.appendChild(container);

    const range = document.createRange();
    range.selectNodeContents(container);
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand('copy');
      selection.removeAllRanges();
    }

    document.body.removeChild(container);
    alert('Formatted text copied to clipboard!');
  };

  return (
    <div className={`max-w-2xl mx-auto p-4 md:p-6 rounded-lg shadow-lg animate-fade-in-down ${darkMode ? 'bg-gray-800 text-white' : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'}`}>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold flex items-center justify-center gap-2 mb-4 md:mb-0">
          <FaMarkdown className="text-3xl md:text-4xl" /> Markdown to Formatted Text
        </h1>
      </div>
      <textarea
        value={markdown}
        onChange={handleMarkdownChange}
        className={`w-full p-3 md:p-4 mb-4 border rounded-md focus:outline-none focus:ring-2 transition-all ${
          darkMode ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-gray-500' : 'border-purple-300 bg-white text-gray-800 placeholder-gray-400 focus:ring-purple-600'
        }`}
        rows={4}
        placeholder="Enter your Markdown here..."
      />
      <h2 className="text-xl md:text-2xl font-semibold mb-4">Formatted Text:</h2>
      <div
        className={`prose prose-sm md:prose-xl border p-4 md:p-6 rounded-md mb-6 shadow-lg overflow-auto max-h-64 md:max-h-96 transition-all custom-scrollbar ${
          darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-purple-300 bg-white text-gray-800'
        }`}
        style={{ width: '100%' }} // Asegura que el contenido ocupe el 100% del espacio disponible
        dangerouslySetInnerHTML={{ __html: htmlOutput }}
      />
      <div className="flex flex-col md:flex-row justify-center items-center gap-4">
        <button
          onClick={handleCopyToClipboard}
          className={`flex items-center justify-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-md transition-transform transform hover:-translate-y-1 ${
            darkMode ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        >
          <FiClipboard className="text-xl md:text-2xl" />
          Copy
        </button>
        <button
          onClick={handleClearContent}
          className={`flex items-center justify-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-md transition-transform transform hover:-translate-y-1 ${
            darkMode ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          <FiTrash className="text-xl md:text-2xl" />
          Clear
        </button>
        <PDFButton
          htmlOutput={htmlOutput}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
};

export default MarkdownForm;
