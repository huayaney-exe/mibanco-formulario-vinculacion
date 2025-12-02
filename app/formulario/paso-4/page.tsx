'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFormStore } from '@/lib/store';
import { WizardHeader } from '@/components/wizard/WizardHeader';
import { StepNavigation } from '@/components/wizard/StepNavigation';
import { SectionCard } from '@/components/form/SectionCard';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { YesNoToggle } from '@/components/form/YesNoToggle';
import { CurrencyInput } from '@/components/form/CurrencyInput';
import {
  modalidadCreditoOptions,
  tipoGarantiaOptions,
  productoMicrocreditoOptions,
  bancosOptions,
} from '@/data/options';

export default function Paso4Page() {
  const router = useRouter();
  const {
    form,
    setProductoSolicitado,
    setGarantias,
    setDebitoAutomatico,
    setDesembolso,
    setCurrentStep,
    markStepComplete,
  } = useFormStore();

  const { productoSolicitado, garantias, debitoAutomatico, desembolso } = form;

  useEffect(() => {
    setCurrentStep(4);
  }, [setCurrentStep]);

  const handleNext = () => {
    markStepComplete(4);
    router.push('/formulario/paso-5');
  };

  return (
    <>
      <WizardHeader currentStep={4} />

      <main className="px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Producto Solicitado */}
          <SectionCard title="Producto Solicitado">
            <div className="space-y-4">
              <RadioGroup
                label="Tipo de producto"
                name="producto"
                options={[
                  { value: 'cuenta_ahorros', label: 'Cuenta de Ahorros' },
                  { value: 'credito', label: 'Crédito' },
                ]}
                value={productoSolicitado.producto || ''}
                onValueChange={(value) =>
                  setProductoSolicitado({ producto: value as 'cuenta_ahorros' | 'credito' })
                }
                orientation="horizontal"
                required
              />

              {productoSolicitado.producto === 'credito' && (
                <>
                  <Select
                    label="Modalidad de crédito"
                    name="modalidadCredito"
                    options={modalidadCreditoOptions}
                    value={productoSolicitado.modalidadCredito || ''}
                    onChange={(e) =>
                      setProductoSolicitado({ modalidadCredito: e.target.value as any })
                    }
                  />

                  <Select
                    label="Tipo de garantía"
                    name="tipoGarantia"
                    options={tipoGarantiaOptions}
                    value={productoSolicitado.tipoGarantia || ''}
                    onChange={(e) => setProductoSolicitado({ tipoGarantia: e.target.value as any })}
                  />

                  <Select
                    label="Producto de microcrédito"
                    name="productoMicrocredito"
                    options={productoMicrocreditoOptions}
                    value={productoSolicitado.productoMicrocredito || ''}
                    onChange={(e) =>
                      setProductoSolicitado({ productoMicrocredito: e.target.value as any })
                    }
                  />
                </>
              )}

              {productoSolicitado.producto === 'cuenta_ahorros' && (
                <Input
                  label="Número de cuenta (si ya tiene)"
                  name="numeroCuenta"
                  value={productoSolicitado.numeroCuenta}
                  onChange={(e) => setProductoSolicitado({ numeroCuenta: e.target.value })}
                  inputMode="numeric"
                />
              )}
            </div>
          </SectionCard>

          {/* Garantías - Only for credit */}
          {productoSolicitado.producto === 'credito' && (
            <SectionCard title="Garantías">
              <div className="space-y-4">
                <YesNoToggle
                  label="¿Aplica garantía FNG?"
                  value={garantias.aplicaFNG}
                  onChange={(value) => setGarantias({ aplicaFNG: value })}
                />

                {garantias.aplicaFNG && (
                  <>
                    <Input
                      label="Período de gracia (meses)"
                      name="periodoGraciaMeses"
                      type="number"
                      min="0"
                      value={garantias.periodoGraciaMeses || ''}
                      onChange={(e) =>
                        setGarantias({ periodoGraciaMeses: parseInt(e.target.value) || null })
                      }
                    />

                    <CurrencyInput
                      label="Comisión FNG"
                      name="comisionFNG"
                      value={garantias.comisionFNG}
                      onChange={(value) => setGarantias({ comisionFNG: value })}
                    />

                    <RadioGroup
                      label="Tipo de cobro"
                      name="tipoCobro"
                      options={[
                        { value: 'anticipado_unico', label: 'Anticipado único' },
                        { value: 'anticipado_anual', label: 'Anticipado anual' },
                      ]}
                      value={garantias.tipoCobro || ''}
                      onValueChange={(value) =>
                        setGarantias({ tipoCobro: value as 'anticipado_unico' | 'anticipado_anual' })
                      }
                      orientation="horizontal"
                    />
                  </>
                )}

                <YesNoToggle
                  label="¿Aplica garantía USAID?"
                  value={garantias.aplicaUSAID}
                  onChange={(value) => setGarantias({ aplicaUSAID: value })}
                />

                {garantias.aplicaUSAID && (
                  <>
                    <RadioGroup
                      label="Rango de monto"
                      name="rangoMonto"
                      options={[
                        { value: 'menor_4smmlv', label: 'Menor a 4 SMMLV' },
                        { value: 'mayor_4smmlv', label: 'Mayor o igual a 4 SMMLV' },
                      ]}
                      value={garantias.rangoMonto || ''}
                      onValueChange={(value) =>
                        setGarantias({ rangoMonto: value as 'menor_4smmlv' | 'mayor_4smmlv' })
                      }
                      orientation="horizontal"
                    />

                    <YesNoToggle
                      label="¿Comisión diferida en cuotas?"
                      value={garantias.diferidaCuotas}
                      onChange={(value) => setGarantias({ diferidaCuotas: value })}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <Select
                        label="Cobro 1er año"
                        name="cobro1erAno"
                        options={[
                          { value: 'anticipado', label: 'Anticipado' },
                          { value: 'diferida', label: 'Diferida' },
                        ]}
                        value={garantias.cobro1erAno || ''}
                        onChange={(e) =>
                          setGarantias({ cobro1erAno: e.target.value as 'anticipado' | 'diferida' })
                        }
                      />
                      <Select
                        label="Cobro 2do año"
                        name="cobro2doAno"
                        options={[
                          { value: 'anticipado', label: 'Anticipado' },
                          { value: 'diferida', label: 'Diferida' },
                        ]}
                        value={garantias.cobro2doAno || ''}
                        onChange={(e) =>
                          setGarantias({ cobro2doAno: e.target.value as 'anticipado' | 'diferida' })
                        }
                      />
                    </div>
                  </>
                )}

                <YesNoToggle
                  label="No tiene garantía"
                  value={garantias.noTiene}
                  onChange={(value) => setGarantias({ noTiene: value })}
                />
              </div>
            </SectionCard>
          )}

          {/* Débito Automático */}
          <SectionCard title="Débito Automático">
            <div className="space-y-4">
              <YesNoToggle
                label="¿Autoriza débito automático para pago de cuotas?"
                value={debitoAutomatico.autoriza}
                onChange={(value) => setDebitoAutomatico({ autoriza: value })}
              />

              {debitoAutomatico.autoriza && (
                <>
                  <RadioGroup
                    label="Tipo de cuenta"
                    name="tipoCuentaDebito"
                    options={[
                      { value: 'ahorros', label: 'Ahorros' },
                      { value: 'corriente', label: 'Corriente' },
                    ]}
                    value={debitoAutomatico.tipoCuenta || ''}
                    onValueChange={(value) =>
                      setDebitoAutomatico({ tipoCuenta: value as 'ahorros' | 'corriente' })
                    }
                    orientation="horizontal"
                  />

                  <Input
                    label="Número de cuenta"
                    name="numeroCuentaDebito"
                    value={debitoAutomatico.numeroCuenta}
                    onChange={(e) => setDebitoAutomatico({ numeroCuenta: e.target.value })}
                    inputMode="numeric"
                  />

                  <Select
                    label="Banco"
                    name="nombreBancoDebito"
                    options={bancosOptions}
                    value={debitoAutomatico.nombreBanco}
                    onChange={(e) => setDebitoAutomatico({ nombreBanco: e.target.value })}
                  />
                </>
              )}
            </div>
          </SectionCard>

          {/* Desembolso */}
          {productoSolicitado.producto === 'credito' && (
            <SectionCard title="Método de Desembolso">
              <div className="space-y-4">
                <RadioGroup
                  label="¿Cómo desea recibir el desembolso?"
                  name="metodoDesembolso"
                  options={[
                    { value: 'cuenta_mibanco', label: 'Cuenta MIBANCO' },
                    { value: 'cuenta_otros', label: 'Cuenta en otro banco' },
                  ]}
                  value={desembolso.metodo || ''}
                  onValueChange={(value) =>
                    setDesembolso({ metodo: value as 'cuenta_mibanco' | 'cuenta_otros' })
                  }
                />

                {desembolso.metodo === 'cuenta_mibanco' && (
                  <Input
                    label="Número de cuenta MIBANCO"
                    name="numeroCuentaMibanco"
                    value={desembolso.numeroCuentaMibanco}
                    onChange={(e) => setDesembolso({ numeroCuentaMibanco: e.target.value })}
                    inputMode="numeric"
                    hint="Si no tiene, se abrirá una nueva"
                  />
                )}

                {desembolso.metodo === 'cuenta_otros' && (
                  <>
                    <RadioGroup
                      label="Tipo de cuenta"
                      name="tipoCuentaOtros"
                      options={[
                        { value: 'ahorros', label: 'Ahorros' },
                        { value: 'corriente', label: 'Corriente' },
                      ]}
                      value={desembolso.tipoCuentaOtros || ''}
                      onValueChange={(value) =>
                        setDesembolso({ tipoCuentaOtros: value as 'ahorros' | 'corriente' })
                      }
                      orientation="horizontal"
                    />

                    <Input
                      label="Número de cuenta"
                      name="numeroCuentaOtros"
                      value={desembolso.numeroCuentaOtros}
                      onChange={(e) => setDesembolso({ numeroCuentaOtros: e.target.value })}
                      inputMode="numeric"
                    />

                    <Select
                      label="Banco"
                      name="nombreBancoOtros"
                      options={bancosOptions}
                      value={desembolso.nombreBancoOtros}
                      onChange={(e) => setDesembolso({ nombreBancoOtros: e.target.value })}
                    />
                  </>
                )}
              </div>
            </SectionCard>
          )}
        </div>
      </main>

      <StepNavigation currentStep={4} totalSteps={6} onNext={handleNext} />
    </>
  );
}
