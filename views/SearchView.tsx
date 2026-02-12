
import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, MapPin, Filter, CheckCircle, Clock, Zap, Star } from 'lucide-react';
import { api } from '../services/api';
import { BreederProfile } from '../types';
import { ESTADOS_MEXICO, RAZAS_COMUNES } from '../constants';

interface SearchViewProps {
  onSelectBreeder: (id: string) => void;
}

const SearchView: React.FC<SearchViewProps> = ({ onSelectBreeder }) => {
  const [breeders, setBreeders] = useState<BreederProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterBreed, setFilterBreed] = useState('');
  const [filterState, setFilterState] = useState('');
  const [quickFilter, setQuickFilter] = useState('');
  const [sortBy, setSortBy] = useState('relevance');

  useEffect(() => {
    loadBreeders();
  }, [filterBreed, filterState, quickFilter, sortBy]);

  const loadBreeders = async () => {
    setLoading(true);
    const results = await api.getBreeders({ 
      breed: filterBreed, 
      state: filterState, 
      quickFilter,
      sortBy
    });
    setBreeders(results);
    setLoading(false);
  };

  const formatResponseTime = (seconds?: number) => {
    if (!seconds) return 'Sin datos';
    if (seconds < 3600) return '< 1h';
    if (seconds < 43200) return '< 12h';
    if (seconds < 86400) return '< 24h';
    return '+48h';
  };

  return (
    <div className="p-4 space-y-4">
      {/* Search Bar & Filters */}
      <div className="space-y-4 sticky top-14 bg-white z-40 pb-2 border-b shadow-[0_4px_6px_-6px_rgba(0,0,0,0.1)]">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <select
              value={filterBreed}
              onChange={(e) => setFilterBreed(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-lg text-sm appearance-none outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Todas las razas</option>
              {RAZAS_COMUNES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <select
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-lg text-sm appearance-none outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Todo México</option>
              {ESTADOS_MEXICO.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>
        </div>

        {/* Quick Filters (Chips) */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {[
            { id: 'verified', label: 'Verificados', icon: <CheckCircle size={12} /> },
            { id: 'available', label: 'Con Camadas', icon: <Star size={12} /> },
            { id: 'fast-response', label: 'Respuesta rápida', icon: <Zap size={12} /> }
          ].map(chip => (
            <button
              key={chip.id}
              onClick={() => setQuickFilter(quickFilter === chip.id ? '' : chip.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold whitespace-nowrap transition-all border ${
                quickFilter === chip.id 
                  ? 'bg-green-600 border-green-600 text-white' 
                  : 'bg-white border-gray-200 text-gray-500'
              }`}
            >
              {chip.icon} {chip.label}
            </button>
          ))}
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            {breeders.length} Criaderos
          </span>
          <select 
            className="text-[10px] font-bold text-green-600 bg-transparent outline-none border-none"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="relevance">Relevancia</option>
            <option value="recent">Más recientes</option>
            <option value="trust">Mejor Confianza</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-20 text-center text-gray-400">Cargando criadores...</div>
        ) : breeders.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-gray-500">No encontramos criadores con esos filtros.</p>
            <button 
              onClick={() => { setFilterBreed(''); setFilterState(''); setQuickFilter(''); }}
              className="text-green-600 mt-2 font-bold"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          breeders.map(b => (
            <div 
              key={b.id} 
              onClick={() => onSelectBreeder(b.id)}
              className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer active:scale-[0.98]"
            >
              <img src={b.fotos[0]} className="w-full h-40 object-cover" alt={b.nombreComercial} />
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-lg">{b.nombreComercial}</h3>
                  {b.verificacionStatus === 'VERIFIED' && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      <CheckCircle size={10} /> Verificado
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <MapPin size={12} /> {b.ciudad}, {b.estado}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-medium text-gray-400">
                    <Clock size={10} /> Resp. {formatResponseTime(b.responseTimeAvgSeconds)}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {b.razasOfrecidas.map(r => (
                    <span key={r} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchView;
