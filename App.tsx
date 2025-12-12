import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ArchitectureProposal } from './pages/ArchitectureProposal';
import { ImageStudio } from './pages/ImageStudio';
import { TextEditor } from './pages/TextEditor';
import { ViewState, UserRole, User } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.ARCHITECTURE);
  const [user, setUser] = useState<User>({
    id: 'u1',
    name: 'Alejandro Arquitecto',
    role: UserRole.ARCHITECT,
    avatar: 'https://picsum.photos/200'
  });

  const handleRoleChange = (role: UserRole) => {
    setUser(prev => ({ ...prev, role }));
  };

  const renderContent = () => {
    switch (currentView) {
      case ViewState.ARCHITECTURE:
        return <ArchitectureProposal />;
      case ViewState.IMAGE_STUDIO:
        return <ImageStudio />;
      case ViewState.TEXT_EDITOR:
        return <TextEditor user={user} />;
      case ViewState.DASHBOARD:
        return (
          <div className="p-8 text-center text-gray-400">
            <h1 className="text-3xl font-bold text-white mb-4">Panel Principal</h1>
            <p>Selecciona una herramienta del menú lateral para comenzar.</p>
            <div className="mt-8 grid grid-cols-3 gap-6 opacity-50 pointer-events-none">
                <div className="h-32 bg-gray-800 rounded-lg"></div>
                <div className="h-32 bg-gray-800 rounded-lg"></div>
                <div className="h-32 bg-gray-800 rounded-lg"></div>
            </div>
          </div>
        );
      default:
        return <ArchitectureProposal />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden font-sans">
      <Sidebar 
        currentView={currentView} 
        onNavigate={setCurrentView}
        currentUser={user}
        onRoleChange={handleRoleChange}
      />
      
      <main className="flex-1 overflow-y-auto relative bg-gradient-to-br from-gray-900 to-gray-800">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;