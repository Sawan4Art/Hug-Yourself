import React, { useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  label: string;
  subLabel: string;
  image: string | null;
  onImageUpload: (base64: string | null) => void;
  id: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ label, subLabel, image, onImageUpload, id }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onImageUpload(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="flex flex-col w-full">
      <div 
        onClick={() => inputRef.current?.click()}
        className={`
          relative group cursor-pointer 
          border-4 border-dashed rounded-2xl p-6 
          transition-all duration-300 ease-in-out
          h-80 flex flex-col items-center justify-center text-center
          overflow-hidden bg-purple-900/30
          ${image ? 'border-pink-400 shadow-[0_0_20px_rgba(236,72,153,0.3)]' : 'border-purple-600 hover:border-pink-400/60 hover:bg-purple-800/40'}
        `}
      >
        <input 
          type="file" 
          ref={inputRef}
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
          id={id}
        />

        {image ? (
          <>
            <img src={image} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
            <button 
              onClick={handleClear}
              className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg z-20 transform hover:scale-110 transition-all"
            >
              <X size={20} />
            </button>
            <div className="absolute bottom-4 left-0 right-0 z-10">
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                تمام يا معلم 👍
              </span>
            </div>
          </>
        ) : (
          <div className="space-y-4 group-hover:-translate-y-2 transition-transform duration-300">
            <div className="w-20 h-20 bg-purple-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-pink-500 transition-colors duration-300">
              <Upload size={32} className="text-pink-400 group-hover:text-white transition-colors" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">{label}</h3>
              <p className="text-purple-300 text-sm">{subLabel}</p>
            </div>
            <div className="inline-block bg-purple-700/50 px-4 py-2 rounded-lg text-xs text-purple-200 border border-purple-500/30">
              دوس هنا وارفع الصورة
            </div>
          </div>
        )}
      </div>
    </div>
  );
};