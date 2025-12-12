import React, { useState, useEffect } from 'react';
import { generateMarketingCopy } from '../services/geminiService';
import { TextVersion, User, UserRole } from '../types';
import { 
  Bot, 
  History, 
  Check, 
  X, 
  ChevronRight, 
  Wand2, 
  FileText,
  AlertTriangle
} from 'lucide-react';

interface TextEditorProps {
  user: User;
}

export const TextEditor: React.FC<TextEditorProps> = ({ user }) => {
  const [content, setContent] = useState('Presentamos la nueva botella inteligente ecológica. Mantiene el agua fría por 24 horas y rastrea tu hidratación a través de una app.');
  const [loading, setLoading] = useState(false);
  const [versions, setVersions] = useState<TextVersion[]>([
    {
      id: '1',
      content: 'Presentamos la nueva botella inteligente ecológica. Mantiene el agua fría por 24 horas y rastrea tu hidratación a través de una app.',
      timestamp: Date.now() - 100000,
      author: 'Sistema',
      note: 'Borrador Inicial'
    }
  ]);
  const [showHistory, setShowHistory] = useState(true);

  // Verificación de permisos
  const canEdit = user.role === UserRole.COPYWRITER || user.role === UserRole.ARCHITECT;
  const canApprove = user.role === UserRole.APPROVER || user.role === UserRole.ARCHITECT;

  const handleAIAction = async (mode: 'improve' | 'summarize' | 'expand' | 'variations') => {
    if (!canEdit) {
      alert("Solo los Redactores pueden editar el contenido.");
      return;
    }
    setLoading(true);
    try {
      const result = await generateMarketingCopy(content, mode);
      
      // Guardar versión antes de cambiar
      const newVersion: TextVersion = {
        id: Date.now().toString(),
        content: result,
        timestamp: Date.now(),
        author: user.name,
        note: `Generación IA: ${mode}`
      };
      
      setVersions(prev => [newVersion, ...prev]);
      setContent(result);
    } catch (e) {
      alert("Error al generar texto.");
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = (v: TextVersion) => {
    if (!canEdit) return;
    setContent(v.content);
  };

  return (
    <div className="h-full flex flex-col p-6 overflow-hidden">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Editor de Contenido</h2>
          <p className="text-gray-400 text-sm">Asistente de redacción colaborativo con IA (Similar a Claude)</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm border border-gray-700 transition-colors"
          >
            <History size={16} /> Historial
          </button>
          {canApprove && (
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-medium transition-colors">
              <Check size={16} /> Aprobar Borrador
            </button>
          )}
        </div>
      </header>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Main Editor */}
        <div className="flex-1 flex flex-col bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-xl">
          {/* Toolbar */}
          <div className="p-2 border-b border-gray-700 flex gap-2 overflow-x-auto">
            {[
              { id: 'improve', label: 'Mejorar Redacción', icon: Wand2 },
              { id: 'expand', label: 'Expandir Ideas', icon: FileText },
              { id: 'summarize', label: 'Resumir', icon:  Bot },
              { id: 'variations', label: 'Variaciones', icon: Bot },
            ].map((tool) => (
              <button
                key={tool.id}
                onClick={() => handleAIAction(tool.id as any)}
                disabled={loading || !canEdit}
                className="flex items-center gap-2 px-3 py-1.5 bg-indigo-900/30 hover:bg-indigo-900/50 text-indigo-300 rounded-md text-xs font-medium border border-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap transition-colors"
              >
                <tool.icon size={14} />
                {tool.label}
              </button>
            ))}
          </div>
          
          <div className="flex-1 relative">
            {!canEdit && (
              <div className="absolute top-0 left-0 w-full h-full bg-gray-900/50 z-10 cursor-not-allowed flex items-center justify-center backdrop-blur-[1px]">
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-red-900 text-red-400 flex items-center gap-2">
                  <AlertTriangle size={20} />
                  <span>Modo Lectura (Restringido por Rol)</span>
                </div>
              </div>
            )}
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-full bg-gray-900 text-gray-100 p-6 resize-none focus:outline-none leading-relaxed font-serif text-lg"
              placeholder="Empieza a escribir o pega tu texto aquí..."
            />
          </div>
          
          <div className="p-2 bg-gray-800 border-t border-gray-700 text-xs text-gray-500 flex justify-between">
             <span>{content.split(' ').length} palabras</span>
             <span>{loading ? 'IA pensando...' : 'Guardado localmente'}</span>
          </div>
        </div>

        {/* Version History Sidebar */}
        {showHistory && (
          <div className="w-80 flex-shrink-0 bg-gray-900 border-l border-gray-800 flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-4 border-b border-gray-800">
              <h3 className="font-semibold text-gray-300 flex items-center gap-2">
                <History size={16} /> Control de Versiones
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {versions.map((v, idx) => (
                <div key={v.id} className="group relative pl-4 border-l-2 border-gray-700 hover:border-indigo-500 transition-colors">
                  <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-gray-700 group-hover:bg-indigo-500"></div>
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-bold text-gray-400">{v.author}</span>
                    <span className="text-[10px] text-gray-600">{new Date(v.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <p className="text-xs text-indigo-400 mb-2">{v.note}</p>
                  <div className="text-xs text-gray-500 line-clamp-2 bg-gray-800 p-2 rounded mb-2 font-mono">
                    {v.content}
                  </div>
                  {canEdit && idx !== 0 && (
                    <button 
                      onClick={() => handleRestore(v)}
                      className="text-[10px] text-indigo-400 hover:text-indigo-300 hover:underline"
                    >
                      Revertir a esta versión
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};