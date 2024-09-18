import React, { useState, Suspense } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Select from 'react-select';
import { FiArrowRightCircle, FiTrash, FiRepeat, FiClipboard, FiCheckCircle } from 'react-icons/fi';
import { FaLanguage } from 'react-icons/fa';
import api from '@/services/api'; 

const TranslatedResult: React.FC<{ translatedText: string }> = ({ translatedText }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000); 
  };

  return (
    <div className="mt-6 p-4 border rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Translation</h2>
        <button
          onClick={handleCopy}
          className="relative px-4 py-2 flex items-center justify-center gap-2 rounded-md shadow-md transition-transform transform hover:-translate-y-1 bg-blue-600 text-white hover:bg-blue-500"
        >
          {copied ? <FiCheckCircle className="text-xl" /> : <FiClipboard className="text-xl" />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <p className="mt-2">{translatedText}</p>
    </div>
  );
};

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
  const [loading, setLoading] = useState<boolean>(false);

  const { register, handleSubmit, setValue, getValues, control, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(translationSchema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setTranslatedText(null);

    try {
      const requestData = {
        text_input: data.text_input,
        source_language: data.source_language.value,
        target_language: data.target_language.value,
      };

      const response = await api.post('/translator', requestData); 
      const translation = response.data.content; 
      setTranslatedText(translation);
    } catch (error) {
      console.error('Error generating translation:', error);
      alert('Error generating translation. Please try again.');
    } finally {
      setLoading(false);
    }
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

  return (
    <div className={`max-w-4xl mx-auto p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold flex items-center gap-2">
          <FaLanguage className="text-3xl md:text-4xl" /> Translation Service
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex justify-between gap-4">
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
          <button
            type="submit"
            disabled={loading}
            className={`w-full md:w-1/2 px-4 py-3 rounded-md shadow-md transition-transform transform hover:-translate-y-1 ${
              darkMode ? 'bg-green-600 text-white hover:bg-green-500' : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {loading ? 'Translating...' : (
              <span className="flex items-center justify-center gap-2">
                Translate <FiArrowRightCircle />
              </span>
            )}
          </button>

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

      {translatedText && (
        <TranslatedResult translatedText={translatedText} />
      )}
    </div>
  );
};

export default TranslationForm;
