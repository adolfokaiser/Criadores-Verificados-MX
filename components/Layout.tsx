
import React from 'react';
import { Home, Search, MessageSquare, User, ShieldCheck } from 'lucide-react';
import { User as UserType } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: UserType | null;
  onNavigate: (view: string) => void;
  currentView: string;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onNavigate, currentView }) => {
  const NavItem = ({ view, icon: Icon, label }: { view: string, icon: any, label: string }) => {
    const isActive = currentView === view;
    return (
      <button 
        onClick={() => onNavigate(view)}
        className={`flex flex-col items-center justify-center w-full py-2 transition-colors ${
          isActive ? 'text-blue-600' : 'text-gray-500 hover:text-blue-500'
        }`}
      >
        <Icon size={24} />
        <span className="text-xs mt-1 font-medium">{label}</span>
      </button>
    );
  };

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-white shadow-xl relative">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b px-4 py-3 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => onNavigate('home')}
        >
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <ShieldCheck size={20} />
          </div>
          <h1 className="font-bold text-lg text-gray-800 tracking-tight">Criadores.mx</h1>
        </div>
        {user ? (
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-100 px-2 py-1 rounded">
              {user.role}
            </span>
            <img 
              src={user.avatarUrl} 
              alt={user.nombre} 
              className="w-8 h-8 rounded-full border border-gray-200"
            />
          </div>
        ) : (
          <button 
            onClick={() => onNavigate('login')}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            Ingresar
          </button>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-20 overflow-y-auto no-scrollbar">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t flex justify-around items-center z-50 h-16 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <NavItem view="home" icon={Home} label="Inicio" />
        <NavItem view="search" icon={Search} label="Buscar" />
        <NavItem view="messages" icon={MessageSquare} label="Mensajes" />
        <NavItem view="profile" icon={User} label="Mi Cuenta" />
      </nav>
    </div>
  );
};

export default Layout;
