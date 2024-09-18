import React, { useState, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FiClipboard, FiTrash } from 'react-icons/fi';
import { FaTable } from 'react-icons/fa';
import api from '@/services/api'; 

const infoToTableSchema = z.object({
  text_input: z.string().nonempty('Text input is required.'),
  context: z.string().nonempty('Context is required.'),
});

interface FormData {
  text_input: string;
  context: string;
}

interface InfoToTableFormProps {
  darkMode: boolean;
}

const cleanTableMarkdown = (markdown: string): string[][] => {
  const rows = markdown.split('\n');
  const cleanedRows = rows.filter(row => !row.includes('---')); 
  const table = cleanedRows.map(row => row.split('|').map(cell => cell.trim()));
  return table.filter(row => row.length > 1); 
};

const InfoToTableForm: React.FC<InfoToTableFormProps> = ({ darkMode }) => {
  const [tableData, setTableData] = useState<string[][] | null>(null);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(infoToTableSchema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setTableData(null);

    try {
      const response = await api.post('/text-to-conceptual-table', data);
      const table = cleanTableMarkdown(response.data.content);
      setTableData(table);
    } catch (error) {
      console.error('Error generating table:', error);
      alert('Error generating table. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClearContent = () => {
    reset();
    setTableData(null);
  };

  const handleCopyToClipboard = () => {
    if (tableData) {
      const tableMarkdown = tableData.map(row => row.join(' | ')).join('\n');
      navigator.clipboard.writeText(tableMarkdown);
      alert('Table copied to clipboard!');
    }
  };

  return (
    <div className={`max-w-4xl mx-auto p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold flex items-center gap-2">
          <FaTable className="text-3xl md:text-4xl" /> Info to Table Service
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Text Input</label>
          <textarea
            {...register('text_input')}
            className={`w-full p-3 border rounded-md ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
            rows={5}
            placeholder="Enter the information you want to convert into a table..."
          />
          {errors.text_input && <p className="text-red-500">{errors.text_input.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Context</label>
          <textarea
            {...register('context')}
            className={`w-full p-3 border rounded-md ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
            rows={3}
            placeholder="Enter additional context (optional)"
          />
          {errors.context && <p className="text-red-500">{errors.context.message}</p>}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full md:w-1/2 px-6 py-3 rounded-lg shadow-md transition-transform transform hover:-translate-y-1 ${
              darkMode ? 'bg-green-600 text-white hover:bg-green-500' : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {loading ? 'Generating...' : 'Generate Table'}
          </button>

          <button
            type="button"
            onClick={handleClearContent}
            className={`w-full md:w-1/2 px-6 py-3 flex items-center justify-center gap-2 rounded-lg shadow-md transition-transform transform hover:-translate-y-1 ${
              darkMode ? 'bg-red-600 text-white hover:bg-red-500' : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            <FiTrash className="text-xl" />
            Clear
          </button>
        </div>
      </form>

      {loading && (
        <div className="flex justify-center mt-6">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      )}

      {tableData && (
        <div className="overflow-x-auto mt-8">
          <table className="min-w-full table-auto border-collapse border border-gray-300 dark:border-gray-700">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                {tableData[0].map((header, idx) => (
                  <th key={idx} className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-black dark:text-white">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800">
              {tableData.slice(1).map((row, idx) => (
                <tr key={idx}>
                  {row.map((cell, cellIdx) => (
                    <td key={cellIdx} className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-black dark:text-white">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            <button
              onClick={handleCopyToClipboard}
              className={`px-4 py-2 flex items-center justify-center gap-2 rounded-lg shadow-md transition-transform transform hover:-translate-y-1 ${
                darkMode ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <FiClipboard className="text-xl" />
              Copy Table
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoToTableForm;
