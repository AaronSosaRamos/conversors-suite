import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FiImage, FiClipboard, FiTrash } from 'react-icons/fi';
import { FaFileAlt } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import api from '@/services/api'; 

const imageTranscriptionSchema = z.object({
  img_url: z.string().url('A valid image URL is required.'),
});

interface FormData {
  img_url: string;
}

interface ImageTranscriptionFormProps {
  darkMode: boolean;
}

const ImageTranscriptionForm: React.FC<ImageTranscriptionFormProps> = ({ darkMode }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(imageTranscriptionSchema),
  });

  const [imageUrl, setImageUrl] = useState<string>('');
  const [transcriptionResult, setTranscriptionResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setTranscriptionResult(null); 
    try {
      const response = await api.post('/image-transcription', data);
      setTranscriptionResult(response.data.content); 
    } catch (error) {
      console.error('Error generating transcription:', error);
      alert('Error generating transcription. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClearContent = () => {
    setImageUrl('');
    setValue('img_url', '');
    setTranscriptionResult(null);
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
    setValue('img_url', event.target.value);
  };

  const handleCopyToClipboard = async () => {
    if (transcriptionResult) {
      await navigator.clipboard.writeText(transcriptionResult);
      alert('Transcription copied to clipboard!');
    }
  };

  return (
    <div className={`max-w-4xl mx-auto p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' : 'bg-gradient-to-r from-yellow-500 to-green-500 text-white'}`}>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold flex items-center gap-2">
          <FaFileAlt className="text-3xl md:text-4xl" /> Image Transcription
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Image URL</label>
          <input
            {...register('img_url')}
            type="text"
            value={imageUrl}
            onChange={handleUrlChange}
            placeholder="Enter image URL here..."
            className={`w-full p-3 border rounded-md ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
          />
          {errors.img_url && <p className="text-red-500">{errors.img_url.message}</p>}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full md:w-1/2 px-6 py-3 rounded-lg shadow-md transition-transform transform hover:-translate-y-1 ${
              darkMode ? 'bg-green-600 text-white hover:bg-green-500' : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {loading ? 'Transcribing...' : (
              <span className="flex items-center justify-center gap-2">
                Transcribe <FiImage />
              </span>
            )}
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

      {transcriptionResult && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{transcriptionResult}</ReactMarkdown>
        </div>
      )}

      {transcriptionResult && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleCopyToClipboard}
            className={`px-4 py-2 flex items-center justify-center gap-2 rounded-lg shadow-md transition-transform transform hover:-translate-y-1 ${
              darkMode ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <FiClipboard className="text-xl" />
            Copy Transcription
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageTranscriptionForm;
