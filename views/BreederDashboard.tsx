
import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { BreederProfile, Litter, User } from '../types';
import { Settings, PlusCircle, CheckCircle, Clock, XCircle, Edit, Trash2, LogOut } from 'lucide-react';

interface BreederDashboardProps {
  currentUser: User;
  onLogout: () => void;
}

const BreederDashboard: React.FC<BreederDashboardProps> = ({ currentUser, onLogout }) => {
  const [profile, setProfile] = useState<BreederProfile | null>(null);
  const [litters, setLitters] = useState<Litter[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'info' | 'litters'>('info');

  useEffect(() => {
    loadData();
  }, [currentUser]);

  const loadData = async () => {
    setLoading(true);
    const p = await api.getBreederByUserId(currentUser.id);
    if (p) {
      setProfile(p);
      const l = await api.getLitters(p.id);
      setLitters(l);
    }
    setLoading(false);
  };

  if (loading) return <div className="p-10 text-center">Cargando panel...</div>;
  if (!profile) return <div className="p-10 text-center text-red-500 font-bold">Perfil no encontrado.</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img 
            src={currentUser.avatarUrl} 
            className="w-12 h-12 rounded-full border-2 border-blue-100" 
            alt={currentUser.nombre} 
          />
          <div>
            <h2 className="text-xl font-bold text-gray-800 leading-tight">Panel de Criador</h2>
            <p className="text-xs text-gray-500">{profile.nombreComercial}</p>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
          title="Cerrar Sesión"
        >
          <LogOut size={20} />
        </button>
      </div>

      <div className={`flex items-center gap-1 text-[10px] font-bold px-3 py-2 rounded-xl uppercase tracking-wider ${
        profile.verificacionStatus === 'VERIFIED' ? 'bg-green-100 text-green-700' :
        profile.verificacionStatus === 'PENDING' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
      }`}>
        {profile.verificacionStatus === 'VERIFIED' ? <CheckCircle size={12} /> : 
         profile.verificacionStatus === 'PENDING' ? <Clock size={12} /> : <XCircle size={12} />}
        Estatus: {profile.verificacionStatus === 'VERIFIED' ? 'Verificado' : 
         profile.verificacionStatus === 'PENDING' ? 'Pendiente de Revisión' : 'Rechazado'}
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 p-1 rounded-2xl">
        <button 
          onClick={() => setTab('info')}
          className={`flex-1 py-2 font-bold text-xs rounded-xl transition-all ${tab === 'info' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
        >
          Información
        </button>
        <button 
          onClick={() => setTab('litters')}
          className={`flex-1 py-2 font-bold text-xs rounded-xl transition-all ${tab === 'litters' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
        >
          Gestión de Camadas
        </button>
      </div>

      {tab === 'info' ? (
        <div className="space-y-4">
          <div className="bg-white border rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Settings size={18} className="text-blue-500" /> Datos del Criadero
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Responsable</label>
                  <p className="text-sm font-semibold text-gray-800">{profile.nombreResponsable}</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Ubicación</label>
                  <p className="text-sm font-semibold text-gray-800">{profile.ciudad}, {profile.estado}</p>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Descripción</label>
                <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-xl">"{profile.descripcion}"</p>
              </div>
            </div>
            <button className="w-full mt-6 bg-blue-50 text-blue-600 py-3 rounded-xl font-bold text-xs hover:bg-blue-100 transition-colors">
              Editar Perfil Público
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-2xl font-bold text-sm shadow-lg active:scale-95 transition-transform">
            <PlusCircle size={18} /> Publicar Nueva Camada
          </button>

          {litters.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-2xl border-dashed border-2 border-gray-200">
              <p className="text-gray-400 text-xs">No tienes camadas publicadas todavía.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {litters.map(l => (
                <div key={l.id} className="bg-white border rounded-2xl p-4 flex gap-4 items-center shadow-sm">
                  <img src={l.fotos[0]} className="w-14 h-14 rounded-xl object-cover shadow-sm" alt={l.raza} />
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-gray-800">{l.raza}</h4>
                    <span className="text-[10px] text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-full">{l.disponibilidad}</span>
                  </div>
                  <div className="flex gap-1">
                    <button className="p-2 text-gray-400 hover:bg-blue-50 hover:text-blue-500 rounded-lg transition-colors"><Edit size={16} /></button>
                    <button className="p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BreederDashboard;
