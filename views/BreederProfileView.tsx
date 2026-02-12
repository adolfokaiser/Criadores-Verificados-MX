
import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { BreederProfile, Litter, User } from '../types';
import { MapPin, MessageSquare, ShieldCheck, Calendar, Info, Activity, Clock, Heart, ShieldAlert, X } from 'lucide-react';

interface BreederProfileViewProps {
  breederId: string;
  currentUser: User | null;
  onContact: (breederId: string) => void;
  onLogin: () => void;
}

const BreederProfileView: React.FC<BreederProfileViewProps> = ({ breederId, currentUser, onContact, onLogin }) => {
  const [breeder, setBreeder] = useState<BreederProfile | null>(null);
  const [litters, setLitters] = useState<Litter[]>([]);
  const [loading, setLoading] = useState(true);
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
    loadData();
  }, [breederId]);

  const loadData = async () => {
    setLoading(true);
    const b = await api.getBreederById(breederId);
    if (b) {
      setBreeder(b);
      const l = await api.getLitters(breederId);
      setLitters(l);
    }
    setLoading(false);
  };

  const handleContactClick = () => {
    if (!currentUser) {
      onLogin();
    } else {
      setShowContactModal(true);
    }
  };

  const confirmContact = () => {
    setShowContactModal(false);
    onContact(breederId);
  };

  const calculateTimeInPlatform = (dateStr: string) => {
    const created = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays < 30) return `${diffDays} días`;
    const months = Math.floor(diffDays / 30);
    return `${months} ${months === 1 ? 'mes' : 'meses'}`;
  };

  const formatLastActive = (dateStr?: string) => {
    if (!dateStr) return 'Recientemente';
    const date = new Date(dateStr);
    const diff = Date.now() - date.getTime();
    if (diff < 3600000) return 'Ahora';
    if (diff < 86400000) return 'Hoy';
    return 'Hace 2+ días';
  };

  if (loading) return <div className="p-10 text-center">Cargando...</div>;
  if (!breeder) return <div className="p-10 text-center">Criador no encontrado.</div>;

  return (
    <div className="animate-in slide-in-from-right duration-300 relative">
      <div className="relative">
        <img src={breeder.fotos[0]} className="w-full h-64 object-cover" alt={breeder.nombreComercial} />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-6 text-white">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-2xl font-bold">{breeder.nombreComercial}</h2>
            {breeder.verificacionStatus === 'VERIFIED' && <ShieldCheck className="text-green-400" />}
          </div>
          <p className="text-sm text-gray-300 flex items-center gap-1">
            <MapPin size={14} /> {breeder.ciudad}, {breeder.estado}
          </p>
        </div>
      </div>

      <div className="p-6 space-y-8 pb-24">
        {/* Confianza & Métricas */}
        <section className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
          <h3 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
            <ShieldCheck size={16} className="text-green-600" /> Señales de confianza
          </h3>
          <div className="grid grid-cols-2 gap-y-4">
            <div className="flex items-center gap-2">
              <Activity size={14} className="text-gray-400" />
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Actividad</p>
                <p className="text-xs font-bold text-gray-700">{formatLastActive(breeder.lastActiveAt)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-gray-400" />
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Antigüedad</p>
                <p className="text-xs font-bold text-gray-700">{calculateTimeInPlatform(breeder.createdAt)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare size={14} className="text-gray-400" />
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Tasa Resp.</p>
                <p className="text-xs font-bold text-gray-700">{breeder.responseRate30d}%</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Heart size={14} className="text-gray-400" />
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Camadas</p>
                <p className="text-xs font-bold text-gray-700">{litters.length} activas</p>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-[9px] text-gray-400 leading-tight italic">
              * Datos basados en los últimos 30 días de actividad en la plataforma.
            </p>
          </div>
        </section>

        {/* Bio */}
        <section>
          <h3 className="font-bold text-gray-800 mb-2">Acerca de nosotros</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{breeder.descripcion}</p>
        </section>

        {/* Razas */}
        <section>
          <h3 className="font-bold text-gray-800 mb-2">Razas que trabajamos</h3>
          <div className="flex flex-wrap gap-2">
            {breeder.razasOfrecidas.map(r => (
              <span key={r} className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                {r}
              </span>
            ))}
          </div>
        </section>

        {/* Camadas */}
        <section>
          <h3 className="font-bold text-gray-800 mb-3">Camadas actuales</h3>
          {litters.length === 0 ? (
            <div className="bg-gray-50 border border-dashed rounded-xl p-6 text-center text-gray-500 text-sm">
              No hay camadas disponibles en este momento.
            </div>
          ) : (
            <div className="space-y-4">
              {litters.map(l => (
                <div key={l.id} className="border rounded-xl p-4 flex gap-4">
                  <img src={l.fotos[0]} className="w-20 h-20 rounded-lg object-cover shrink-0" alt={l.raza} />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-gray-800">{l.raza}</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        l.disponibilidad === 'Disponible' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {l.disponibilidad}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                      <Calendar size={12} /> Nacidos: {l.fechaNacimiento || 'N/A'}
                    </div>
                    <p className="text-xs text-gray-500 mt-2 line-clamp-2">{l.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Disclaimer */}
        <div className="bg-gray-100 p-4 rounded-xl">
          <p className="text-[10px] text-gray-500 leading-tight">
            <strong>Aviso:</strong> Criadores.mx verifica la documentación proporcionada según nuestros protocolos de seguridad. Sin embargo, el usuario es responsable de evaluar al criador y las condiciones de salud del ejemplar antes de cualquier transacción.
          </p>
        </div>

        {/* CTA Contact */}
        <div className="fixed bottom-4 left-4 right-4 max-w-[calc(448px-2rem)] mx-auto">
          <button
            onClick={handleContactClick}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-95"
          >
            <MessageSquare size={20} />
            Contactar al Criador
          </button>
        </div>
      </div>

      {/* Contact Confirmation Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-sm rounded-t-3xl sm:rounded-3xl p-6 space-y-4 shadow-2xl animate-in slide-in-from-bottom-8">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <ShieldCheck size={28} />
              </div>
              <button onClick={() => setShowContactModal(false)} className="text-gray-400 p-1"><X size={20}/></button>
            </div>
            <h4 className="text-xl font-bold text-gray-800">Contacto Seguro</h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              Estás por iniciar una conversación con <strong>{breeder.nombreComercial}</strong>. Por tu seguridad:
            </p>
            <ul className="space-y-2">
              <li className="text-xs text-gray-600 flex gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 shrink-0" />
                No compartas teléfonos o correos hasta estar seguro de la legitimidad.
              </li>
              <li className="text-xs text-gray-600 flex gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 shrink-0" />
                Toda la mensajería está protegida por nuestros filtros de seguridad.
              </li>
            </ul>
            <button 
              onClick={confirmContact}
              className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold text-sm shadow-lg active:scale-95 transition-all"
            >
              Iniciar chat ahora
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BreederProfileView;
