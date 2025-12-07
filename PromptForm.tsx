/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import {Video} from '@google/genai';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  AspectRatio,
  GenerateVideoParams,
  GenerationMode,
  ImageFile,
  Resolution,
  VeoModel,
  VideoFile,
} from '../types';
import {
  ArrowRightIcon,
  CameraIcon,
  PlusIcon,
  RocketIcon,
  SparklesIcon,
  XMarkIcon,
} from './icons';
import ViralTemplates from './ViralTemplates';

const fileToBase64 = <T extends {file: File; base64: string}>(
  file: File,
): Promise<T> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      if (base64) {
        resolve({file, base64} as T);
      } else {
        reject(new Error('Failed to read file as base64.'));
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};
const fileToImageFile = (file: File): Promise<ImageFile> =>
  fileToBase64<ImageFile>(file);

const ImageUpload: React.FC<{
  onSelect: (image: ImageFile) => void;
  onRemove?: () => void;
  image?: ImageFile | null;
  label: React.ReactNode;
}> = ({onSelect, onRemove, image, label}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const imageFile = await fileToImageFile(file);
        onSelect(imageFile);
      } catch (error) {
        console.error('Error converting file:', error);
      }
    }
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  if (image) {
    return (
      <div className="relative w-full h-48 group bg-black rounded-lg overflow-hidden border border-gray-700">
        <img
          src={URL.createObjectURL(image.file)}
          alt="preview"
          className="w-full h-full object-contain"
        />
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-2 right-2 w-8 h-8 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-opacity"
          aria-label="Remover imagem">
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      className="w-full h-32 bg-gray-800/50 hover:bg-gray-700 border-2 border-dashed border-gray-600 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:text-white transition-colors">
      <PlusIcon className="w-8 h-8 mb-2" />
      <span className="text-sm font-medium">{label}</span>
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </button>
  );
};

interface PromptFormProps {
  onGenerate: (params: GenerateVideoParams) => void;
  initialValues?: GenerateVideoParams | null;
  credits: number;
}

type TabType = 'viral' | 'photo';

const PromptForm: React.FC<PromptFormProps> = ({
  onGenerate,
  initialValues,
  credits
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('viral');
  
  // States
  const [prompt, setPrompt] = useState('');
  const [startFrame, setStartFrame] = useState<ImageFile | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync state with initialValues if strictly needed (mostly for "Try Again")
  useEffect(() => {
    if (initialValues) {
      if (initialValues.mode === GenerationMode.FRAMES_TO_VIDEO) {
        setActiveTab('photo');
        setStartFrame(initialValues.startFrame || null);
        setPrompt(initialValues.prompt || '');
      } else {
        setActiveTab('viral');
        setPrompt(initialValues.prompt || '');
      }
    }
  }, [initialValues]);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [prompt]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    // Configurações Padrão "Viral"
    // Sempre usa Fast Preview, sempre 9:16 para viral, sempre 720p
    const baseParams = {
        model: VeoModel.VEO_FAST,
        aspectRatio: AspectRatio.PORTRAIT, // 9:16 Vertical
        resolution: Resolution.P720,
    };

    if (activeTab === 'viral') {
        onGenerate({
            ...baseParams,
            mode: GenerationMode.TEXT_TO_VIDEO,
            prompt: prompt,
        });
    } else {
        // Photo Animation
        // Use FRAMES_TO_VIDEO
        onGenerate({
            ...baseParams,
            mode: GenerationMode.FRAMES_TO_VIDEO,
            prompt: prompt, // Prompt describes the movement
            startFrame: startFrame,
        });
    }
  };

  const handleMovementPreset = (movementPrompt: string) => {
    setPrompt(movementPrompt);
  };

  const isSubmitDisabled = activeTab === 'viral' ? !prompt.trim() : (!startFrame);
  const submitText = activeTab === 'viral' ? 'Gerar Vídeo Viral' : 'Animar Foto';

  return (
    <div className="w-full bg-[#1f1f1f] rounded-2xl border border-gray-700 shadow-2xl overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-700">
            <button 
                onClick={() => setActiveTab('viral')}
                className={`flex-1 py-4 flex items-center justify-center gap-2 font-medium transition-colors ${activeTab === 'viral' ? 'bg-[#2c2c2e] text-white border-b-2 border-indigo-500' : 'text-gray-400 hover:text-gray-200 hover:bg-[#252527]'}`}
            >
                <RocketIcon className="w-5 h-5" />
                Criar Viral
            </button>
            <button 
                onClick={() => setActiveTab('photo')}
                className={`flex-1 py-4 flex items-center justify-center gap-2 font-medium transition-colors ${activeTab === 'photo' ? 'bg-[#2c2c2e] text-white border-b-2 border-indigo-500' : 'text-gray-400 hover:text-gray-200 hover:bg-[#252527]'}`}
            >
                <CameraIcon className="w-5 h-5" />
                Animar Foto
            </button>
        </div>

        <div className="p-6">
            {activeTab === 'viral' && (
                <div className="space-y-4">
                    <ViralTemplates onSelect={(p) => setPrompt(p)} />
                    
                    <div className="bg-black/30 rounded-xl p-2 border border-gray-600 focus-within:border-indigo-500 transition-colors">
                        <textarea
                            ref={textareaRef}
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Descreva seu vídeo viral... Ex: 'A cyberpunk city in rain, neon lights'"
                            className="w-full bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 resize-none min-h-[80px]"
                            rows={3}
                        />
                    </div>
                </div>
            )}

            {activeTab === 'photo' && (
                <div className="space-y-4">
                    <ImageUpload 
                        label="Clique para subir a foto do personagem/cena" 
                        image={startFrame} 
                        onSelect={setStartFrame} 
                        onRemove={() => setStartFrame(null)}
                    />
                    
                    {startFrame && (
                        <div>
                            <p className="text-xs text-gray-400 font-semibold uppercase mb-2">Escolha o Movimento</p>
                            <div className="flex flex-wrap gap-2">
                                <button type="button" onClick={() => handleMovementPreset("Slow zoom in on the face, high detail")} className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300 hover:bg-indigo-600 hover:text-white transition-colors border border-gray-600">Zoom In Suave</button>
                                <button type="button" onClick={() => handleMovementPreset("Camera pans slowly to the right, cinematic")} className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300 hover:bg-indigo-600 hover:text-white transition-colors border border-gray-600">Panorâmica Dir.</button>
                                <button type="button" onClick={() => handleMovementPreset("Character smiles gently, subtle eye movement, breathing")} className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300 hover:bg-indigo-600 hover:text-white transition-colors border border-gray-600">Reação Natural</button>
                                <button type="button" onClick={() => handleMovementPreset("Atmospheric particles floating, mystical energy")} className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300 hover:bg-indigo-600 hover:text-white transition-colors border border-gray-600">Atmosfera Mágica</button>
                            </div>
                            
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Ou descreva o movimento manualmente..."
                                className="w-full bg-black/30 border border-gray-600 rounded-lg p-3 mt-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                                rows={2}
                            />
                        </div>
                    )}
                </div>
            )}

            <button
                onClick={() => handleSubmit()}
                disabled={isSubmitDisabled}
                className={`w-full mt-6 py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-lg shadow-lg transition-all ${
                    isSubmitDisabled 
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white transform hover:scale-[1.02]'
                }`}
            >
                {activeTab === 'viral' ? <RocketIcon className="w-6 h-6" /> : <SparklesIcon className="w-6 h-6" />}
                {submitText}
            </button>
        </div>
    </div>
  );
};

export default PromptForm;