
import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { LogOut, Heart, Bell, Sword, Flame, ChevronLeft } from 'lucide-react';

interface UserProfileViewProps {
  user: User;
  onLogout: () => void;
}

const UserProfileView: React.FC<UserProfileViewProps> = ({ user, onLogout }) => {
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [gameState, setGameState] = useState<'bonfire' | 'combat' | 'dead'>('bonfire');

  // Trigger death automatically if they wait too long in combat
  useEffect(() => {
    let timer: number;
    if (gameState === 'combat') {
      timer = window.setTimeout(() => {
        setGameState('dead');
      }, 4000); // Intimidation phase
    }
    return () => clearTimeout(timer);
  }, [gameState]);

  const handleAttack = () => {
    // Cascaron is untouchable
    setTimeout(() => {
      setGameState('dead');
    }, 400);
  };

  if (showEasterEgg) {
    return (
      <div className="fixed inset-0 z-[100] bg-black text-gray-200 flex flex-col animate-in fade-in duration-700 select-none overflow-hidden">
        {/* Exit Button */}
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
          {/* Bonfire Screen */}
          {gameState === 'bonfire' && (
            <div className="space-y-12 animate-in fade-in duration-1000">
              <div className="space-y-4">
                <Flame size={64} className="text-orange-600 mx-auto drop-shadow-[0_0_25px_rgba(234,88,12,0.9)] animate-pulse" />
                <h2 className="text-2xl font-serif italic tracking-[0.3em] text-orange-200 uppercase">Hoguera Encendida</h2>
              </div>
              
              <div className="max-w-xs w-full">
                <button 
                  onClick={() => setGameState('combat')}
                  className="group flex flex-col items-center gap-2 w-full border border-gray-800 p-8 rounded-sm hover:bg-white hover:text-black transition-all duration-700"
                >
                  <span className="font-serif tracking-[0.4em] text-sm uppercase">Atravesar la niebla</span>
                </button>
              </div>
            </div>
          )}

          {/* Combat Screen */}
          {gameState === 'combat' && (
            <div className="w-full max-w-md space-y-16 animate-in slide-in-from-bottom-12 duration-1000">
              {/* Boss UI Header */}
              <div className="space-y-4 px-6">
                <h3 className="font-serif italic text-gray-200 text-2xl tracking-[0.4em] uppercase">Cascaron</h3>
                <div className="relative h-2 w-full bg-black border border-gray-900 rounded-sm overflow-hidden shadow-[0_0_20px_rgba(220,38,38,0.5)]">
                  <div 
                    className="h-full bg-gradient-to-r from-red-950 via-red-600 to-red-950 transition-all duration-300" 
                    style={{ width: `100%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center text-[10px] font-serif text-red-800 font-bold tracking-[0.3em] uppercase">
                  <span>HP</span>
                  <span className="animate-pulse">Infinito / Infinito</span>
                </div>
              </div>

              {/* Boss Visual: Typical Evil Grey Alien */}
              <div className="relative">
                <div className="absolute inset-0 bg-red-900/10 blur-[100px] rounded-full"></div>
                
                <div className="relative w-64 h-64 mx-auto group">
                  <div className="absolute inset-0 border-2 border-red-950/30 rounded-full rotate-45 group-hover:rotate-0 transition-transform duration-[3000ms]"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1635443452044-31580218861d?q=80&w=500&auto=format&fit=crop" 
                    className="w-full h-full rounded-full object-cover border-4 border-black shadow-[0_0_80px_rgba(0,0,0,1)] grayscale contrast-150 brightness-75"
                    alt="Cascaron El Gris"
                    style={{ 
                        filter: 'contrast(1.6) brightness(0.6) grayscale(1)',
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 rounded-full"></div>
                </div>

                <div className="mt-12">
                    <p className="font-serif text-gray-300 text-3xl italic tracking-[0.1em] animate-pulse drop-shadow-lg">
                      "Hola mijo"
                    </p>
                </div>
              </div>

              {/* Impossible Action Buttons */}
              <div className="grid grid-cols-2 gap-8 px-10">
                <button 
                  onClick={handleAttack}
                  className="border border-gray-900 p-5 font-serif text-[10px] tracking-[0.4em] uppercase hover:bg-red-950/20 hover:border-red-900 transition-all active:scale-95 text-gray-600 hover:text-red-600"
                >
                  Atacar
                </button>
                <button 
                  onClick={() => setGameState('dead')}
                  className="border border-gray-900 p-5 font-serif text-[10px] tracking-[0.4em] uppercase hover:bg-gray-800 transition-all active:scale-95 text-gray-600 hover:text-white"
                >
                  Rodar
                </button>
              </div>
            </div>
          )}

          {/* Death Screen */}
          {gameState === 'dead' && (
            <div className="animate-in zoom-in-150 duration-1000 flex flex-col items-center gap-14">
              <div className="relative">
                <h1 className="text-6xl md:text-8xl font-serif text-red-900 tracking-[0.3em] font-bold drop-shadow-[0_0_50px_rgba(127,29,29,1)]">
                  HAS MUERTO
                </h1>
                <div className="absolute -inset-x-32 top-1/2 h-px bg-gradient-to-r from-transparent via-red-900 to-transparent opacity-40"></div>
              </div>
              <button 
                onClick={() => setGameState('bonfire')}
                className="text-[11px] tracking-[1em] uppercase text-gray-700 hover:text-red-500 transition-all py-4 px-10 border border-gray-900 hover:border-red-900 rounded-sm bg-black/40 backdrop-blur-sm"
              >
                Reintentar
              </button>
            </div>
          )}
        </div>

        {/* Footer Branding */}
        <div className="p-8 text-center opacity-10">
          <p className="text-[8px] font-serif uppercase tracking-[0.6em] text-gray-400">Dark Souls 2: Edición Hereditaria</p>
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
