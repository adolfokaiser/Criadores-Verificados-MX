
import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { LogOut, Heart, Bell, Sword, Flame, ChevronLeft, Skull } from 'lucide-react';

interface UserProfileViewProps {
  user: User;
  onLogout: () => void;
}

const UserProfileView: React.FC<UserProfileViewProps> = ({ user, onLogout }) => {
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [gameState, setGameState] = useState<'bonfire' | 'combat' | 'dead'>('bonfire');
  const [enemyHealth] = useState(100);

  // Trigger death automatically if they wait too long in combat
  useEffect(() => {
    let timer: number;
    if (gameState === 'combat') {
      timer = window.setTimeout(() => {
        setGameState('dead');
      }, 2500); // Give a bit more time to see the "Infinito" HP
    }
    return () => clearTimeout(timer);
  }, [gameState]);

  const handleAttack = () => {
    // Rigged: attacking Ser Cascaron is futile
    setTimeout(() => {
      setGameState('dead');
    }, 400);
  };

  if (showEasterEgg) {
    return (
      <div className="fixed inset-0 z-[100] bg-black text-gray-200 flex flex-col animate-in fade-in duration-700 select-none">
        <div className="p-4 flex items-center">
          <button 
            onClick={() => {
              setShowEasterEgg(false);
              setGameState('bonfire');
            }} 
            className="flex items-center gap-2 text-[10px] uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity font-serif"
          >
            <ChevronLeft size={14} /> Abandonar el sueño
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          {gameState === 'bonfire' && (
            <div className="space-y-12 animate-in fade-in duration-1000">
              <div className="space-y-4">
                <Flame size={60} className="text-orange-600 mx-auto drop-shadow-[0_0_20px_rgba(234,88,12,0.9)] animate-pulse" />
                <h2 className="text-xl font-serif italic tracking-[0.2em] text-orange-200">HOGUERA ENCENDIDA</h2>
              </div>
              
              <div className="max-w-xs space-y-8">
                <p className="text-lg font-serif italic text-gray-400 animate-pulse">
                  "Hola mijo"
                </p>
                <button 
                  onClick={() => {
                    setGameState('combat');
                  }}
                  className="group flex flex-col items-center gap-2 w-full border border-gray-800 p-6 rounded-sm hover:bg-white hover:text-black transition-all duration-700"
                >
                  <span className="font-serif tracking-[0.3em] text-xs uppercase">Atravesar la niebla</span>
                </button>
              </div>
            </div>
          )}

          {gameState === 'combat' && (
            <div className="w-full max-w-md space-y-12 animate-in slide-in-from-bottom-8 duration-500">
              {/* Boss UI */}
              <div className="space-y-2">
                <h3 className="font-serif italic text-gray-400 text-sm tracking-widest uppercase">Ser Cascaron</h3>
                <div className="w-full h-1.5 bg-gray-900 border border-gray-800 rounded-full overflow-hidden shadow-[0_0_15px_rgba(127,29,29,0.8)]">
                  <div 
                    className="h-full bg-red-600 transition-all duration-300 shadow-[0_0_10px_red]" 
                    style={{ width: `100%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center text-[9px] font-serif text-red-600 font-bold tracking-widest uppercase px-1">
                  <span>HP</span>
                  <span>Infinito / Infinito</span>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-red-900/10 blur-3xl rounded-full animate-pulse"></div>
                {/* Visual Boss Representation matching the provided image style */}
                <div className="relative w-48 h-48 mx-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1594132049032-4740777478d3?q=80&w=400&auto=format&fit=crop" 
                    className="w-full h-full rounded-2xl object-cover border-4 border-red-900/40 shadow-[0_0_50px_rgba(127,29,29,0.6)] grayscale contrast-125"
                    alt="Boss"
                    style={{ filter: 'sepia(0.5) contrast(1.2) brightness(0.9)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 rounded-2xl"></div>
                </div>
                <p className="mt-8 font-serif text-red-900 text-[10px] tracking-[0.5em] uppercase animate-pulse font-bold">
                  TU FINAL HA LLEGADO
                </p>
              </div>

              {/* Impossible Gameplay */}
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={handleAttack}
                  className="border border-gray-800 p-4 font-serif text-xs tracking-widest uppercase hover:bg-red-950 transition-colors active:scale-95"
                >
                  Atacar
                </button>
                <button 
                  onClick={() => setGameState('dead')}
                  className="border border-gray-800 p-4 font-serif text-xs tracking-widest uppercase hover:bg-gray-900 transition-colors active:scale-95"
                >
                  Rodar
                </button>
              </div>
            </div>
          )}

          {gameState === 'dead' && (
            <div className="animate-in zoom-in-150 duration-1000 flex flex-col items-center gap-10">
              <h1 className="text-6xl md:text-8xl font-serif text-red-900 tracking-[0.2em] font-bold drop-shadow-[0_0_30px_rgba(127,29,29,1)]">
                HAS MUERTO
              </h1>
              <button 
                onClick={() => setGameState('bonfire')}
                className="text-[9px] tracking-[0.6em] uppercase text-gray-700 hover:text-white transition-colors py-2 border-b border-transparent hover:border-gray-700"
              >
                Reintentar
              </button>
            </div>
          )}
        </div>

        <div className="p-8 text-center opacity-10">
          <p className="text-[9px] font-serif uppercase tracking-[0.3em]">Dark Souls 2: Criadores Edition</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center space-y-3 pb-6 border-b">
        <div className="relative">
          <img 
            src={user.avatarUrl || `https://ui-avatars.com/api/?name=${user.nombre}&background=0D8ABC&color=fff`} 
            alt={user.nombre} 
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
          />
          <div className="absolute bottom-0 right-0 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{user.nombre}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
          <span className="inline-block mt-2 text-[10px] font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-full uppercase tracking-widest">
            Comprador
          </span>
        </div>
      </div>

      {/* Menu Options */}
      <div className="space-y-3">
        <button className="w-full flex items-center justify-between p-4 bg-white border rounded-2xl hover:bg-gray-50 transition-colors shadow-sm">
          <div className="flex items-center gap-3 text-gray-700 font-semibold text-sm">
            <Heart size={20} className="text-pink-500" />
            Mis Criadores Favoritos
          </div>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded-lg text-gray-400">0</span>
        </button>
        <button className="w-full flex items-center justify-between p-4 bg-white border rounded-2xl hover:bg-gray-50 transition-colors shadow-sm">
          <div className="flex items-center gap-3 text-gray-700 font-semibold text-sm">
            <Bell size={20} className="text-amber-500" />
            Alertas de Razas
          </div>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded-lg text-gray-400">Desactivado</span>
        </button>
        
        {/* Easter Egg Button */}
        <button 
          onClick={() => setShowEasterEgg(true)}
          className="w-full flex items-center justify-between p-4 bg-gray-900 text-white border-none rounded-2xl hover:bg-black transition-all shadow-lg active:scale-95 group"
        >
          <div className="flex items-center gap-3 font-semibold text-sm">
            <Sword size={20} className="text-red-500 group-hover:rotate-12 transition-transform" />
            Jugar Dark Souls 2
          </div>
          <Flame size={16} className="text-orange-500 animate-pulse" />
        </button>
      </div>

      {/* Danger Zone */}
      <div className="pt-6">
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 text-red-600 font-bold py-4 border-2 border-red-50 rounded-2xl hover:bg-red-50 transition-colors"
        >
          <LogOut size={20} />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default UserProfileView;
