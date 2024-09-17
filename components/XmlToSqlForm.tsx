import React, { useState, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FiClipboard, FiTrash } from 'react-icons/fi';
import { FaDatabase } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

const xmlToSQLSchema = z.object({
  xml_input: z.string().nonempty('XML input is required.'),
  sql_dbms: z.enum(['MySQL', 'PostgreSQL', 'SQLite', 'SQLServer', 'Oracle', 'MariaDB']),
});

interface FormData {
  xml_input: string;
  sql_dbms: string;
}

interface XmlToSQLFormProps {
  darkMode: boolean;
}

const SQLResult = React.lazy(() =>
  new Promise<{ default: React.FC }>((resolve) => {
    setTimeout(() => {
      resolve({
        default: () => (
          <div className="bg-gray-900 text-white p-4 rounded-md overflow-auto">
            <ReactMarkdown>
              {`
\`\`\`sql
CREATE TABLE store (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    postal_code VARCHAR(20) NOT NULL
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    store_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    years_at_store INT NOT NULL,
    FOREIGN KEY (store_id) REFERENCES store(id)
);

CREATE TABLE item (
    id INT AUTO_INCREMENT PRIMARY KEY,
    store_id INT NOT NULL,
    item_id INT NOT NULL,
    item_name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    FOREIGN KEY (store_id) REFERENCES store(id)
);

-- Insert store data
INSERT INTO store (name, address, city, postal_code) VALUES 
('Super Tienda', 'Av. Siempre Viva 123', 'Ciudad Central', '12345');

-- Assuming the store has an id of 1 after insertion
SET @store_id = LAST_INSERT_ID();

-- Insert employee data
INSERT INTO employee (store_id, name, position, years_at_store) VALUES 
(@store_id, 'Carlos Gómez', 'Gerente', 5),
(@store_id, 'Ana Martínez', 'Cajera', 2);

-- Insert item data
INSERT INTO item (store_id, item_id, item_name, category, price, stock) VALUES 
(@store_id, 1, 'Café', 'Bebidas', 3.50, 120),
(@store_id, 2, 'Pan Integral', 'Panadería', 2.00, 60),
(@store_id, 3, 'Manzana', 'Frutas', 1.00, 200);
\`\`\`
              `}
            </ReactMarkdown>
          </div>
        ),
      });
    }, 2000);
  })
);

const XmlToSQLForm: React.FC<XmlToSQLFormProps> = ({ darkMode }) => {
  const [showResult, setShowResult] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(xmlToSQLSchema),
  });

  const onSubmit = () => {
    setShowResult(true);
  };

  const handleClearContent = () => {
    reset();
    setShowResult(false);
  };

  const handleCopyToClipboard = async () => {
    const sqlOutput = await document.querySelector('pre')?.innerText || '';
    navigator.clipboard.writeText(sqlOutput);
    alert('SQL copied to clipboard!');
  };

  return (
    <div className={`max-w-2xl mx-auto p-4 md:p-6 rounded-lg shadow-lg animate-fade-in-down ${darkMode ? 'bg-gray-800 text-white' : 'bg-gradient-to-r from-blue-500 to-green-500 text-white'}`}>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold flex items-center justify-center gap-2 mb-4 md:mb-0">
          <FaDatabase className="text-3xl md:text-4xl" /> XML to SQL Converter
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          {...register('xml_input')}
          className={`w-full p-3 md:p-4 mb-4 border rounded-md focus:outline-none focus:ring-2 transition-all ${
            darkMode ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-gray-500' : 'border-blue-300 bg-white text-gray-800 placeholder-gray-400 focus:ring-blue-600'
          }`}
          rows={6}
          placeholder="Enter your XML here..."
        />
        {errors.xml_input && <p className="text-red-500">{errors.xml_input.message}</p>}

        <select
          {...register('sql_dbms')}
          className={`w-full p-3 md:p-4 mb-4 border rounded-md focus:outline-none focus:ring-2 transition-all ${
            darkMode ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-gray-500' : 'border-blue-300 bg-white text-gray-800 placeholder-gray-400 focus:ring-blue-600'
          }`}
        >
          <option value="" disabled>Select your SQL DBMS</option>
          <option value="MySQL">MySQL</option>
          <option value="PostgreSQL">PostgreSQL</option>
          <option value="SQLite">SQLite</option>
          <option value="SQLServer">SQL Server</option>
          <option value="Oracle">Oracle</option>
          <option value="MariaDB">MariaDB</option>
        </select>
        {errors.sql_dbms && <p className="text-red-500">{errors.sql_dbms.message}</p>}

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-4">
          <button
            type="submit"
            className={`w-full md:w-auto px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-md transition-transform transform hover:-translate-y-1 ${
              darkMode ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            Generate SQL
          </button>
          <button
            type="button"
            onClick={handleClearContent}
            className={`w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-md transition-transform transform hover:-translate-y-1 ${
              darkMode ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            <FiTrash className="text-xl md:text-2xl" />
            Clear
          </button>
        </div>
      </form>

      <div className="mt-6">
        {showResult && (
          <Suspense fallback={<div className="flex justify-center"><div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div></div>}>
            <SQLResult />
            <button
              onClick={handleCopyToClipboard}
              className={`flex items-center justify-center gap-2 px-4 py-2 md:px-6 md:py-3 mt-4 rounded-lg shadow-md transition-transform transform hover:-translate-y-1 ${
                darkMode ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <FiClipboard className="text-xl md:text-2xl" />
              Copy SQL to Clipboard
            </button>
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default XmlToSQLForm;
