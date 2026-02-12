
import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { BreederProfile, Litter, User, BreederStats } from '../types';
// Added Info to the imports from lucide-react
import { Settings, PlusCircle, CheckCircle, Clock, XCircle, Edit, Trash2, LogOut, TrendingUp, Eye, MessageSquare, MousePointer2, Share2, Copy, Check, Info } from 'lucide-react';

interface BreederDashboardProps {
  currentUser: User;
  onLogout: () => void;
}

const BreederDashboard: React.FC<BreederDashboardProps> = ({ currentUser, onLogout }) => {
  const [profile, setProfile] = useState<BreederProfile | null>(null);
  const [litters, setLitters] = useState<Litter[]>([]);
  const [stats, setStats] = useState<BreederStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'info' | 'litters' | 'stats'>('info');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadData();
  }, [currentUser]);

  const loadData = async () => {
    setLoading(true);
    const p = await api.getBreederByUserId(currentUser.id);
    if (p) {
      setProfile(p);
      const [l, s] = await Promise.all([
        api.getLitters(p.id),
        api.getBreederStats(p.id)
      ]);
      setLitters(l);
      setStats(s);
    }
    setLoading(false);
  };

  const handleCopyLink = () => {
    const link = `https://criadores.mx/perfil/${profile?.slug || profile?.id}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return <div className="p-10 text-center">Cargando panel...</div>;
  if (!profile) return <div className="p-10 text-center text-red-500 font-bold">Perfil no encontrado.</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img 
            src={currentUser.avatarUrl} 
            className="w-12 h-12 rounded-full border-2 border-green-100" 
            alt={currentUser.nombre} 
          />
          <div>
            <h2 className="text-xl font-bold text-gray-800 leading-tight">Panel de Criador</h2>
            <p className="text-xs text-gray-500">{profile.nombreComercial}</p>
          </div>
        </div>
        <button onClick={onLogout} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><LogOut size={20} /></button>
      </div>

      {/* Quick Stats Banner */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white border border-gray-100 p-3 rounded-2xl shadow-sm text-center">
          <Eye size={14} className="mx-auto text-blue-500 mb-1" />
          <p className="text-sm font-extrabold text-gray-800">{stats?.profileViews30d}</p>
          <p className="text-[8px] text-gray-400 font-bold uppercase">Vistas</p>
        </div>
        <div className="bg-white border border-gray-100 p-3 rounded-2xl shadow-sm text-center">
          <MousePointer2 size={14} className="mx-auto text-green-500 mb-1" />
          <p className="text-sm font-extrabold text-gray-800">{stats?.chatStarts30d}</p>
          <p className="text-[8px] text-gray-400 font-bold uppercase">Clics Chat</p>
        </div>
        <div className="bg-white border border-gray-100 p-3 rounded-2xl shadow-sm text-center">
          <MessageSquare size={14} className="mx-auto text-purple-500 mb-1" />
          <p className="text-sm font-extrabold text-gray-800">{stats?.messagesReceived30d}</p>
          <p className="text-[8px] text-gray-400 font-bold uppercase">Mensajes</p>
        </div>
      </div>

      {/* Shareable Link Card */}
      <div className="bg-green-600 rounded-2xl p-4 text-white flex items-center justify-between shadow-lg shadow-green-100">
        <div className="flex items-center gap-3">
          <Share2 size={20} />
          <div>
            <p className="text-xs font-bold opacity-80 uppercase tracking-widest">Enlace Público</p>
            <p className="text-[10px] truncate max-w-[150px]">criadores.mx/perfil/{profile.slug}</p>
          </div>
        </div>
        <button 
          onClick={handleCopyLink}
          className="bg-white/20 hover:bg-white/30 p-2 rounded-xl transition-all"
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 p-1 rounded-2xl">
        <button 
          onClick={() => setTab('info')}
          className={`flex-1 py-2 font-bold text-[10px] uppercase tracking-wider rounded-xl transition-all ${tab === 'info' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500'}`}
        >
          Info
        </button>
        <button 
          onClick={() => setTab('litters')}
          className={`flex-1 py-2 font-bold text-[10px] uppercase tracking-wider rounded-xl transition-all ${tab === 'litters' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500'}`}
        >
          Camadas
        </button>
        <button 
          onClick={() => setTab('stats')}
          className={`flex-1 py-2 font-bold text-[10px] uppercase tracking-wider rounded-xl transition-all ${tab === 'stats' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500'}`}
        >
          Análisis
        </button>
      </div>

      {tab === 'info' && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="bg-white border rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-sm">
              <Settings size={18} className="text-green-500" /> Perfil de Criadero
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Responsable</label>
                  <p className="text-xs font-bold text-gray-800">{profile.nombreResponsable}</p>
                </div>
                <div>
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Ubicación</label>
                  <p className="text-xs font-bold text-gray-800">{profile.ciudad}, {profile.estado}</p>
                </div>
              </div>
              <div className={`flex items-center gap-1 text-[9px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider w-fit ${
                profile.verificacionStatus === 'VERIFIED' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
              }`}>
                {profile.verificacionStatus === 'VERIFIED' ? <CheckCircle size={10} /> : <Clock size={10} />}
                {profile.verificacionStatus === 'VERIFIED' ? 'Verificado' : 'Pendiente'}
              </div>
            </div>
            <button className="w-full mt-6 bg-green-50 text-green-600 py-3 rounded-xl font-bold text-xs hover:bg-green-100 transition-colors">
              Editar Perfil Público
            </button>
          </div>
        </div>
      )}

      {tab === 'litters' && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <button className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-4 rounded-2xl font-bold text-sm shadow-lg active:scale-95 transition-transform">
            <PlusCircle size={18} /> Publicar Nueva Camada
          </button>
          <div className="space-y-3">
            {litters.map(l => (
              <div key={l.id} className="bg-white border rounded-2xl p-4 flex gap-4 items-center shadow-sm">
                <img src={l.fotos[0]} className="w-14 h-14 rounded-xl object-cover shadow-sm" alt={l.raza} />
                <div className="flex-1">
                  <h4 className="font-bold text-sm text-gray-800">{l.raza}</h4>
                  <span className="text-[10px] text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-full">{l.disponibilidad}</span>
                </div>
                <div className="flex gap-1">
                  <button className="p-2 text-gray-400 hover:bg-green-50 hover:text-green-500 rounded-lg transition-colors"><Edit size={16} /></button>
                  <button className="p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'stats' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-gray-900 text-white p-6 rounded-3xl space-y-4">
             <div className="flex items-center gap-2 text-green-400">
               <TrendingUp size={20} />
               <h3 className="font-bold text-sm uppercase tracking-widest">Rendimiento 30d</h3>
             </div>
             <div className="space-y-6 pt-2">
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase opacity-60">
                    <span>Conversión (Clics/Vistas)</span>
                    <span>{Math.round((stats?.chatStarts30d || 0) / (stats?.profileViews30d || 1) * 100)}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: `${(stats?.chatStarts30d || 0) / (stats?.profileViews30d || 1) * 100}%` }}></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                      <p className="text-[10px] font-bold uppercase opacity-40 mb-1 text-white">Tasa Resp.</p>
                      <p className="text-xl font-extrabold text-green-400">{profile.responseRate30d}%</p>
                   </div>
                   <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                      <p className="text-[10px] font-bold uppercase opacity-40 mb-1 text-white">Promedio</p>
                      <p className="text-xl font-extrabold text-blue-400">1.2h</p>
                   </div>
                </div>
             </div>
          </div>
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3">
             {/* Info component is now available via imports */}
             <Info size={20} className="text-amber-500 shrink-0" />
             <p className="text-[10px] text-amber-800 leading-tight">
               <strong>Consejo:</strong> Los criaderos con fotos de alta calidad y un tiempo de respuesta menor a 4 horas reciben hasta 3 veces más contactos.
             </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BreederDashboard;
