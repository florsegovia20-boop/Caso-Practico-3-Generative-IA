import React from 'react';
import { ViewState, UserRole, User } from '../types';
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  FileText, 
  Server, 
  Settings, 
  LogOut,
  ShieldCheck
} from 'lucide-react';

interface SidebarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  currentUser: User;
  onRoleChange: (role: UserRole) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentView, 
  onNavigate, 
  currentUser,
  onRoleChange 
}) => {
  
  const navItems = [
    { id: ViewState.DASHBOARD, label: 'Panel Principal', icon: LayoutDashboard },
    { id: ViewState.IMAGE_STUDIO, label: 'Estudio de Imágenes', icon: ImageIcon },
    { id: ViewState.TEXT_EDITOR, label: 'Editor de Contenido', icon: FileText },
    { id: ViewState.ARCHITECTURE, label: 'Propuesta Técnica', icon: Server },
  ];

  return (
    <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col h-full">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg"></div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            Nexus
          </span>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-gray-800 text-white' 
                    : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <img 
            src={currentUser.avatar} 
            alt="User" 
            className="w-10 h-10 rounded-full border-2 border-indigo-500"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{currentUser.name}</p>
            <p className="text-xs text-indigo-400 truncate">{currentUser.role}</p>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="text-xs text-gray-500 uppercase font-bold mb-2 block">Simular Rol</label>
          <select 
            value={currentUser.role}
            onChange={(e) => onRoleChange(e.target.value as UserRole)}
            className="w-full bg-gray-800 text-xs text-gray-300 rounded border border-gray-700 p-2 focus:outline-none focus:border-indigo-500"
          >
            {Object.values(UserRole).map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 text-green-500 text-xs mt-2">
            <ShieldCheck size={12} />
            <span>Conexión Segura (AES-256)</span>
        </div>
      </div>
    </div>
  );
};