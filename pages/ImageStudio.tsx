import React, { useState } from 'react';
import { generateMarketingImage } from '../services/geminiService';
import { GeneratedImage } from '../types';
import { Download, Sparkles, Loader, Image as ImageIcon } from 'lucide-react';

export const ImageStudio: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('Fotorealista');
  const [loading, setLoading] = useState(false);
  const [gallery, setGallery] = useState<GeneratedImage[]>([]);

  const styles = [
    "Fotorealista", 
    "Cinemático", 
    "Anime", 
    "Pintura al Óleo", 
    "Cyberpunk", 
    "Vector Minimalista", 
    "Render 3D"
  ];

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      // Pass English mapping for better generation results if needed, or rely on model understanding Spanish styles
      const base64Image = await generateMarketingImage(prompt, style);
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        url: base64Image,
        prompt,
        style,
        timestamp: Date.now()
      };
      setGallery(prev => [newImage, ...prev]);
    } catch (e) {
      alert("Error al generar la imagen. Por favor intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col p-6 space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Estudio de Imágenes</h2>
          <p className="text-gray-400 text-sm">Impulsado por Gemini Vision (Simulando flujo de Stable Diffusion)</p>
        </div>
        <div className="flex gap-2">
            <span className="px-3 py-1 bg-purple-900/50 text-purple-300 text-xs rounded-full border border-purple-700/50 flex items-center gap-1">
                <Sparkles size={12} /> Modelo Pro
            </span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Controls */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 h-fit">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Descripción (Prompt)</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe el activo de marketing que necesitas..."
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-h-[120px]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Estilo Predefinido</label>
              <div className="grid grid-cols-2 gap-2">
                {styles.map(s => (
                  <button
                    key={s}
                    onClick={() => setStyle(s)}
                    className={`text-xs px-3 py-2 rounded-lg transition-all ${
                      style === s 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !prompt}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader className="animate-spin" size={20} /> : <Sparkles size={20} />}
              Generar Activo
            </button>
          </div>
        </div>

        {/* Gallery */}
        <div className="lg:col-span-2 bg-gray-900/50 rounded-xl border border-gray-800 p-6 overflow-y-auto max-h-[calc(100vh-140px)]">
          <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
            <ImageIcon size={20} /> Galería Generada
          </h3>
          
          {gallery.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-gray-800 rounded-xl">
              <ImageIcon size={48} className="mb-2 opacity-50" />
              <p>No se han generado imágenes aún</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {gallery.map((img) => (
                <div key={img.id} className="group relative rounded-xl overflow-hidden border border-gray-700 bg-gray-800">
                  <img src={img.url} alt={img.prompt} className="w-full h-64 object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                    <p className="text-white text-sm line-clamp-2 mb-2">{img.prompt}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-indigo-300 bg-indigo-900/50 px-2 py-1 rounded">{img.style}</span>
                      <a 
                        href={img.url} 
                        download={`nexus-gen-${img.id}.png`}
                        className="p-2 bg-white/20 hover:bg-white/40 rounded-full text-white transition-colors"
                      >
                        <Download size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};