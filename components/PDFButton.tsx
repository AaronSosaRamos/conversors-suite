import React from 'react';
import { FaFilePdf } from 'react-icons/fa';

const PDFButton: React.FC<{ htmlOutput: string; darkMode: boolean }> = ({ htmlOutput, darkMode }) => {
  const handleDownloadPDF = async () => {
    const html2pdf = (await import('html2pdf.js')).default;
    const element = document.createElement('div');
    element.innerHTML = htmlOutput;
    const opt = {
      margin: 1,
      filename: 'formatted-text.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf().from(element).set(opt).save();
  };

  return (
    <button
      onClick={handleDownloadPDF}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg shadow-md transition-transform transform hover:-translate-y-1 ${
        darkMode ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-red-600 text-white hover:bg-red-700'
      }`}
    >
      <FaFilePdf className="text-2xl" />
      Download as PDF
    </button>
  );
};

export default PDFButton;
