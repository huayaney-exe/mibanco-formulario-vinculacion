'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useFormStore } from '@/lib/store';
import { ProgressBar } from './ProgressBar';

const STEPS = [
  { number: 1, name: 'Datos Personales' },
  { number: 2, name: 'Datos Laborales' },
  { number: 3, name: 'Info Financiera' },
  { number: 4, name: 'Producto' },
  { number: 5, name: 'Cumplimiento' },
  { number: 6, name: 'Autorizaciones' },
];

interface WizardHeaderProps {
  currentStep: number;
}

export function WizardHeader({ currentStep }: WizardHeaderProps) {
  const { metadata } = useFormStore();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      {/* Top bar with logo */}
      <div className="bg-[var(--mibanco-green)] px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-dkbg-mb.svg"
              alt="MIBANCO"
              width={120}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </Link>
          <span className="text-white/80 text-sm">Formulario de Vinculación</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-4 py-4">
        <div className="max-w-2xl mx-auto">
          <ProgressBar
            steps={STEPS}
            currentStep={currentStep}
            completedSteps={metadata.completedSteps}
          />
        </div>
      </div>
    </header>
  );
}

export { STEPS };
