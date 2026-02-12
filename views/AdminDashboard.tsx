import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { BreederProfile, User } from '../types';
import { ShieldAlert, Check, X, FileText, ExternalLink, LogOut } from 'lucide-react';

interface AdminDashboardProps {
  currentUser: User;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ currentUser, onLogout }) => {
  const [pending, setPending] = useState<BreederProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPending();
  }, []);

  const loadPending = async () => {
    setLoading(true);
    const list = await api.getPendingBreeders();
    setPending(list);
    setLoading(false);
  };

  const handleStatusUpdate = async (id: string, status: 'VERIFIED' | 'REJECTED') => {
    await api.updateVerificationStatus(id, status);
    loadPending();
  };

  if (currentUser.role !== 'ADMIN') {
    return <div className="p-10 text-center text-red-500 font-bold">Acceso Denegado.</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-red-600">
          <ShieldAlert size={28} />
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Moderación</h2>
        </div>
        <button 
          onClick={onLogout}
          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
        >
          <LogOut size={20} />
        </button>
      </div>

      <section>
        <h3 className="font-bold text-gray-500 mb-4 uppercase text-[10px] tracking-[0.2em] border-b pb-2">
          Criadores Pendientes ({pending.length})
        </h3>
        {loading ? (
          <div className="text-center py-10 text-sm text-gray-400">Cargando solicitudes...</div>
        ) : pending.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <p>Todo en orden. No hay solicitudes pendientes.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pending.map(b => (
              <div key={b.id} className="bg-white border-2 border-gray-100 rounded-3xl overflow-hidden shadow-sm">
                <div className="p-5 bg-gray-50/50 border-b flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-gray-800">{b.nombreComercial}</h4>
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">{b.nombreResponsable}</p>
                  </div>
                  <span className="text-[10px] bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-bold">PENDIENTE</span>
                </div>
                <div className="p-5 space-y-5">
                  <div>
                    <p className="text-xs text-gray-600 mb-3 font-bold flex items-center gap-2">
                      <FileText size={16} className="text-gray-400" /> Documentación:
                    </p>
                    <div className="space-y-2">
                      {b.verificacionEvidencia.map((ev, i) => (
                        <div key={i} className="flex items-center justify-between text-xs bg-white border border-gray-100 p-3 rounded-2xl shadow-sm">
                          <span className="font-medium">{ev.tipo}</span>
                          <button className="text-green-600 font-bold flex items-center gap-1 hover:underline">
                            Revisar <ExternalLink size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button 
                      onClick={() => handleStatusUpdate(b.id, 'VERIFIED')}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                    >
                      <Check size={14} /> Aprobar Registro
                    </button>
                    <button 
                      onClick={() => handleStatusUpdate(b.id, 'REJECTED')}
                      className="flex-1 bg-white text-red-600 border-2 border-red-50 hover:bg-red-50 py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95"
                    >
                      <X size={14} /> Rechazar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;