'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFormStore } from '@/lib/store';
import { WizardHeader } from '@/components/wizard/WizardHeader';
import { StepNavigation } from '@/components/wizard/StepNavigation';
import { SectionCard } from '@/components/form/SectionCard';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Checkbox } from '@/components/ui/Checkbox';
import { PhoneInput } from '@/components/form/PhoneInput';
import { YesNoToggle } from '@/components/form/YesNoToggle';
import {
  sectorEconomicoOptions,
  tipoLocalOptions,
  tipoEmpresaOptions,
  tipoContratoOptions,
  mecanismosRecepcionOptions,
} from '@/data/options';
import { getDepartamentoOptions, getCiudadOptions } from '@/data/departamentos';

export default function Paso2Page() {
  const router = useRouter();
  const {
    form,
    setDatosCorrespondencia,
    setDatosIndependiente,
    setDatosAsalariado,
    setReferencias,
    setCurrentStep,
    markStepComplete,
  } = useFormStore();

  const { datosPersonales, datosCorrespondencia, datosIndependiente, datosAsalariado, referencias } = form;
  const [ciudadOptionsLocal, setCiudadOptionsLocal] = useState<{ value: string; label: string }[]>([]);
  const [ciudadOptionsEmpresa, setCiudadOptionsEmpresa] = useState<{ value: string; label: string }[]>([]);

  const isIndependiente = datosPersonales.ocupacion === 'independiente';
  const isAsalariado = datosPersonales.ocupacion === 'asalariado';

  useEffect(() => {
    setCurrentStep(2);
  }, [setCurrentStep]);

  useEffect(() => {
    if (datosIndependiente.departamentoLocal) {
      setCiudadOptionsLocal(getCiudadOptions(datosIndependiente.departamentoLocal));
    }
  }, [datosIndependiente.departamentoLocal]);

  useEffect(() => {
    if (datosAsalariado.departamento) {
      setCiudadOptionsEmpresa(getCiudadOptions(datosAsalariado.departamento));
    }
  }, [datosAsalariado.departamento]);

  const handleNext = () => {
    markStepComplete(2);
    router.push('/formulario/paso-3');
  };

  const handleMecanismoChange = (value: string, checked: boolean) => {
    const current = datosCorrespondencia.mecanismosRecepcion || [];
    if (checked) {
      setDatosCorrespondencia({ mecanismosRecepcion: [...current, value] });
    } else {
      setDatosCorrespondencia({ mecanismosRecepcion: current.filter((m) => m !== value) });
    }
  };

  return (
    <>
      <WizardHeader currentStep={2} />

      <main className="px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Correspondencia */}
          <SectionCard title="Datos para Envío de Correspondencia">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Departamento"
                  name="corrDepartamento"
                  options={getDepartamentoOptions()}
                  value={datosCorrespondencia.departamento}
                  onChange={(e) => setDatosCorrespondencia({ departamento: e.target.value })}
                />
                <Select
                  label="Ciudad"
                  name="corrCiudad"
                  options={getCiudadOptions(datosCorrespondencia.departamento)}
                  value={datosCorrespondencia.ciudad}
                  onChange={(e) => setDatosCorrespondencia({ ciudad: e.target.value })}
                  disabled={!datosCorrespondencia.departamento}
                />
              </div>

              <Input
                label="Barrio/Vereda"
                name="corrBarrio"
                value={datosCorrespondencia.barrio}
                onChange={(e) => setDatosCorrespondencia({ barrio: e.target.value })}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mecanismo de recepción de información
                </label>
                <div className="space-y-2">
                  {mecanismosRecepcionOptions.map((option) => (
                    <Checkbox
                      key={option.value}
                      label={option.label}
                      checked={datosCorrespondencia.mecanismosRecepcion?.includes(option.value)}
                      onChange={(e) => handleMecanismoChange(option.value, e.target.checked)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Datos Independiente */}
          {isIndependiente && (
            <SectionCard title="Información del Negocio" badge="Independiente">
              <div className="space-y-4">
                <Input
                  label="Actividad económica principal"
                  name="actividadEconomica"
                  value={datosIndependiente.actividadEconomica}
                  onChange={(e) => setDatosIndependiente({ actividadEconomica: e.target.value })}
                  required
                />

                <Input
                  label="Nombre de la empresa/negocio"
                  name="nombreEmpresaInd"
                  value={datosIndependiente.nombreEmpresa}
                  onChange={(e) => setDatosIndependiente({ nombreEmpresa: e.target.value })}
                />

                <Select
                  label="Sector económico"
                  name="sectorEconomico"
                  options={sectorEconomicoOptions}
                  value={datosIndependiente.sectorEconomico || ''}
                  onChange={(e) => setDatosIndependiente({ sectorEconomico: e.target.value as any })}
                  required
                />

                <YesNoToggle
                  label="¿El negocio está ubicado en la vivienda?"
                  value={datosIndependiente.negocioEnVivienda}
                  onChange={(value) => setDatosIndependiente({ negocioEnVivienda: value })}
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Tiempo en local (meses)"
                    name="tiempoLocalMeses"
                    type="number"
                    min="0"
                    value={datosIndependiente.tiempoLocalMeses || ''}
                    onChange={(e) =>
                      setDatosIndependiente({ tiempoLocalMeses: parseInt(e.target.value) || null })
                    }
                  />
                  <Input
                    label="Tiempo en actividad (meses)"
                    name="tiempoActividadMeses"
                    type="number"
                    min="0"
                    value={datosIndependiente.tiempoActividadMeses || ''}
                    onChange={(e) =>
                      setDatosIndependiente({ tiempoActividadMeses: parseInt(e.target.value) || null })
                    }
                  />
                </div>

                <Input
                  label="Número de empleados"
                  name="numeroEmpleados"
                  type="number"
                  min="0"
                  value={datosIndependiente.numeroEmpleados || ''}
                  onChange={(e) =>
                    setDatosIndependiente({ numeroEmpleados: parseInt(e.target.value) || null })
                  }
                />

                {!datosIndependiente.negocioEnVivienda && (
                  <>
                    <Input
                      label="Dirección del local"
                      name="direccionLocal"
                      value={datosIndependiente.direccionLocal}
                      onChange={(e) => setDatosIndependiente({ direccionLocal: e.target.value })}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <Select
                        label="Departamento"
                        name="departamentoLocal"
                        options={getDepartamentoOptions()}
                        value={datosIndependiente.departamentoLocal}
                        onChange={(e) =>
                          setDatosIndependiente({ departamentoLocal: e.target.value, ciudadLocal: '' })
                        }
                      />
                      <Select
                        label="Ciudad"
                        name="ciudadLocal"
                        options={ciudadOptionsLocal}
                        value={datosIndependiente.ciudadLocal}
                        onChange={(e) => setDatosIndependiente({ ciudadLocal: e.target.value })}
                        disabled={!datosIndependiente.departamentoLocal}
                      />
                    </div>

                    <Input
                      label="Barrio"
                      name="barrioLocal"
                      value={datosIndependiente.barrioLocal}
                      onChange={(e) => setDatosIndependiente({ barrioLocal: e.target.value })}
                    />
                  </>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <PhoneInput
                    label="Teléfono 1"
                    name="telefonoLocal1"
                    value={datosIndependiente.telefono1}
                    onChange={(value) => setDatosIndependiente({ telefono1: value })}
                  />
                  <PhoneInput
                    label="Teléfono 2"
                    name="telefonoLocal2"
                    value={datosIndependiente.telefono2}
                    onChange={(value) => setDatosIndependiente({ telefono2: value })}
                  />
                </div>

                <Select
                  label="Tipo de local"
                  name="tipoLocal"
                  options={tipoLocalOptions}
                  value={datosIndependiente.tipoLocal || ''}
                  onChange={(e) => setDatosIndependiente({ tipoLocal: e.target.value as any })}
                />

                {(datosIndependiente.tipoLocal === 'arrendada' ||
                  datosIndependiente.tipoLocal === 'familiar') && (
                  <>
                    <Input
                      label="Nombre del propietario del local"
                      name="nombrePropietarioLocal"
                      value={datosIndependiente.nombrePropietarioLocal}
                      onChange={(e) =>
                        setDatosIndependiente({ nombrePropietarioLocal: e.target.value })
                      }
                    />
                    <PhoneInput
                      label="Teléfono del propietario"
                      name="telefonoPropietarioLocal"
                      value={datosIndependiente.telefonoPropietarioLocal}
                      onChange={(value) =>
                        setDatosIndependiente({ telefonoPropietarioLocal: value })
                      }
                    />
                  </>
                )}

                <YesNoToggle
                  label="¿Está inscrito en el registro mercantil?"
                  value={datosIndependiente.registroMercantil}
                  onChange={(value) => setDatosIndependiente({ registroMercantil: value })}
                />
              </div>
            </SectionCard>
          )}

          {/* Datos Asalariado */}
          {isAsalariado && (
            <SectionCard title="Información Laboral" badge="Asalariado">
              <div className="space-y-4">
                <Input
                  label="Nombre de la empresa"
                  name="nombreEmpresaAsal"
                  value={datosAsalariado.nombreEmpresa}
                  onChange={(e) => setDatosAsalariado({ nombreEmpresa: e.target.value })}
                  required
                />

                <Input
                  label="Cargo que ocupa"
                  name="cargo"
                  value={datosAsalariado.cargo}
                  onChange={(e) => setDatosAsalariado({ cargo: e.target.value })}
                />

                <Input
                  label="Antigüedad en la empresa (meses)"
                  name="antiguedadMeses"
                  type="number"
                  min="0"
                  value={datosAsalariado.antiguedadMeses || ''}
                  onChange={(e) =>
                    setDatosAsalariado({ antiguedadMeses: parseInt(e.target.value) || null })
                  }
                />

                <Input
                  label="Dirección de la empresa"
                  name="direccionEmpresa"
                  value={datosAsalariado.direccionEmpresa}
                  onChange={(e) => setDatosAsalariado({ direccionEmpresa: e.target.value })}
                />

                <div className="grid grid-cols-2 gap-4">
                  <Select
                    label="Departamento"
                    name="departamentoEmpresa"
                    options={getDepartamentoOptions()}
                    value={datosAsalariado.departamento}
                    onChange={(e) =>
                      setDatosAsalariado({ departamento: e.target.value, ciudad: '' })
                    }
                  />
                  <Select
                    label="Ciudad"
                    name="ciudadEmpresa"
                    options={ciudadOptionsEmpresa}
                    value={datosAsalariado.ciudad}
                    onChange={(e) => setDatosAsalariado({ ciudad: e.target.value })}
                    disabled={!datosAsalariado.departamento}
                  />
                </div>

                <Input
                  label="Barrio"
                  name="barrioEmpresa"
                  value={datosAsalariado.barrio}
                  onChange={(e) => setDatosAsalariado({ barrio: e.target.value })}
                />

                <PhoneInput
                  label="Teléfono de la empresa"
                  name="telefonoEmpresa"
                  value={datosAsalariado.telefono}
                  onChange={(value) => setDatosAsalariado({ telefono: value })}
                />

                <Select
                  label="Tipo de empresa"
                  name="tipoEmpresa"
                  options={tipoEmpresaOptions}
                  value={datosAsalariado.tipoEmpresa || ''}
                  onChange={(e) => setDatosAsalariado({ tipoEmpresa: e.target.value as any })}
                />

                <Select
                  label="Tipo de contrato"
                  name="tipoContrato"
                  options={tipoContratoOptions}
                  value={datosAsalariado.tipoContrato || ''}
                  onChange={(e) => setDatosAsalariado({ tipoContrato: e.target.value as any })}
                />
              </div>
            </SectionCard>
          )}

          {/* Referencias */}
          <SectionCard title="Referencias">
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Referencia Comercial</h4>
                <div className="space-y-4">
                  <Input
                    label="Nombres y apellidos"
                    name="refComercialNombre"
                    value={referencias.comercial.nombre}
                    onChange={(e) =>
                      setReferencias({
                        comercial: { ...referencias.comercial, nombre: e.target.value },
                      })
                    }
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <PhoneInput
                      label="Teléfono"
                      name="refComercialTelefono"
                      value={referencias.comercial.telefono}
                      onChange={(value) =>
                        setReferencias({
                          comercial: { ...referencias.comercial, telefono: value },
                        })
                      }
                    />
                    <Input
                      label="Parentesco"
                      name="refComercialParentesco"
                      value={referencias.comercial.parentesco}
                      onChange={(e) =>
                        setReferencias({
                          comercial: { ...referencias.comercial, parentesco: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Referencia Personal/Familiar</h4>
                <div className="space-y-4">
                  <Input
                    label="Nombres y apellidos"
                    name="refPersonalNombre"
                    value={referencias.personal.nombre}
                    onChange={(e) =>
                      setReferencias({
                        personal: { ...referencias.personal, nombre: e.target.value },
                      })
                    }
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Cargo"
                      name="refPersonalCargo"
                      value={referencias.personal.cargo}
                      onChange={(e) =>
                        setReferencias({
                          personal: { ...referencias.personal, cargo: e.target.value },
                        })
                      }
                    />
                    <Input
                      label="Parentesco"
                      name="refPersonalParentesco"
                      value={referencias.personal.parentesco}
                      onChange={(e) =>
                        setReferencias({
                          personal: { ...referencias.personal, parentesco: e.target.value },
                        })
                      }
                    />
                  </div>
                  <PhoneInput
                    label="Teléfono"
                    name="refPersonalTelefono"
                    value={referencias.personal.telefono}
                    onChange={(value) =>
                      setReferencias({
                        personal: { ...referencias.personal, telefono: value },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </SectionCard>
        </div>
      </main>

      <StepNavigation currentStep={2} totalSteps={6} onNext={handleNext} />
    </>
  );
}
