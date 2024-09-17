import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Select from 'react-select';
import { FiArrowRightCircle, FiTrash, FiRepeat, FiClipboard } from 'react-icons/fi';
import { FaLanguage } from 'react-icons/fa';

// Esquema Zod para validar los inputs del formulario
const translationSchema = z.object({
  text_input: z.string().nonempty('Text input is required.'),
  source_language: z.object({
    value: z.string(),
    label: z.string(),
  }),
  target_language: z.object({
    value: z.string(),
    label: z.string(),
  }),
});

interface FormData {
  text_input: string;
  source_language: { value: string; label: string };
  target_language: { value: string; label: string };
}

interface TranslationFormProps {
  darkMode: boolean;
}

const languageOptions = [
  { value: 'English', label: 'English' },
  { value: 'Spanish', label: 'Spanish' },
  { value: 'French', label: 'French' },
  { value: 'German', label: 'German' },
  { value: 'Chinese', label: 'Chinese' },
  { value: 'Japanese', label: 'Japanese' },
  { value: 'Portuguese', label: 'Portuguese' },
];

const TranslationForm: React.FC<TranslationFormProps> = ({ darkMode }) => {
  const [translatedText, setTranslatedText] = useState<string | null>(null);

  const { register, handleSubmit, setValue, getValues, control, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(translationSchema),
  });

  const onSubmit = (data: FormData) => {
    // Simulación de la traducción, solo asignamos el texto traducido
    setTranslatedText(data.text_input);
  };

  const handleClearContent = () => {
    setValue('text_input', '');
    setTranslatedText(null);
  };

  const handleSwapLanguages = () => {
    const currentSource = getValues('source_language');
    const currentTarget = getValues('target_language');
    setValue('source_language', currentTarget);
    setValue('target_language', currentSource);
  };

  const handleCopyToClipboard = () => {
    if (translatedText) {
      navigator.clipboard.writeText(translatedText);
      alert('Translation copied to clipboard!');
    }
  };

  return (
    <div className={`max-w-4xl mx-auto p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold flex items-center gap-2">
          <FaLanguage className="text-3xl md:text-4xl" /> Translation Service
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex justify-between gap-4">
          {/* Selectores de Idioma con Controller */}
          <div className="w-1/2">
            <label className="block text-sm font-semibold mb-2">Source Language</label>
            <Controller
              name="source_language"
              control={control}
              defaultValue={languageOptions[0]}
              render={({ field }) => (
                <Select
                  {...field}
                  options={languageOptions}
                  classNamePrefix="react-select"
                  className={`w-full ${darkMode ? 'react-select-dark' : ''}`}
                />
              )}
            />
          </div>

          {/* Botón de Intercambio de Idiomas */}
          <div className="flex items-center justify-center">
            <button type="button" onClick={handleSwapLanguages} className="p-2 border rounded-full transition-transform transform hover:rotate-180">
              <FiRepeat className="text-xl" />
            </button>
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-semibold mb-2">Target Language</label>
            <Controller
              name="target_language"
              control={control}
              defaultValue={languageOptions[1]}
              render={({ field }) => (
                <Select
                  {...field}
                  options={languageOptions}
                  classNamePrefix="react-select"
                  className={`w-full ${darkMode ? 'react-select-dark' : ''}`}
                />
              )}
            />
          </div>
        </div>

        {/* Text Area para el texto de entrada */}
        <div>
          <label className="block text-sm font-semibold mb-2">Text to Translate</label>
          <textarea
            {...register('text_input')}
            className={`w-full p-3 border rounded-md ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
            rows={5}
            placeholder="Enter the text you want to translate..."
          />
          {errors.text_input && <p className="text-red-500">{errors.text_input.message}</p>}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Botón de Traducción */}
          <button
            type="submit"
            className={`w-full md:w-1/2 px-4 py-3 rounded-md shadow-md transition-transform transform hover:-translate-y-1 ${
              darkMode ? 'bg-green-600 text-white hover:bg-green-500' : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              Translate <FiArrowRightCircle />
            </span>
          </button>

          {/* Botón de Limpiar */}
          <button
            type="button"
            onClick={handleClearContent}
            className={`w-full md:w-1/2 px-4 py-3 flex items-center justify-center gap-2 rounded-md shadow-md transition-transform transform hover:-translate-y-1 ${
              darkMode ? 'bg-red-600 text-white hover:bg-red-500' : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            <FiTrash className="text-xl" />
            Clear
          </button>
        </div>
      </form>

      {/* Área de Texto Traducido */}
      {translatedText && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Translation</h2>
            {/* Botón de Copiar */}
            <button
              onClick={handleCopyToClipboard}
              className={`px-4 py-2 flex items-center justify-center gap-2 rounded-md shadow-md transition-transform transform hover:-translate-y-1 ${
                darkMode ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <FiClipboard className="text-xl" />
              Copy
            </button>
          </div>
          <p className="mt-2">{translatedText}</p>
        </div>
      )}
    </div>
  );
};

export default TranslationForm;