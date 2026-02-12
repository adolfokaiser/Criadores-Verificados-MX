import React, { useState } from 'react';
import { api } from '../services/api';
import { User } from '../types';
import { LogIn, Info } from 'lucide-react';

interface LoginViewProps {
  onSuccess: (user: User) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError('');
    const user = await api.login(email);
    setLoading(false);

    if (user) {
      onSuccess(user);
    } else {
      setError('Credenciales no encontradas para el demo.');
    }
  };

  return (
    <div className="p-8 h-full flex flex-col justify-center animate-in fade-in duration-500">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">Bienvenido</h2>
        <p className="text-gray-500 mt-2">Ingresa a tu cuenta profesional de criador o comprador.</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            placeholder="ejemplo@email.com"
          />
        </div>
        
        {error && <p className="text-red-500 text-xs font-medium">{error}</p>}

        <button 
          type="submit"
          disabled={loading || !email}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? 'Entrando...' : (
            <>
              <LogIn size={18} /> Continuar
            </>
          )}
        </button>
      </form>

      <div className="mt-12 bg-green-50 p-4 rounded-xl space-y-2">
        <div className="flex items-center gap-2 text-green-700 font-bold text-sm mb-1">
          <Info size={16} /> Credenciales Demo:
        </div>
        <ul className="text-xs text-green-600 space-y-1 font-medium">
          <li>• comprador@example.com</li>
          <li>• criador@example.com</li>
          <li>• admin@criadores.mx</li>
        </ul>
      </div>
    </div>
  );
};

export default LoginView;