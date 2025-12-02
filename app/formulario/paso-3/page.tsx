'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFormStore } from '@/lib/store';
import { WizardHeader } from '@/components/wizard/WizardHeader';
import { StepNavigation } from '@/components/wizard/StepNavigation';
import { SectionCard } from '@/components/form/SectionCard';
import { CurrencyInput } from '@/components/form/CurrencyInput';
import { Checkbox } from '@/components/ui/Checkbox';
import { Input } from '@/components/ui/Input';
import { origenFondosOptions } from '@/data/options';
import { calculateCapacidadPago } from '@/lib/utils';

export default function Paso3Page() {
  const router = useRouter();
  const {
    form,
    setOrigenFondos,
    setInformacionFinanciera,
    setCurrentStep,
    markStepComplete,
  } = useFormStore();

  const { origenFondos, informacionFinanciera, datosPersonales } = form;
  const isIndependiente = datosPersonales.ocupacion === 'independiente';

  useEffect(() => {
    setCurrentStep(3);
  }, [setCurrentStep]);

  // Auto-calculate capacidad de pago
  useEffect(() => {
    const capacidadPago = calculateCapacidadPago(
      informacionFinanciera.ingresosMensuales,
      informacionFinanciera.costoVentas,
      informacionFinanciera.gastosOperativos,
      informacionFinanciera.otrosIngresos,
      informacionFinanciera.egresosMensuales
    );
    setInformacionFinanciera({ capacidadPago });
  }, [
    informacionFinanciera.ingresosMensuales,
    informacionFinanciera.costoVentas,
    informacionFinanciera.gastosOperativos,
    informacionFinanciera.otrosIngresos,
    informacionFinanciera.egresosMensuales,
    setInformacionFinanciera,
  ]);

  const handleNext = () => {
    markStepComplete(3);
    router.push('/formulario/paso-4');
  };

  const handleOrigenChange = (value: string, checked: boolean) => {
    const current = origenFondos.origenes || [];
    if (checked) {
      setOrigenFondos({ origenes: [...current, value] });
    } else {
      setOrigenFondos({ origenes: current.filter((o) => o !== value) });
    }
  };

  return (
    <>
      <WizardHeader currentStep={3} />

      <main className="px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Origen de Fondos */}
          <SectionCard title="Origen de los Fondos">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ¿Cuál es el origen de sus fondos? *
                </label>
                <div className="space-y-2">
                  {origenFondosOptions.map((option) => (
                    <Checkbox
                      key={option.value}
                      label={option.label}
                      checked={origenFondos.origenes?.includes(option.value)}
                      onChange={(e) => handleOrigenChange(option.value, e.target.checked)}
                    />
                  ))}
                </div>
              </div>

              {origenFondos.origenes?.includes('otros') && (
                <Input
                  label="Especifique otro origen"
                  name="otroOrigen"
                  value={origenFondos.otroOrigen}
                  onChange={(e) => setOrigenFondos({ otroOrigen: e.target.value })}
                />
              )}

              <Input
                label="Complemento de ingresos (si aplica)"
                name="complementoIngresos"
                value={origenFondos.complementoIngresos}
                onChange={(e) => setOrigenFondos({ complementoIngresos: e.target.value })}
                hint="Ej: Arriendo de propiedad, pensión, etc."
              />
            </div>
          </SectionCard>

          {/* Información Financiera */}
          <SectionCard title="Información Financiera Mensual">
            <div className="space-y-4">
              <CurrencyInput
                label={isIndependiente ? 'Ventas/Ingresos Mensuales' : 'Ingresos Mensuales'}
                name="ingresosMensuales"
                value={informacionFinanciera.ingresosMensuales}
                onChange={(value) => setInformacionFinanciera({ ingresosMensuales: value })}
                required
              />

              {isIndependiente && (
                <>
                  <CurrencyInput
                    label="Costo de Ventas"
                    name="costoVentas"
                    value={informacionFinanciera.costoVentas}
                    onChange={(value) => setInformacionFinanciera({ costoVentas: value })}
                    hint="Costo de la mercancía o materia prima"
                  />

                  <CurrencyInput
                    label="Gastos Operativos"
                    name="gastosOperativos"
                    value={informacionFinanciera.gastosOperativos}
                    onChange={(value) => setInformacionFinanciera({ gastosOperativos: value })}
                    hint="Arriendo, servicios, empleados, etc."
                  />
                </>
              )}

              <CurrencyInput
                label="Otros Ingresos"
                name="otrosIngresos"
                value={informacionFinanciera.otrosIngresos}
                onChange={(value) => setInformacionFinanciera({ otrosIngresos: value })}
              />

              {informacionFinanciera.otrosIngresos > 0 && (
                <Input
                  label="Detalle de otros ingresos"
                  name="detalleOtrosIngresos"
                  value={informacionFinanciera.detalleOtrosIngresos}
                  onChange={(e) =>
                    setInformacionFinanciera({ detalleOtrosIngresos: e.target.value })
                  }
                />
              )}

              <CurrencyInput
                label="Egresos Mensuales"
                name="egresosMensuales"
                value={informacionFinanciera.egresosMensuales}
                onChange={(value) => setInformacionFinanciera({ egresosMensuales: value })}
                hint="Gastos personales y familiares"
                required
              />

              {/* Capacidad de Pago - Calculated */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-green-800">Capacidad de Pago:</span>
                  <span className="text-lg font-bold text-green-700">
                    ${informacionFinanciera.capacidadPago.toLocaleString('es-CO')}
                  </span>
                </div>
                <p className="text-xs text-green-600 mt-1">
                  {isIndependiente
                    ? 'Ingresos - Costos - Gastos Operativos + Otros Ingresos - Egresos'
                    : 'Ingresos + Otros Ingresos - Egresos'}
                </p>
              </div>
            </div>
          </SectionCard>

          {/* Activos y Pasivos */}
          <SectionCard title="Patrimonio">
            <div className="space-y-4">
              <CurrencyInput
                label="Total Activos"
                name="totalActivos"
                value={informacionFinanciera.totalActivos}
                onChange={(value) => setInformacionFinanciera({ totalActivos: value })}
                hint="Casa, vehículo, inventario, efectivo, etc."
              />

              <CurrencyInput
                label="Total Pasivos"
                name="totalPasivos"
                value={informacionFinanciera.totalPasivos}
                onChange={(value) => setInformacionFinanciera({ totalPasivos: value })}
                hint="Deudas con bancos, proveedores, etc."
              />

              {/* Patrimonio - Calculated */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Patrimonio:</span>
                  <span className="text-lg font-bold text-gray-900">
                    $
                    {(
                      informacionFinanciera.totalActivos - informacionFinanciera.totalPasivos
                    ).toLocaleString('es-CO')}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Total Activos - Total Pasivos</p>
              </div>

              {isIndependiente && (
                <CurrencyInput
                  label="Ventas Brutas Anuales"
                  name="ventasBrutasAnuales"
                  value={informacionFinanciera.ventasBrutasAnuales}
                  onChange={(value) => setInformacionFinanciera({ ventasBrutasAnuales: value })}
                  hint="Ventas totales del último año"
                />
              )}
            </div>
          </SectionCard>
        </div>
      </main>

      <StepNavigation currentStep={3} totalSteps={6} onNext={handleNext} />
    </>
  );
}
