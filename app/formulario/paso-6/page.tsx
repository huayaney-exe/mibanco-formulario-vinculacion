'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFormStore } from '@/lib/store';
import { WizardHeader } from '@/components/wizard/WizardHeader';
import { StepNavigation } from '@/components/wizard/StepNavigation';
import { SectionCard } from '@/components/form/SectionCard';
import { Checkbox } from '@/components/ui/Checkbox';
import { YesNoToggle } from '@/components/form/YesNoToggle';
import { tipoDiscapacidadOptions } from '@/data/options';

export default function Paso6Page() {
  const router = useRouter();
  const {
    form,
    setEvaluacionAmbiental,
    setCondicionEspecial,
    setAutorizaciones,
    setCurrentStep,
    markStepComplete,
  } = useFormStore();

  const { evaluacionAmbiental, condicionEspecial, autorizaciones } = form;

  useEffect(() => {
    setCurrentStep(6);
  }, [setCurrentStep]);

  const handleNext = () => {
    markStepComplete(6);
    router.push('/formulario/resumen');
  };

  const handleDiscapacidadChange = (value: string, checked: boolean) => {
    const current = condicionEspecial.tiposDiscapacidad || [];
    if (checked) {
      setCondicionEspecial({ tiposDiscapacidad: [...current, value] });
    } else {
      setCondicionEspecial({ tiposDiscapacidad: current.filter((t) => t !== value) });
    }
  };

  // Check if all required authorizations are checked
  const allAuthorizationsComplete =
    autorizaciones.autorizaCentrales &&
    autorizaciones.autorizaTratamientoDatos &&
    autorizaciones.confirmaRecepcionInfo &&
    autorizaciones.aceptaCompromisoActualizacion;

  return (
    <>
      <WizardHeader currentStep={6} />

      <main className="px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Evaluación Ambiental */}
          <SectionCard title="Evaluación Ambiental y Social">
            <div className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                Por favor indique si su actividad económica presenta alguna de las siguientes
                características:
              </p>

              <YesNoToggle
                label="¿Su actividad genera impacto ambiental significativo?"
                value={evaluacionAmbiental.generaImpacto}
                onChange={(value) => setEvaluacionAmbiental({ generaImpacto: value })}
              />

              <YesNoToggle
                label="¿Requiere permisos ambientales para operar?"
                value={evaluacionAmbiental.necesitaPermiso}
                onChange={(value) => setEvaluacionAmbiental({ necesitaPermiso: value })}
              />

              <YesNoToggle
                label="¿Involucra estrategias de sostenibilidad ambiental?"
                value={evaluacionAmbiental.involucraEstrategias}
                onChange={(value) => setEvaluacionAmbiental({ involucraEstrategias: value })}
              />

              {(evaluacionAmbiental.generaImpacto || evaluacionAmbiental.necesitaPermiso) && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Nota:</strong> Se podrá requerir documentación adicional relacionada con
                    permisos ambientales y plan de manejo ambiental.
                  </p>
                </div>
              )}
            </div>
          </SectionCard>

          {/* Condición Especial */}
          <SectionCard title="Condición Especial">
            <div className="space-y-4">
              <YesNoToggle
                label="¿Tiene algún tipo de discapacidad?"
                value={condicionEspecial.tieneDiscapacidad}
                onChange={(value) => setCondicionEspecial({ tieneDiscapacidad: value })}
              />

              {condicionEspecial.tieneDiscapacidad && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de discapacidad
                  </label>
                  <div className="space-y-2">
                    {tipoDiscapacidadOptions.map((option) => (
                      <Checkbox
                        key={option.value}
                        label={option.label}
                        checked={condicionEspecial.tiposDiscapacidad?.includes(option.value)}
                        onChange={(e) => handleDiscapacidadChange(option.value, e.target.checked)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </SectionCard>

          {/* Autorizaciones */}
          <SectionCard title="Autorizaciones y Declaraciones">
            <div className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                Por favor lea y acepte las siguientes autorizaciones para continuar:
              </p>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <Checkbox
                    label="Autorizo la consulta y reporte en centrales de riesgo"
                    checked={autorizaciones.autorizaCentrales}
                    onChange={(e) => setAutorizaciones({ autorizaCentrales: e.target.checked })}
                  />
                  <p className="text-xs text-gray-500 mt-1 ml-6">
                    Autorizo a MIBANCO Colombia S.A. para que consulte, reporte, procese y divulgue
                    mi información en las centrales de información financiera (CIFIN, Datacrédito,
                    etc.)
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <Checkbox
                    label="Autorizo el tratamiento de datos personales"
                    checked={autorizaciones.autorizaTratamientoDatos}
                    onChange={(e) =>
                      setAutorizaciones({ autorizaTratamientoDatos: e.target.checked })
                    }
                  />
                  <p className="text-xs text-gray-500 mt-1 ml-6">
                    Autorizo el tratamiento de mis datos personales de acuerdo con la política de
                    privacidad de MIBANCO Colombia S.A.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <Checkbox
                    label="Confirmo la recepción de información sobre productos"
                    checked={autorizaciones.confirmaRecepcionInfo}
                    onChange={(e) =>
                      setAutorizaciones({ confirmaRecepcionInfo: e.target.checked })
                    }
                  />
                  <p className="text-xs text-gray-500 mt-1 ml-6">
                    Confirmo haber recibido información clara y suficiente sobre el producto
                    solicitado, incluyendo tasas, comisiones y condiciones.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <Checkbox
                    label="Autorizo la destrucción de documentos"
                    checked={autorizaciones.autorizaDestruccionDocumentos}
                    onChange={(e) =>
                      setAutorizaciones({ autorizaDestruccionDocumentos: e.target.checked })
                    }
                  />
                  <p className="text-xs text-gray-500 mt-1 ml-6">
                    Autorizo la destrucción de documentos originales entregados una vez escaneados y
                    archivados digitalmente.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <Checkbox
                    label="Acepto el compromiso de actualización de datos"
                    checked={autorizaciones.aceptaCompromisoActualizacion}
                    onChange={(e) =>
                      setAutorizaciones({ aceptaCompromisoActualizacion: e.target.checked })
                    }
                  />
                  <p className="text-xs text-gray-500 mt-1 ml-6">
                    Me comprometo a mantener actualizada mi información personal y financiera con
                    MIBANCO Colombia S.A.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <Checkbox
                    label="Acepto las condiciones del Fondo Nacional de Garantías"
                    checked={autorizaciones.aceptaFondosGarantias}
                    onChange={(e) =>
                      setAutorizaciones({ aceptaFondosGarantias: e.target.checked })
                    }
                  />
                  <p className="text-xs text-gray-500 mt-1 ml-6">
                    Si aplica, acepto las condiciones y coberturas del Fondo Nacional de Garantías
                    (FNG) o USAID para mi crédito.
                  </p>
                </div>
              </div>

              {!allAuthorizationsComplete && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Advertencia:</strong> Debe aceptar las autorizaciones marcadas con * para
                    poder continuar con el proceso de vinculación.
                  </p>
                </div>
              )}
            </div>
          </SectionCard>

          {/* Legal Declaration */}
          <SectionCard title="Declaración Juramentada">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                Declaro bajo la gravedad de juramento que la información suministrada es veraz,
                completa y verificable, que mis recursos no provienen de actividades ilícitas de las
                contempladas en el Código Penal Colombiano, y autorizo a MIBANCO Colombia S.A. para
                verificar la información aquí consignada.
              </p>
              <p className="text-sm text-gray-700 mt-3">
                Igualmente certifico que la información aquí registrada fue diligenciada por mí o
                bajo mi dirección y corresponde a mi situación actual.
              </p>
            </div>
          </SectionCard>
        </div>
      </main>

      <StepNavigation
        currentStep={6}
        totalSteps={6}
        onNext={handleNext}
        nextLabel="Revisar y Finalizar"
      />
    </>
  );
}
