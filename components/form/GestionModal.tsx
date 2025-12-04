'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { X, Smartphone, CheckCircle, Loader2, ArrowRight, FileText, Home } from 'lucide-react';

interface GestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  celular: string;
  nombreCliente: string;
}

type ModalStep = 'confirm' | 'loading' | 'success';

export function GestionModal({
  isOpen,
  onClose,
  onConfirm,
  celular,
  nombreCliente,
}: GestionModalProps) {
  const [step, setStep] = useState<ModalStep>('confirm');
  const [numeroRadicacion, setNumeroRadicacion] = useState('');

  if (!isOpen) return null;

  const formatPhone = (phone: string) => {
    if (!phone) return '***-***-****';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length >= 10) {
      return `***-***-${cleaned.slice(-4)}`;
    }
    return `***-***-${cleaned.slice(-4) || '****'}`;
  };

  const handleConfirm = async () => {
    setStep('loading');

    // Simular envío (en producción esto llamaría al backend)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generar número de radicación
    const radicacion = `VIN-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 999999)).padStart(6, '0')}`;
    setNumeroRadicacion(radicacion);

    onConfirm();
    setStep('success');
  };

  const handleClose = () => {
    setStep('confirm');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={step === 'confirm' ? handleClose : undefined}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Confirm Step */}
        {step === 'confirm' && (
          <>
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 rounded-full p-2">
                    <Smartphone className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-lg font-semibold text-white">
                    Validación de Firma Digital
                  </h2>
                </div>
                <button
                  onClick={handleClose}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <p className="text-gray-600">
                Se enviará un enlace de validación biométrica al cliente vía WhatsApp.
              </p>

              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h3 className="font-medium text-gray-900">Una vez autenticada la firma:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="bg-green-100 text-green-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                    <span className="text-gray-600 text-sm">
                      El caso pasará al <strong>Gerente de Agencia</strong> para revisión y aprobación
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-green-100 text-green-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                    <span className="text-gray-600 text-sm">
                      Tras la aprobación, el <strong>Equipo de Operaciones</strong> procesará el desembolso
                    </span>
                  </li>
                </ul>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-gray-500 mb-1">Número de WhatsApp del cliente:</p>
                <p className="font-mono text-lg font-medium text-gray-900">
                  +57 {formatPhone(celular)}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 flex gap-3">
              <Button
                variant="outline"
                onClick={handleClose}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleConfirm}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Confirmar y Enviar
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </>
        )}

        {/* Loading Step */}
        {step === 'loading' && (
          <div className="p-12 text-center">
            <Loader2 className="w-16 h-16 text-green-600 animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Enviando solicitud...
            </h3>
            <p className="text-gray-500">
              Por favor espere mientras procesamos su solicitud
            </p>
          </div>
        )}

        {/* Success Step */}
        {step === 'success' && (
          <>
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-8 text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-white mb-1">
                Solicitud Enviada
              </h2>
              <p className="text-green-100 text-sm">
                El proceso de validación ha iniciado
              </p>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <p className="text-sm text-green-700 mb-1">Número de radicación:</p>
                <p className="font-mono text-xl font-bold text-green-800">
                  {numeroRadicacion}
                </p>
              </div>

              <p className="text-gray-600 text-sm text-center">
                Se ha enviado el enlace de validación al número:<br />
                <span className="font-medium">+57 {formatPhone(celular)}</span>
              </p>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">
                  El cliente <strong>{nombreCliente}</strong> recibirá un mensaje de WhatsApp
                  con instrucciones para completar la validación biométrica.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 flex gap-3">
              <Button
                variant="outline"
                onClick={handleClose}
                className="flex-1"
              >
                <FileText className="w-4 h-4 mr-2" />
                Descargar PDF
              </Button>
              <Button
                onClick={() => window.location.href = '/'}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <Home className="w-4 h-4 mr-2" />
                Volver al Inicio
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
