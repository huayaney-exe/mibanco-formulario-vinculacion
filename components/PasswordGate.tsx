'use client';

import { useState, useEffect, FormEvent } from 'react';
import Image from 'next/image';

const CONFIG = {
  password: 'MBC',
  storageKey: 'mibanco_formulario_auth',
};

interface PasswordGateProps {
  children: React.ReactNode;
}

export function PasswordGate({ children }: PasswordGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    // Check if already authenticated
    const auth = sessionStorage.getItem(CONFIG.storageKey);
    setIsAuthenticated(auth === 'true');
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const enteredPassword = password.trim();

    if (enteredPassword === CONFIG.password) {
      sessionStorage.setItem(CONFIG.storageKey, 'true');
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setPassword('');
    }
  };

  // Loading state
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[var(--mibanco-green)] flex items-center justify-center">
        <div className="animate-pulse">
          <Image
            src="/logo-dkbg-mb.svg"
            alt="MIBANCO"
            width={160}
            height={50}
            className="h-12 w-auto"
            priority
          />
        </div>
      </div>
    );
  }

  // Show content if authenticated
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Password gate
  return (
    <div className="min-h-screen bg-[var(--mibanco-green)] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        <div className="text-center mb-8">
          <div className="mb-6 flex justify-center">
            <div className="bg-[var(--mibanco-green)] p-4 rounded-xl">
              <Image
                src="/logo-dkbg-mb.svg"
                alt="MIBANCO Colombia"
                width={140}
                height={45}
                className="h-10 w-auto"
                priority
              />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Formulario de Vinculación
          </h1>
          <p className="text-gray-500">
            Acceso restringido - Ingrese contraseña
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Ingrese contraseña"
              className={`w-full px-4 py-3 border-2 rounded-xl text-center text-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--mibanco-green)] focus:border-transparent ${
                error
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 bg-gray-50'
              } ${isShaking ? 'animate-shake' : ''}`}
              autoFocus
              autoComplete="off"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center font-medium">
              Contraseña incorrecta. Intente de nuevo.
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[var(--mibanco-green)] text-white py-3 px-6 rounded-xl font-semibold text-lg hover:bg-[var(--green-600)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--mibanco-green)]"
          >
            Entrar
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">
            MIBANCO S.A. - NIT 860.025.971-5
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
