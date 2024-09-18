import React, { useState, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FiImage, FiClipboard, FiTrash } from 'react-icons/fi';
import { FaFileAlt } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Simulación del resultado de la transcripción
const TranscriptionResult = React.lazy(() =>
  new Promise<{ default: React.FC }>((resolve) => {
    setTimeout(() => {
      resolve({
        default: () => (
          <div className="mt-6 p-4 border rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {`
## Large language models in complex system design

**Alejandro Pradas Gomez** <sup>1</sup>, **Petter Krus** <sup>2</sup>, **Massimo Panarotto** <sup>1</sup> and **Ola Isaksson** <sup>1</sup>

<sup>1</sup> Chalmers University of Technology, Sweden, <sup>2</sup> Linköping University, Sweden

alejandro.pradas@chalmers.se

**Abstract**

This paper investigates the use of Large Language Models (LLMs) in engineering complex systems, demonstrating how they can support designers on detail design phases. Two aerospace cases, a system architecture definition and a CAD model generation activities are studied. The research reveals LLMs' challenges and opportunities to support designers, and future research areas to further improve their application in engineering tasks.

**Keywords:** large language model (LLM), complex systems, artificial intelligence (AI), computer-aided design (CAD), knowledge-based engineering (KBE)
              `}
            </ReactMarkdown>
          </div>
        ),
      });
    }, 2000);
  })
);

// Esquema de validación Zod para el formulario de transcripción de imágenes
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
  const [showResult, setShowResult] = useState(false);

  const onSubmit = () => {
    setShowResult(true);
  };

  const handleClearContent = () => {
    setImageUrl('');
    setValue('img_url', '');
    setShowResult(false);
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
    setValue('img_url', event.target.value);  // Aseguramos que el valor se actualice en el form también
  };

  const handleCopyToClipboard = async () => {
    const transcription = `
## Large language models in complex system design

**Alejandro Pradas Gomez** <sup>1</sup>, **Petter Krus** <sup>2</sup>, **Massimo Panarotto** <sup>1</sup> and **Ola Isaksson** <sup>1</sup>

<sup>1</sup> Chalmers University of Technology, Sweden, <sup>2</sup> Linköping University, Sweden

alejandro.pradas@chalmers.se

**Abstract**

This paper investigates the use of Large Language Models (LLMs) in engineering complex systems, demonstrating how they can support designers on detail design phases. Two aerospace cases, a system architecture definition and a CAD model generation activities are studied. The research reveals LLMs' challenges and opportunities to support designers, and future research areas to further improve their application in engineering tasks.
`;
    await navigator.clipboard.writeText(transcription);
    alert('Transcription copied to clipboard!');
  };

  return (
    <div className={`max-w-4xl mx-auto p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' : 'bg-gradient-to-r from-yellow-500 to-green-500 text-white'}`}>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold flex items-center gap-2">
          <FaFileAlt className="text-3xl md:text-4xl" /> Image Transcription
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Input para la URL de la imagen */}
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
          {/* Botón para transcribir */}
          <button
            type="submit"
            className={`w-full md:w-1/2 px-6 py-3 rounded-lg shadow-md transition-transform transform hover:-translate-y-1 ${
              darkMode ? 'bg-green-600 text-white hover:bg-green-500' : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              Transcribe <FiImage />
            </span>
          </button>

          {/* Botón para limpiar */}
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

      {/* Renderización de la imagen en tiempo real */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Image Preview</h2>
        <div className="w-full overflow-hidden border rounded-lg bg-gray-100 dark:bg-gray-900">
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Image preview"
              className="w-full h-auto object-cover"
              onError={() => handleClearContent()} // Limpia la imagen si el URL no es válido
            />
          )}
        </div>
      </div>

      {/* Resultado de la transcripción */}
      {showResult && (
        <Suspense fallback={<div className="flex justify-center"><div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div></div>}>
          <TranscriptionResult />
        </Suspense>
      )}

      {/* Botón para copiar la transcripción */}
      {showResult && (
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
