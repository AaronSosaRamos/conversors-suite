import React, { useEffect, useState } from 'react';
import { useMarkdownStore } from '../store/useMarkdownStore';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';
import { FiClipboard } from 'react-icons/fi';
import { FaMarkdown, FaFilePdf } from 'react-icons/fa';
import html2pdf from 'html2pdf.js';

interface MarkdownFormProps {
  darkMode: boolean;
}

const MarkdownForm: React.FC<MarkdownFormProps> = ({ darkMode }) => {
  const { markdown, setMarkdown, setFormattedText } = useMarkdownStore();
  const [htmlOutput, setHtmlOutput] = useState<string>('');

  const handleMarkdownChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const md = event.target.value;
    setMarkdown(md);
  };

  useEffect(() => {
    const processMarkdown = async () => {
      const processed = await unified()
        .use(remarkParse)
        .use(remarkHtml)
        .process(markdown);
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

  const handleDownloadPDF = () => {
    const element = document.createElement('div');
    element.innerHTML = htmlOutput;
    const opt = {
      margin: 1,
      filename: 'formatted-text.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).save();
  };

  return (
    <div className={`max-w-2xl mx-auto p-6 rounded-lg shadow-lg animate-fade-in-down ${darkMode ? 'bg-gray-800 text-white' : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold flex items-center justify-center gap-2">
          <FaMarkdown className="text-4xl" /> Markdown to Formatted Text
        </h1>
      </div>
      <textarea
        value={markdown}
        onChange={handleMarkdownChange}
        className={`w-full p-4 mb-4 border rounded-md focus:outline-none focus:ring-2 transition-all ${darkMode ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-gray-500' : 'border-purple-300 bg-white text-gray-800 placeholder-gray-400 focus:ring-purple-600'}`}
        rows={6}
        placeholder="Enter your Markdown here..."
      />
      <h2 className="text-2xl font-semibold mb-4">Formatted Text:</h2>
      <div
        className={`prose prose-xl border p-6 rounded-md mb-6 shadow-lg overflow-auto max-h-96 transition-all custom-scrollbar ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-purple-300 bg-white text-gray-800'}`}
        dangerouslySetInnerHTML={{ __html: htmlOutput }}
      />
      <div className="flex justify-center gap-4">
        <button
          onClick={handleCopyToClipboard}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg shadow-md transition-transform transform hover:-translate-y-1 ${darkMode ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-purple-600 text-white hover:bg-purple-700'}`}
        >
          <FiClipboard className="text-2xl" />
          Copy Formatted Text to Clipboard
        </button>
        <button
          onClick={handleDownloadPDF}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg shadow-md transition-transform transform hover:-translate-y-1 ${darkMode ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-red-600 text-white hover:bg-red-700'}`}
        >
          <FaFilePdf className="text-2xl" />
          Download as PDF
        </button>
      </div>
    </div>
  );
};

export default MarkdownForm;
