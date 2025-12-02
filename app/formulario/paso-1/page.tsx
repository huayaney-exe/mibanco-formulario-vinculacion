'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFormStore } from '@/lib/store';
import { WizardHeader } from '@/components/wizard/WizardHeader';
import { StepNavigation } from '@/components/wizard/StepNavigation';
import { SectionCard } from '@/components/form/SectionCard';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { PhoneInput } from '@/components/form/PhoneInput';
import { YesNoToggle } from '@/components/form/YesNoToggle';
import {
  tipoDocumentoOptions,
  estadoCivilOptions,
  nivelEducativoOptions,
  coberturaSaludOptions,
  etniaOptions,
  ocupacionOptions,
  tipoViviendaOptions,
  estratoOptions,
  rolSolicitanteOptions,
} from '@/data/options';
import { getDepartamentoOptions, getCiudadOptions } from '@/data/departamentos';

export default function Paso1Page() {
  const router = useRouter();
  const {
    form,
    setDatosPersonales,
    setDatosConyuge,
    setDatosUbicacion,
    setCurrentStep,
    markStepComplete,
  } = useFormStore();

  const { datosPersonales, datosConyuge, datosUbicacion } = form;
  const [ciudadOptions, setCiudadOptions] = useState<{ value: string; label: string }[]>([]);

  // Update city options when department changes
  useEffect(() => {
    if (datosUbicacion.departamento) {
      setCiudadOptions(getCiudadOptions(datosUbicacion.departamento));
    } else {
      setCiudadOptions([]);
    }
  }, [datosUbicacion.departamento]);

  // Set current step on mount
  useEffect(() => {
    setCurrentStep(1);
  }, [setCurrentStep]);

  // Check if spouse section should be shown
  const showSpouseSection =
    datosPersonales.estadoCivil === 'casado' || datosPersonales.estadoCivil === 'union_libre';

  // Check if housing owner fields should be shown
  const showHousingOwner =
    datosUbicacion.tipoVivienda === 'arrendada' || datosUbicacion.tipoVivienda === 'familiar';

  const handleNext = () => {
    markStepComplete(1);
    router.push('/formulario/paso-2');
  };

  return (
    <>
      <WizardHeader currentStep={1} />

      <main className="px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Tipo de Vinculación */}
          <SectionCard title="Tipo de Vinculación">
            <div className="space-y-4">
              <RadioGroup
                label="Tipo de crédito"
                name="tipoVinculacion"
                options={[
                  { value: 'nuevo', label: 'Crédito Nuevo' },
                  { value: 'renovado', label: 'Crédito Renovado' },
                ]}
                value={datosPersonales.tipoVinculacion || ''}
                onValueChange={(value) =>
                  setDatosPersonales({ tipoVinculacion: value as 'nuevo' | 'renovado' })
                }
                orientation="horizontal"
                required
              />

              <Select
                label="Rol del solicitante"
                name="rol"
                options={rolSolicitanteOptions}
                value={datosPersonales.rol || ''}
                onChange={(e) => setDatosPersonales({ rol: e.target.value as any })}
                required
              />
            </div>
          </SectionCard>

          {/* Identificación */}
          <SectionCard title="Identificación">
            <div className="space-y-4">
              <Select
                label="Tipo de documento"
                name="tipoDocumento"
                options={tipoDocumentoOptions}
                value={datosPersonales.tipoDocumento || ''}
                onChange={(e) => setDatosPersonales({ tipoDocumento: e.target.value as any })}
                required
              />

              {datosPersonales.tipoDocumento === 'Otro' && (
                <Input
                  label="¿Cuál?"
                  name="tipoDocumentoOtro"
                  value={datosPersonales.tipoDocumentoOtro}
                  onChange={(e) => setDatosPersonales({ tipoDocumentoOtro: e.target.value })}
                  required
                />
              )}

              <Input
                label="Número de documento"
                name="numeroDocumento"
                value={datosPersonales.numeroDocumento}
                onChange={(e) => setDatosPersonales({ numeroDocumento: e.target.value })}
                inputMode="numeric"
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Primer nombre"
                  name="primerNombre"
                  value={datosPersonales.primerNombre}
                  onChange={(e) => setDatosPersonales({ primerNombre: e.target.value })}
                  required
                />
                <Input
                  label="Segundo nombre"
                  name="segundoNombre"
                  value={datosPersonales.segundoNombre}
                  onChange={(e) => setDatosPersonales({ segundoNombre: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Primer apellido"
                  name="primerApellido"
                  value={datosPersonales.primerApellido}
                  onChange={(e) => setDatosPersonales({ primerApellido: e.target.value })}
                  required
                />
                <Input
                  label="Segundo apellido"
                  name="segundoApellido"
                  value={datosPersonales.segundoApellido}
                  onChange={(e) => setDatosPersonales({ segundoApellido: e.target.value })}
                />
              </div>
            </div>
          </SectionCard>

          {/* Información Demográfica */}
          <SectionCard title="Información Demográfica">
            <div className="space-y-4">
              <Input
                label="Fecha de nacimiento"
                name="fechaNacimiento"
                type="date"
                value={datosPersonales.fechaNacimiento}
                onChange={(e) => setDatosPersonales({ fechaNacimiento: e.target.value })}
                required
              />

              <Select
                label="Estado civil"
                name="estadoCivil"
                options={estadoCivilOptions}
                value={datosPersonales.estadoCivil || ''}
                onChange={(e) => setDatosPersonales({ estadoCivil: e.target.value as any })}
                required
              />

              <Input
                label="Personas a cargo"
                name="personasACargo"
                type="number"
                min="0"
                value={datosPersonales.personasACargo || ''}
                onChange={(e) =>
                  setDatosPersonales({ personasACargo: parseInt(e.target.value) || 0 })
                }
              />

              <Select
                label="Nivel educativo"
                name="nivelEducativo"
                options={nivelEducativoOptions}
                value={datosPersonales.nivelEducativo || ''}
                onChange={(e) => setDatosPersonales({ nivelEducativo: e.target.value as any })}
              />

              <Input
                label="Profesión"
                name="profesion"
                value={datosPersonales.profesion}
                onChange={(e) => setDatosPersonales({ profesion: e.target.value })}
              />

              <Select
                label="Cobertura de salud"
                name="coberturaSalud"
                options={coberturaSaludOptions}
                value={datosPersonales.coberturaSalud || ''}
                onChange={(e) => setDatosPersonales({ coberturaSalud: e.target.value as any })}
              />

              <Select
                label="Pertenece a una etnia"
                name="etnia"
                options={etniaOptions}
                value={datosPersonales.etnia}
                onChange={(e) => setDatosPersonales({ etnia: e.target.value })}
              />
            </div>
          </SectionCard>

          {/* Nacionalidad */}
          <SectionCard title="Nacionalidad">
            <div className="space-y-4">
              <YesNoToggle
                label="¿Tiene nacionalidad en un país diferente a Colombia?"
                value={datosPersonales.tieneOtraNacionalidad}
                onChange={(value) => setDatosPersonales({ tieneOtraNacionalidad: value })}
              />

              {datosPersonales.tieneOtraNacionalidad && (
                <Input
                  label="País de nacionalidad"
                  name="paisNacionalidad"
                  value={datosPersonales.paisNacionalidad}
                  onChange={(e) => setDatosPersonales({ paisNacionalidad: e.target.value })}
                />
              )}
            </div>
          </SectionCard>

          {/* Ocupación */}
          <SectionCard title="Ocupación">
            <div className="space-y-4">
              <Select
                label="Ocupación u oficio"
                name="ocupacion"
                options={ocupacionOptions}
                value={datosPersonales.ocupacion || ''}
                onChange={(e) => setDatosPersonales({ ocupacion: e.target.value as any })}
                required
              />

              {datosPersonales.ocupacion === 'otro' && (
                <Input
                  label="¿Cuál?"
                  name="ocupacionOtra"
                  value={datosPersonales.ocupacionOtra}
                  onChange={(e) => setDatosPersonales({ ocupacionOtra: e.target.value })}
                  required
                />
              )}
            </div>
          </SectionCard>

          {/* Vínculos con MIBANCO */}
          <SectionCard title="Vínculos con MIBANCO">
            <div className="space-y-4">
              <YesNoToggle
                label="¿Tiene algún vínculo con MIBANCO?"
                value={datosPersonales.tieneVinculoMibanco}
                onChange={(value) => setDatosPersonales({ tieneVinculoMibanco: value })}
              />

              {datosPersonales.tieneVinculoMibanco && (
                <Input
                  label="¿Cuál vínculo?"
                  name="cualVinculo"
                  value={datosPersonales.cualVinculo}
                  onChange={(e) => setDatosPersonales({ cualVinculo: e.target.value })}
                />
              )}

              <YesNoToggle
                label="¿Tiene familiares que trabajen en MIBANCO?"
                value={datosPersonales.tieneFamiliaresMibanco}
                onChange={(value) => setDatosPersonales({ tieneFamiliaresMibanco: value })}
              />

              {datosPersonales.tieneFamiliaresMibanco && (
                <Input
                  label="¿Cuál familiar?"
                  name="cualFamiliar"
                  value={datosPersonales.cualFamiliar}
                  onChange={(e) => setDatosPersonales({ cualFamiliar: e.target.value })}
                />
              )}
            </div>
          </SectionCard>

          {/* Contacto */}
          <SectionCard title="Contacto">
            <div className="space-y-4">
              <PhoneInput
                label="Número de celular"
                name="celular"
                value={datosPersonales.celular}
                onChange={(value) => setDatosPersonales({ celular: value })}
                required
              />

              <Input
                label="Correo electrónico"
                name="email"
                type="email"
                value={datosPersonales.email}
                onChange={(e) => setDatosPersonales({ email: e.target.value })}
                required
              />
            </div>
          </SectionCard>

          {/* Datos del Cónyuge (Conditional) */}
          {showSpouseSection && (
            <SectionCard title="Datos del Cónyuge o Compañero Permanente" badge="Requerido">
              <div className="space-y-4">
                <Select
                  label="Tipo de documento"
                  name="conyugeTipoDocumento"
                  options={tipoDocumentoOptions.filter((o) => o.value !== 'Otro')}
                  value={datosConyuge.tipoDocumento || ''}
                  onChange={(e) => setDatosConyuge({ tipoDocumento: e.target.value as any })}
                />

                <Input
                  label="Número de documento"
                  name="conyugeNumeroDocumento"
                  value={datosConyuge.numeroDocumento}
                  onChange={(e) => setDatosConyuge({ numeroDocumento: e.target.value })}
                  inputMode="numeric"
                />

                <Input
                  label="Nombres y apellidos"
                  name="conyugeNombresApellidos"
                  value={datosConyuge.nombresApellidos}
                  onChange={(e) => setDatosConyuge({ nombresApellidos: e.target.value })}
                />

                <PhoneInput
                  label="Teléfono"
                  name="conyugeTelefono"
                  value={datosConyuge.telefono}
                  onChange={(value) => setDatosConyuge({ telefono: value })}
                />
              </div>
            </SectionCard>
          )}

          {/* Ubicación */}
          <SectionCard title="Datos de Ubicación">
            <div className="space-y-4">
              <Input
                label="Dirección de residencia"
                name="direccionResidencia"
                value={datosUbicacion.direccionResidencia}
                onChange={(e) => setDatosUbicacion({ direccionResidencia: e.target.value })}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Departamento"
                  name="departamento"
                  options={getDepartamentoOptions()}
                  value={datosUbicacion.departamento}
                  onChange={(e) => {
                    setDatosUbicacion({ departamento: e.target.value, ciudad: '' });
                  }}
                  required
                />

                <Select
                  label="Ciudad/Municipio"
                  name="ciudad"
                  options={ciudadOptions}
                  value={datosUbicacion.ciudad}
                  onChange={(e) => setDatosUbicacion({ ciudad: e.target.value })}
                  disabled={!datosUbicacion.departamento}
                  required
                />
              </div>

              <Input
                label="Barrio/Vereda"
                name="barrio"
                value={datosUbicacion.barrio}
                onChange={(e) => setDatosUbicacion({ barrio: e.target.value })}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Estrato"
                  name="estrato"
                  options={estratoOptions}
                  value={datosUbicacion.estrato?.toString() || ''}
                  onChange={(e) =>
                    setDatosUbicacion({ estrato: parseInt(e.target.value) || null })
                  }
                />

                <Input
                  label="Teléfono fijo"
                  name="telefonoFijo"
                  value={datosUbicacion.telefonoFijo}
                  onChange={(e) => setDatosUbicacion({ telefonoFijo: e.target.value })}
                  inputMode="numeric"
                />
              </div>

              <Input
                label="Tiempo de residencia (meses)"
                name="tiempoResidenciaMeses"
                type="number"
                min="0"
                value={datosUbicacion.tiempoResidenciaMeses || ''}
                onChange={(e) =>
                  setDatosUbicacion({
                    tiempoResidenciaMeses: parseInt(e.target.value) || null,
                  })
                }
              />

              <Select
                label="Tipo de vivienda"
                name="tipoVivienda"
                options={tipoViviendaOptions}
                value={datosUbicacion.tipoVivienda || ''}
                onChange={(e) => setDatosUbicacion({ tipoVivienda: e.target.value as any })}
              />

              {showHousingOwner && (
                <>
                  <Input
                    label="Nombres y apellidos del propietario"
                    name="nombrePropietario"
                    value={datosUbicacion.nombrePropietario}
                    onChange={(e) => setDatosUbicacion({ nombrePropietario: e.target.value })}
                  />

                  <PhoneInput
                    label="Teléfono del propietario"
                    name="telefonoPropietario"
                    value={datosUbicacion.telefonoPropietario}
                    onChange={(value) => setDatosUbicacion({ telefonoPropietario: value })}
                  />
                </>
              )}
            </div>
          </SectionCard>
        </div>
      </main>

      <StepNavigation currentStep={1} totalSteps={6} onNext={handleNext} />
    </>
  );
}
