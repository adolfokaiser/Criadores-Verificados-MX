
import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { BreederProfile, Litter, User } from '../types';
import { MapPin, MessageSquare, ShieldCheck, Calendar, Info } from 'lucide-react';

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

  if (loading) return <div className="p-10 text-center">Cargando...</div>;
  if (!breeder) return <div className="p-10 text-center">Criador no encontrado.</div>;

  return (
    <div className="animate-in slide-in-from-right duration-300">
      <div className="relative">
        <img src={breeder.fotos[0]} className="w-full h-64 object-cover" alt={breeder.nombreComercial} />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-6 text-white">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-2xl font-bold">{breeder.nombreComercial}</h2>
            {breeder.verificacionStatus === 'VERIFIED' && <ShieldCheck className="text-blue-400" />}
          </div>
          <p className="text-sm text-gray-300 flex items-center gap-1">
            <MapPin size={14} /> {breeder.ciudad}, {breeder.estado}
          </p>
        </div>
      </div>

      <div className="p-6 space-y-8">
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
              <span key={r} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
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

        {/* Security Notice */}
        <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl flex gap-3">
          <Info size={20} className="text-amber-500 shrink-0" />
          <p className="text-[11px] text-amber-800">
            Por tu seguridad, toda comunicación debe mantenerse dentro de la plataforma. 
            Nunca compartas datos bancarios sin antes conocer al criador y ver la camada.
          </p>
        </div>

        {/* CTA Contact */}
        <div className="sticky bottom-4 left-0 right-0">
          <button
            onClick={() => currentUser ? onContact(breeder.id) : onLogin()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-95"
          >
            <MessageSquare size={20} />
            Contactar al Criador
          </button>
        </div>
      </div>
    </div>
  );
};

export default BreederProfileView;
