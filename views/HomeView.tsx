
import React from 'react';
import { Search, ShieldCheck, Heart, Award } from 'lucide-react';

interface HomeViewProps {
  onSearch: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onSearch }) => {
  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative h-64 flex items-center justify-center text-white overflow-hidden">
        <img 
          src="https://picsum.photos/seed/hero-dog/800/600" 
          className="absolute inset-0 w-full h-full object-cover brightness-50"
          alt="Hero background"
        />
        <div className="relative z-10 text-center px-6">
          <h2 className="text-3xl font-extrabold mb-2">Tu compañero ideal empieza aquí</h2>
          <p className="text-gray-200 text-sm mb-6">Encuentra criadores éticos y verificados en todo México.</p>
          <button 
            onClick={onSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 mx-auto transition-transform active:scale-95"
          >
            <Search size={20} />
            Explorar Directorio
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-10 space-y-8">
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Verificación Estricta</h3>
            <p className="text-sm text-gray-500">Validamos registros ante asociaciones canófilas y condiciones de salud.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center shrink-0">
            <Heart size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Trato Directo</h3>
            <p className="text-sm text-gray-500">Habla directamente con el criador sin intermediarios comerciales.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
            <Award size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Calidad y Ética</h3>
            <p className="text-sm text-gray-500">Priorizamos el bienestar animal sobre la venta masiva.</p>
          </div>
        </div>
      </section>

      {/* CTA Breeder */}
      <section className="bg-gray-900 mx-4 mb-8 rounded-2xl p-6 text-white text-center">
        <h3 className="text-xl font-bold mb-2">¿Eres criador profesional?</h3>
        <p className="text-gray-400 text-sm mb-4">Únete a la red más exclusiva de criadores éticos en el país.</p>
        <button className="bg-white text-gray-900 px-6 py-2 rounded-lg font-bold text-sm">
          Registrar mi criadero
        </button>
      </section>
    </div>
  );
};

export default HomeView;
