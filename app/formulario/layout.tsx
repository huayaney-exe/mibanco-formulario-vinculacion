'use client';

import { type ReactNode } from 'react';

interface FormularioLayoutProps {
  children: ReactNode;
}

export default function FormularioLayout({ children }: FormularioLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {children}
    </div>
  );
}
