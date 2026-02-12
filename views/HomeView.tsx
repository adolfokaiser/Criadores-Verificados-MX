
import React, { useEffect, useState } from 'react';
import { Search, ShieldCheck, Heart, MessageSquare, ShieldAlert, HelpCircle, Dna, ArrowRight } from 'lucide-react';
import { api } from '../services/api';
import { Article } from '../types';

interface HomeViewProps {
  onSearch: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onSearch }) => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    api.getArticles().then(setArticles);
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert': return <ShieldAlert size={20} className="text-red-500" />;
      case 'HelpCircle': return <HelpCircle size={20} className="text-blue-500" />;
      case 'Dna': return <Dna size={20} className="text-purple-500" />;
      default: return <ShieldCheck size={20} className="text-green-500" />;
    }
  };

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
          <h2 className="text-3xl font-extrabold mb-2">Tu mejor amigo te espera aquí</h2>
          <p className="text-gray-200 text-sm mb-6">Encuentra criadores éticos y verificados en todo México.</p>
          <button 
            onClick={onSearch}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 mx-auto transition-transform active:scale-95"
          >
            <Search size={20} />
            Explorar Directorio
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-10 space-y-8">
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
            <MessageSquare size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Trato directo</h3>
            <p className="text-sm text-gray-500">Habla directamente con los criadores a través de nuestra app.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Criaderos de alta reputación</h3>
            <p className="text-sm text-gray-500">Conecta con criaderos serios, éticos y legales. Evita los miles de fraudes en línea, los criaderos clandestinos, y las "fábricas de cachorros"</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center shrink-0">
            <Heart size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Amor por los animales</h3>
            <p className="text-sm text-gray-500">Lo más importante para nosotros es el bienestar animal. Encuentra solo criadores responsables y canófilos serios.</p>
          </div>
        </div>
      </section>

      {/* Guías Educativas */}
      <section className="px-6 pb-10">
        <h3 className="font-bold text-gray-800 text-lg mb-4">Guías para compra responsable</h3>
        <div className="grid grid-cols-1 gap-4">
          {articles.map(art => (
            <div key={art.id} className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm flex items-center gap-4 active:scale-[0.98] transition-all">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                {getIcon(art.icono)}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm text-gray-800">{art.titulo}</h4>
                <p className="text-[10px] text-gray-500 leading-tight">{art.resumen}</p>
              </div>
              <ArrowRight size={16} className="text-gray-300" />
            </div>
          ))}
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
