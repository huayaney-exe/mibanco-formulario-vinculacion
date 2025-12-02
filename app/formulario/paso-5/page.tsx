'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFormStore } from '@/lib/store';
import { WizardHeader } from '@/components/wizard/WizardHeader';
import { StepNavigation } from '@/components/wizard/StepNavigation';
import { SectionCard } from '@/components/form/SectionCard';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { YesNoToggle } from '@/components/form/YesNoToggle';
import { CurrencyInput } from '@/components/form/CurrencyInput';
import { tipoOperacionMonedaExtranjeraOptions } from '@/data/options';

export default function Paso5Page() {
  const router = useRouter();
  const {
    form,
    setInformacionPEP,
    setOperacionesMonedaExtranjera,
    setInformacionTributaria,
    setCurrentStep,
    markStepComplete,
  } = useFormStore();

  const { informacionPEP, operacionesMonedaExtranjera, informacionTributaria } = form;

  useEffect(() => {
    setCurrentStep(5);
  }, [setCurrentStep]);

  const handleNext = () => {
    markStepComplete(5);
    router.push('/formulario/paso-6');
  };

  const handleTipoOperacionChange = (value: string, checked: boolean) => {
    const current = operacionesMonedaExtranjera.tiposOperacion || [];
    if (checked) {
      setOperacionesMonedaExtranjera({ tiposOperacion: [...current, value] });
    } else {
      setOperacionesMonedaExtranjera({ tiposOperacion: current.filter((t) => t !== value) });
    }
  };

  // Check if any PEP question is yes
  const isPEP =
    informacionPEP.administraRecursosPublicos ||
    informacionPEP.esReconocidoPublicamente ||
    informacionPEP.desempenaCargosPublicos ||
    informacionPEP.esPEPExtranjero ||
    informacionPEP.esRepresentanteLegalInternacional ||
    informacionPEP.familiarEsPEP;

  return (
    <>
      <WizardHeader currentStep={5} />

      <main className="px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* PEP - Personas Expuestas Políticamente */}
          <SectionCard title="Persona Expuesta Políticamente (PEP)">
            <div className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                Por favor responda las siguientes preguntas relacionadas con su exposición política:
              </p>

              <YesNoToggle
                label="¿Administra recursos públicos?"
                value={informacionPEP.administraRecursosPublicos}
                onChange={(value) => setInformacionPEP({ administraRecursosPublicos: value })}
              />

              <YesNoToggle
                label="¿Es reconocido(a) públicamente?"
                value={informacionPEP.esReconocidoPublicamente}
                onChange={(value) => setInformacionPEP({ esReconocidoPublicamente: value })}
              />

              <YesNoToggle
                label="¿Desempeña o ha desempeñado cargos públicos?"
                value={informacionPEP.desempenaCargosPublicos}
                onChange={(value) => setInformacionPEP({ desempenaCargosPublicos: value })}
              />

              <YesNoToggle
                label="¿Es PEP extranjero?"
                value={informacionPEP.esPEPExtranjero}
                onChange={(value) => setInformacionPEP({ esPEPExtranjero: value })}
              />

              <YesNoToggle
                label="¿Es representante legal de organización internacional?"
                value={informacionPEP.esRepresentanteLegalInternacional}
                onChange={(value) =>
                  setInformacionPEP({ esRepresentanteLegalInternacional: value })
                }
              />

              <YesNoToggle
                label="¿Tiene familiar que sea PEP?"
                value={informacionPEP.familiarEsPEP}
                onChange={(value) => setInformacionPEP({ familiarEsPEP: value })}
              />

              {isPEP && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Nota:</strong> Al indicar que es PEP, se requerirá documentación
                    adicional para completar su vinculación.
                  </p>
                </div>
              )}
            </div>
          </SectionCard>

          {/* Operaciones en Moneda Extranjera */}
          <SectionCard title="Operaciones en Moneda Extranjera">
            <div className="space-y-4">
              <YesNoToggle
                label="¿Realiza operaciones en moneda extranjera?"
                value={operacionesMonedaExtranjera.realizaOperaciones}
                onChange={(value) =>
                  setOperacionesMonedaExtranjera({ realizaOperaciones: value })
                }
              />

              {operacionesMonedaExtranjera.realizaOperaciones && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de operaciones
                    </label>
                    <div className="space-y-2">
                      {tipoOperacionMonedaExtranjeraOptions.map((option) => (
                        <Checkbox
                          key={option.value}
                          label={option.label}
                          checked={operacionesMonedaExtranjera.tiposOperacion?.includes(
                            option.value
                          )}
                          onChange={(e) =>
                            handleTipoOperacionChange(option.value, e.target.checked)
                          }
                        />
                      ))}
                    </div>
                  </div>

                  {operacionesMonedaExtranjera.tiposOperacion?.includes('otra') && (
                    <Input
                      label="Especifique otra operación"
                      name="otraOperacion"
                      value={operacionesMonedaExtranjera.otraOperacion}
                      onChange={(e) =>
                        setOperacionesMonedaExtranjera({ otraOperacion: e.target.value })
                      }
                    />
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="País"
                      name="paisOperacion"
                      value={operacionesMonedaExtranjera.pais}
                      onChange={(e) => setOperacionesMonedaExtranjera({ pais: e.target.value })}
                    />
                    <Input
                      label="Ciudad"
                      name="ciudadOperacion"
                      value={operacionesMonedaExtranjera.ciudad}
                      onChange={(e) => setOperacionesMonedaExtranjera({ ciudad: e.target.value })}
                    />
                  </div>

                  <Input
                    label="Moneda"
                    name="moneda"
                    value={operacionesMonedaExtranjera.moneda}
                    onChange={(e) => setOperacionesMonedaExtranjera({ moneda: e.target.value })}
                    hint="Ej: USD, EUR, etc."
                  />
                </>
              )}

              <YesNoToggle
                label="¿Tiene productos financieros en el exterior?"
                value={operacionesMonedaExtranjera.tieneProductos}
                onChange={(value) => setOperacionesMonedaExtranjera({ tieneProductos: value })}
              />

              {operacionesMonedaExtranjera.tieneProductos && (
                <>
                  <Input
                    label="Tipo de producto"
                    name="tipoProducto"
                    value={operacionesMonedaExtranjera.tipoProducto}
                    onChange={(e) =>
                      setOperacionesMonedaExtranjera({ tipoProducto: e.target.value })
                    }
                    hint="Ej: Cuenta de ahorros, inversión, etc."
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="País del producto"
                      name="paisProducto"
                      value={operacionesMonedaExtranjera.paisProducto}
                      onChange={(e) =>
                        setOperacionesMonedaExtranjera({ paisProducto: e.target.value })
                      }
                    />
                    <Input
                      label="Número de producto"
                      name="numeroProducto"
                      value={operacionesMonedaExtranjera.numeroProducto}
                      onChange={(e) =>
                        setOperacionesMonedaExtranjera({ numeroProducto: e.target.value })
                      }
                    />
                  </div>

                  <CurrencyInput
                    label="Monto/Cupo (en moneda local)"
                    name="montoCupo"
                    value={operacionesMonedaExtranjera.montoCupo}
                    onChange={(value) => setOperacionesMonedaExtranjera({ montoCupo: value })}
                  />
                </>
              )}
            </div>
          </SectionCard>

          {/* Información Tributaria */}
          <SectionCard title="Información Tributaria">
            <div className="space-y-4">
              <YesNoToggle
                label="¿Es declarante de renta?"
                value={informacionTributaria.esDeclaranteRenta}
                onChange={(value) => setInformacionTributaria({ esDeclaranteRenta: value })}
              />

              <Input
                label="País de residencia fiscal (si es diferente a Colombia)"
                name="paisResidenciaFiscal"
                value={informacionTributaria.paisResidenciaFiscal}
                onChange={(e) =>
                  setInformacionTributaria({ paisResidenciaFiscal: e.target.value })
                }
                hint="Dejar vacío si su residencia fiscal es Colombia"
              />

              {informacionTributaria.paisResidenciaFiscal && (
                <Input
                  label="Número de identificación tributaria (TIN)"
                  name="numeroTIN"
                  value={informacionTributaria.numeroTIN}
                  onChange={(e) => setInformacionTributaria({ numeroTIN: e.target.value })}
                  hint="Número de identificación fiscal en el país de residencia"
                />
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Documentos soporte adjuntos
                </label>
                <div className="space-y-2">
                  <Checkbox
                    label="Declaración de renta"
                    checked={informacionTributaria.soporteAdjunto?.includes('declaracion_renta')}
                    onChange={(e) => {
                      const current = informacionTributaria.soporteAdjunto || [];
                      if (e.target.checked) {
                        setInformacionTributaria({
                          soporteAdjunto: [...current, 'declaracion_renta'],
                        });
                      } else {
                        setInformacionTributaria({
                          soporteAdjunto: current.filter((s) => s !== 'declaracion_renta'),
                        });
                      }
                    }}
                  />
                  <Checkbox
                    label="Certificado de ingresos"
                    checked={informacionTributaria.soporteAdjunto?.includes('certificado_ingresos')}
                    onChange={(e) => {
                      const current = informacionTributaria.soporteAdjunto || [];
                      if (e.target.checked) {
                        setInformacionTributaria({
                          soporteAdjunto: [...current, 'certificado_ingresos'],
                        });
                      } else {
                        setInformacionTributaria({
                          soporteAdjunto: current.filter((s) => s !== 'certificado_ingresos'),
                        });
                      }
                    }}
                  />
                  <Checkbox
                    label="Extractos bancarios"
                    checked={informacionTributaria.soporteAdjunto?.includes('extractos_bancarios')}
                    onChange={(e) => {
                      const current = informacionTributaria.soporteAdjunto || [];
                      if (e.target.checked) {
                        setInformacionTributaria({
                          soporteAdjunto: [...current, 'extractos_bancarios'],
                        });
                      } else {
                        setInformacionTributaria({
                          soporteAdjunto: current.filter((s) => s !== 'extractos_bancarios'),
                        });
                      }
                    }}
                  />
                  <Checkbox
                    label="Otro soporte"
                    checked={informacionTributaria.soporteAdjunto?.includes('otro')}
                    onChange={(e) => {
                      const current = informacionTributaria.soporteAdjunto || [];
                      if (e.target.checked) {
                        setInformacionTributaria({
                          soporteAdjunto: [...current, 'otro'],
                        });
                      } else {
                        setInformacionTributaria({
                          soporteAdjunto: current.filter((s) => s !== 'otro'),
                        });
                      }
                    }}
                  />
                </div>
              </div>

              {informacionTributaria.soporteAdjunto?.includes('otro') && (
                <Input
                  label="Especifique otro soporte"
                  name="otroSoporte"
                  value={informacionTributaria.otroSoporte}
                  onChange={(e) => setInformacionTributaria({ otroSoporte: e.target.value })}
                />
              )}
            </div>
          </SectionCard>
        </div>
      </main>

      <StepNavigation currentStep={5} totalSteps={6} onNext={handleNext} />
    </>
  );
}
