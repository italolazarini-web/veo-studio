/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { SparklesIcon } from './icons';

interface Template {
  id: string;
  label: string;
  emoji: string;
  prompt: string;
  color: string;
}

const templates: Template[] = [
  {
    id: 'nature',
    label: 'Natureza Épica',
    emoji: '🌿',
    prompt: 'Cinematic drone shot of a majestic waterfall in a lush tropical jungle, golden hour lighting, 4k resolution, hyperrealistic, slow motion water droplets.',
    color: 'from-green-500/20 to-emerald-500/20 hover:border-green-500',
  },
  {
    id: 'cyberpunk',
    label: 'Futuro Neon',
    emoji: '🌃',
    prompt: 'Cyberpunk city street at night, raining, neon lights reflecting on wet pavement, futuristic cars flying above, blade runner style, detailed textures.',
    color: 'from-purple-500/20 to-blue-500/20 hover:border-purple-500',
  },
  {
    id: 'cute',
    label: 'Mascote 3D',
    emoji: '🐱',
    prompt: 'A cute fluffy kitten wearing astronaut gear floating in space, pixar style animation, big eyes, expressive face, galaxy background, soft lighting.',
    color: 'from-pink-500/20 to-rose-500/20 hover:border-pink-500',
  },
  {
    id: 'oddly',
    label: 'Satisfatório',
    emoji: '✨',
    prompt: 'Oddly satisfying video of kinetic sand being sliced perfectly, macro shot, vibrant colors, smooth motion, high detail.',
    color: 'from-yellow-500/20 to-orange-500/20 hover:border-yellow-500',
  },
];

interface ViralTemplatesProps {
  onSelect: (prompt: string) => void;
}

const ViralTemplates: React.FC<ViralTemplatesProps> = ({ onSelect }) => {
  return (
    <div className="w-full mb-6">
      <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
        <SparklesIcon className="w-3 h-3 text-indigo-400" />
        Ideias Virais Rápidas
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {templates.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => onSelect(t.prompt)}
            className={`flex flex-col items-center justify-center p-3 rounded-xl border border-gray-700 bg-gradient-to-br ${t.color} hover:bg-gray-700 transition-all active:scale-95 text-center group`}
          >
            <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">{t.emoji}</span>
            <span className="text-xs font-medium text-gray-200">{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ViralTemplates;