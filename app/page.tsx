'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFormStore } from '@/lib/store';
import { Button } from '@/components/ui/Button';
import { FileText, Clock, ArrowRight, RotateCcw } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { metadata, resetForm } = useFormStore();
  const [hasDraft, setHasDraft] = useState(false);

  useEffect(() => {
    // Check if there's saved progress
    if (metadata.completedSteps.length > 0 || metadata.currentStep > 1) {
      setHasDraft(true);
    }
  }, [metadata]);

  const handleStart = () => {
    router.push('/formulario/paso-1');
  };

  const handleContinue = () => {
    router.push(`/formulario/paso-${metadata.currentStep}`);
  };

  const handleReset = () => {
    if (confirm('¿Está seguro que desea iniciar un formulario nuevo? Se perderá el progreso guardado.')) {
      resetForm();
      router.push('/formulario/paso-1');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[var(--mibanco-green)] px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[var(--mibanco-yellow)] rounded-full flex items-center justify-center">
              <span className="text-[var(--mibanco-green)] font-bold text-xl">M</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-xl">MIBANCO</h1>
              <p className="text-white/80 text-sm">Colombia</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Hero Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-[var(--mibanco-green)] to-[var(--green-600)] px-6 py-8">
              <FileText className="w-12 h-12 text-[var(--mibanco-yellow)] mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">
                Formulario de Vinculación
              </h2>
              <p className="text-white/90">
                Complete su solicitud de productos MIBANCO
              </p>
            </div>

            <div className="p-6">
              {/* Info boxes */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <Clock className="w-6 h-6 text-[var(--mibanco-green)] mb-2" />
                  <p className="text-sm font-medium text-gray-900">Tiempo estimado</p>
                  <p className="text-sm text-gray-500">10-15 minutos</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <FileText className="w-6 h-6 text-[var(--mibanco-green)] mb-2" />
                  <p className="text-sm font-medium text-gray-900">6 secciones</p>
                  <p className="text-sm text-gray-500">Paso a paso</p>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--green-50)] flex items-center justify-center">
                    <svg className="w-4 h-4 text-[var(--mibanco-green)]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">Su progreso se guarda automáticamente</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--green-50)] flex items-center justify-center">
                    <svg className="w-4 h-4 text-[var(--mibanco-green)]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">Descargue su formulario en PDF al finalizar</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--green-50)] flex items-center justify-center">
                    <svg className="w-4 h-4 text-[var(--mibanco-green)]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">Validación flexible - corrija después si es necesario</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                {hasDraft ? (
                  <>
                    <Button
                      onClick={handleContinue}
                      className="w-full flex items-center justify-center gap-2"
                    >
                      Continuar donde lo dejé
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleReset}
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Iniciar nuevo formulario
                    </Button>
                    <p className="text-center text-sm text-gray-500">
                      Paso {metadata.currentStep} de 6 • {metadata.completedSteps.length} secciones completadas
                    </p>
                  </>
                ) : (
                  <Button
                    onClick={handleStart}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    Comenzar
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="mt-6 bg-white rounded-xl p-5 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Documentos que necesitará</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-[var(--mibanco-green)]">•</span>
                Documento de identidad (C.C., C.E., o Pasaporte)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--mibanco-green)]">•</span>
                Información de ingresos y egresos mensuales
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--mibanco-green)]">•</span>
                Datos de contacto (celular y correo electrónico)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--mibanco-green)]">•</span>
                Información del negocio (si aplica)
              </li>
            </ul>
          </div>

          {/* Footer info */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>MIBANCO S.A. - NIT 860.025.971-5</p>
            <p className="mt-1">Formulario V3.7 - Versión Digital</p>
          </div>
        </div>
      </main>
    </div>
  );
}
