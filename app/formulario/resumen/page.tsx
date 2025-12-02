'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { useFormStore } from '@/lib/store';
import { WizardHeader } from '@/components/wizard/WizardHeader';
import { Button } from '@/components/ui/Button';
import { SectionCard } from '@/components/form/SectionCard';
import { ChevronLeft, FileDown, Printer, CheckCircle, AlertTriangle } from 'lucide-react';
import { formatCurrency, formatDocument, formatPhone } from '@/lib/utils';

// Labels for displaying values
const labels = {
  tipoVinculacion: { nuevo: 'Crédito Nuevo', renovado: 'Crédito Renovado' },
  rol: {
    solicitante: 'Solicitante',
    firma_solidaria: 'Firma Solidaria',
    representante_legal: 'Representante Legal',
    corresponsal_bancario: 'Corresponsal Bancario',
    codeudor: 'Codeudor',
  },
  tipoDocumento: {
    CC: 'Cédula de Ciudadanía',
    CE: 'Cédula de Extranjería',
    Pasaporte: 'Pasaporte',
    Otro: 'Otro',
  },
  estadoCivil: {
    soltero: 'Soltero(a)',
    casado: 'Casado(a)',
    union_libre: 'Unión libre',
    viudo: 'Viudo(a)',
    divorciado: 'Divorciado(a)',
  },
  ocupacion: {
    independiente: 'Independiente',
    asalariado: 'Asalariado',
    pensionado: 'Pensionado',
    jubilado: 'Jubilado',
    rentista: 'Rentista',
    otro: 'Otro',
  },
  tipoVivienda: {
    propia_sin_hipoteca: 'Propia sin hipoteca',
    propia_con_hipoteca: 'Propia con hipoteca',
    arrendada: 'Arrendada',
    familiar: 'Familiar',
  },
  sectorEconomico: {
    comercio: 'Comercio',
    servicio: 'Servicio',
    produccion: 'Producción',
    agropecuario: 'Agropecuario',
  },
  producto: {
    cuenta_ahorros: 'Cuenta de Ahorros',
    credito: 'Crédito',
  },
  modalidadCredito: {
    comercial: 'Comercial',
    consumo: 'Consumo',
    vivienda: 'Vivienda',
  },
  tipoGarantia: {
    individual: 'Individual',
    conjunta: 'Conjunta',
    alterna: 'Alterna',
  },
};

function SummaryField({
  label,
  value,
  warning,
}: {
  label: string;
  value: string | number | boolean | null | undefined;
  warning?: boolean;
}) {
  if (value === null || value === undefined || value === '') {
    return (
      <div className="flex justify-between py-2 border-b border-gray-100">
        <span className="text-sm text-gray-500">{label}</span>
        <span className="text-sm text-gray-400 italic">No especificado</span>
      </div>
    );
  }

  const displayValue = typeof value === 'boolean' ? (value ? 'Sí' : 'No') : String(value);

  return (
    <div className="flex justify-between py-2 border-b border-gray-100">
      <span className="text-sm text-gray-500">{label}</span>
      <span className={`text-sm font-medium ${warning ? 'text-yellow-600' : 'text-gray-900'}`}>
        {warning && <AlertTriangle className="w-3 h-3 inline mr-1" />}
        {displayValue}
      </span>
    </div>
  );
}

export default function ResumenPage() {
  const router = useRouter();
  const { form, metadata } = useFormStore();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const {
    datosPersonales,
    datosConyuge,
    datosUbicacion,
    datosCorrespondencia,
    datosIndependiente,
    datosAsalariado,
    referencias,
    origenFondos,
    informacionFinanciera,
    productoSolicitado,
    garantias,
    debitoAutomatico,
    desembolso,
    informacionPEP,
    operacionesMonedaExtranjera,
    informacionTributaria,
    evaluacionAmbiental,
    condicionEspecial,
    autorizaciones,
  } = form;

  const isIndependiente = datosPersonales.ocupacion === 'independiente';
  const isAsalariado = datosPersonales.ocupacion === 'asalariado';
  const showSpouse =
    datosPersonales.estadoCivil === 'casado' || datosPersonales.estadoCivil === 'union_libre';

  // Check for any PEP indicators
  const isPEP =
    informacionPEP.administraRecursosPublicos ||
    informacionPEP.esReconocidoPublicamente ||
    informacionPEP.desempenaCargosPublicos ||
    informacionPEP.esPEPExtranjero ||
    informacionPEP.esRepresentanteLegalInternacional ||
    informacionPEP.familiarEsPEP;

  const handlePrint = () => {
    window.print();
  };

  const handleGeneratePDF = async () => {
    setIsGeneratingPDF(true);
    try {
      // Use html2canvas-pro which supports modern color functions (lab, oklch, oklab)
      const html2canvas = (await import('html2canvas-pro')).default;
      const { jsPDF } = await import('jspdf');

      if (!contentRef.current) {
        throw new Error('Content reference not found');
      }

      const element = contentRef.current;

      // Generate canvas directly - html2canvas-pro supports Tailwind v4's lab() colors
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);

      // Create PDF with A4 dimensions
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Calculate image dimensions to fit PDF width
      const imgWidth = pdfWidth - 20; // 10mm margin on each side
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Handle multi-page PDF
      let heightLeft = imgHeight;
      let position = 10; // Top margin
      const pageContentHeight = pdfHeight - 20; // Account for margins

      // First page
      pdf.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageContentHeight;

      // Additional pages if content is longer
      while (heightLeft > 0) {
        pdf.addPage();
        position = 10 - (imgHeight - heightLeft); // Negative position to show next portion
        pdf.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageContentHeight;
      }

      // Generate filename with date and document number
      const date = new Date().toISOString().split('T')[0];
      const docNum = datosPersonales.numeroDocumento || 'sin-documento';
      pdf.save(`formulario-vinculacion-${docNum}-${date}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error al generar el PDF. Por favor intente de nuevo. Error: ' + (error as Error).message);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <>
      <WizardHeader currentStep={6} />

      <main className="px-4 py-6 print:px-0 print:py-0">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-6 print:hidden">
            <h1 className="text-2xl font-bold text-gray-900">Resumen del Formulario</h1>
            <p className="text-gray-600 mt-1">
              Revise la información antes de generar el documento PDF.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mb-6 print:hidden">
            <Button variant="outline" onClick={() => router.push('/formulario/paso-6')}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Editar
            </Button>
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="w-4 h-4 mr-2" />
              Imprimir
            </Button>
            <Button variant="primary" onClick={handleGeneratePDF} isLoading={isGeneratingPDF}>
              <FileDown className="w-4 h-4 mr-2" />
              Descargar PDF
            </Button>
          </div>

          {/* Summary Content */}
          <div ref={contentRef} className="space-y-6 bg-white">
            {/* Print Header */}
            <div className="hidden print:block text-center py-4 border-b-2 border-green-600">
              <h1 className="text-xl font-bold text-green-700">MIBANCO COLOMBIA S.A.</h1>
              <h2 className="text-lg font-semibold">Formulario de Vinculación</h2>
              <p className="text-sm text-gray-500">
                Fecha: {new Date().toLocaleDateString('es-CO')}
              </p>
            </div>

            {/* Step 1: Datos Personales */}
            <SectionCard title="Datos Personales">
              <div className="space-y-1">
                <SummaryField
                  label="Tipo de vinculación"
                  value={
                    datosPersonales.tipoVinculacion
                      ? labels.tipoVinculacion[datosPersonales.tipoVinculacion]
                      : null
                  }
                />
                <SummaryField
                  label="Rol"
                  value={datosPersonales.rol ? labels.rol[datosPersonales.rol] : null}
                />
                <SummaryField
                  label="Tipo de documento"
                  value={
                    datosPersonales.tipoDocumento
                      ? labels.tipoDocumento[datosPersonales.tipoDocumento]
                      : null
                  }
                />
                <SummaryField
                  label="Número de documento"
                  value={formatDocument(datosPersonales.numeroDocumento)}
                />
                <SummaryField
                  label="Nombre completo"
                  value={`${datosPersonales.primerNombre} ${datosPersonales.segundoNombre} ${datosPersonales.primerApellido} ${datosPersonales.segundoApellido}`.trim()}
                />
                <SummaryField label="Fecha de nacimiento" value={datosPersonales.fechaNacimiento} />
                <SummaryField
                  label="Estado civil"
                  value={
                    datosPersonales.estadoCivil
                      ? labels.estadoCivil[datosPersonales.estadoCivil]
                      : null
                  }
                />
                <SummaryField label="Personas a cargo" value={datosPersonales.personasACargo} />
                <SummaryField
                  label="Ocupación"
                  value={
                    datosPersonales.ocupacion ? labels.ocupacion[datosPersonales.ocupacion] : null
                  }
                />
                <SummaryField label="Celular" value={formatPhone(datosPersonales.celular)} />
                <SummaryField label="Email" value={datosPersonales.email} />
              </div>
            </SectionCard>

            {/* Spouse Data */}
            {showSpouse && (datosConyuge.numeroDocumento || datosConyuge.nombresApellidos) && (
              <SectionCard title="Datos del Cónyuge">
                <div className="space-y-1">
                  <SummaryField
                    label="Tipo de documento"
                    value={
                      datosConyuge.tipoDocumento
                        ? labels.tipoDocumento[datosConyuge.tipoDocumento]
                        : null
                    }
                  />
                  <SummaryField
                    label="Número de documento"
                    value={formatDocument(datosConyuge.numeroDocumento)}
                  />
                  <SummaryField label="Nombres y apellidos" value={datosConyuge.nombresApellidos} />
                  <SummaryField label="Teléfono" value={formatPhone(datosConyuge.telefono)} />
                </div>
              </SectionCard>
            )}

            {/* Location */}
            <SectionCard title="Ubicación">
              <div className="space-y-1">
                <SummaryField label="Dirección" value={datosUbicacion.direccionResidencia} />
                <SummaryField label="Departamento" value={datosUbicacion.departamento} />
                <SummaryField label="Ciudad" value={datosUbicacion.ciudad} />
                <SummaryField label="Barrio" value={datosUbicacion.barrio} />
                <SummaryField label="Estrato" value={datosUbicacion.estrato} />
                <SummaryField
                  label="Tipo de vivienda"
                  value={
                    datosUbicacion.tipoVivienda
                      ? labels.tipoVivienda[datosUbicacion.tipoVivienda]
                      : null
                  }
                />
                <SummaryField
                  label="Tiempo de residencia"
                  value={
                    datosUbicacion.tiempoResidenciaMeses
                      ? `${datosUbicacion.tiempoResidenciaMeses} meses`
                      : null
                  }
                />
              </div>
            </SectionCard>

            {/* Step 2: Business/Employment Info */}
            {isIndependiente && (
              <SectionCard title="Información del Negocio">
                <div className="space-y-1">
                  <SummaryField
                    label="Actividad económica"
                    value={datosIndependiente.actividadEconomica}
                  />
                  <SummaryField
                    label="Nombre del negocio"
                    value={datosIndependiente.nombreEmpresa}
                  />
                  <SummaryField
                    label="Sector económico"
                    value={
                      datosIndependiente.sectorEconomico
                        ? labels.sectorEconomico[datosIndependiente.sectorEconomico]
                        : null
                    }
                  />
                  <SummaryField
                    label="Negocio en vivienda"
                    value={datosIndependiente.negocioEnVivienda}
                  />
                  <SummaryField
                    label="Tiempo en local"
                    value={
                      datosIndependiente.tiempoLocalMeses
                        ? `${datosIndependiente.tiempoLocalMeses} meses`
                        : null
                    }
                  />
                  <SummaryField
                    label="Tiempo en actividad"
                    value={
                      datosIndependiente.tiempoActividadMeses
                        ? `${datosIndependiente.tiempoActividadMeses} meses`
                        : null
                    }
                  />
                  <SummaryField
                    label="Número de empleados"
                    value={datosIndependiente.numeroEmpleados}
                  />
                  <SummaryField
                    label="Registro mercantil"
                    value={datosIndependiente.registroMercantil}
                  />
                </div>
              </SectionCard>
            )}

            {isAsalariado && (
              <SectionCard title="Información Laboral">
                <div className="space-y-1">
                  <SummaryField label="Empresa" value={datosAsalariado.nombreEmpresa} />
                  <SummaryField label="Cargo" value={datosAsalariado.cargo} />
                  <SummaryField
                    label="Antigüedad"
                    value={
                      datosAsalariado.antiguedadMeses
                        ? `${datosAsalariado.antiguedadMeses} meses`
                        : null
                    }
                  />
                  <SummaryField label="Dirección empresa" value={datosAsalariado.direccionEmpresa} />
                  <SummaryField label="Teléfono empresa" value={formatPhone(datosAsalariado.telefono)} />
                </div>
              </SectionCard>
            )}

            {/* References */}
            <SectionCard title="Referencias">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Referencia Comercial</h4>
                  <div className="space-y-1">
                    <SummaryField label="Nombre" value={referencias.comercial.nombre} />
                    <SummaryField
                      label="Teléfono"
                      value={formatPhone(referencias.comercial.telefono)}
                    />
                    <SummaryField label="Parentesco" value={referencias.comercial.parentesco} />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Referencia Personal</h4>
                  <div className="space-y-1">
                    <SummaryField label="Nombre" value={referencias.personal.nombre} />
                    <SummaryField
                      label="Teléfono"
                      value={formatPhone(referencias.personal.telefono)}
                    />
                    <SummaryField label="Parentesco" value={referencias.personal.parentesco} />
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Step 3: Financial Information */}
            <SectionCard title="Información Financiera">
              <div className="space-y-1">
                <SummaryField
                  label="Origen de fondos"
                  value={origenFondos.origenes?.join(', ') || null}
                />
                <SummaryField
                  label="Ingresos mensuales"
                  value={formatCurrency(informacionFinanciera.ingresosMensuales)}
                />
                {isIndependiente && (
                  <>
                    <SummaryField
                      label="Costo de ventas"
                      value={formatCurrency(informacionFinanciera.costoVentas)}
                    />
                    <SummaryField
                      label="Gastos operativos"
                      value={formatCurrency(informacionFinanciera.gastosOperativos)}
                    />
                  </>
                )}
                <SummaryField
                  label="Otros ingresos"
                  value={formatCurrency(informacionFinanciera.otrosIngresos)}
                />
                <SummaryField
                  label="Egresos mensuales"
                  value={formatCurrency(informacionFinanciera.egresosMensuales)}
                />
                <div className="bg-green-50 rounded-lg p-3 mt-2">
                  <SummaryField
                    label="Capacidad de pago"
                    value={formatCurrency(informacionFinanciera.capacidadPago)}
                  />
                </div>
                <SummaryField
                  label="Total activos"
                  value={formatCurrency(informacionFinanciera.totalActivos)}
                />
                <SummaryField
                  label="Total pasivos"
                  value={formatCurrency(informacionFinanciera.totalPasivos)}
                />
                <SummaryField
                  label="Patrimonio"
                  value={formatCurrency(
                    informacionFinanciera.totalActivos - informacionFinanciera.totalPasivos
                  )}
                />
              </div>
            </SectionCard>

            {/* Step 4: Product */}
            <SectionCard title="Producto Solicitado">
              <div className="space-y-1">
                <SummaryField
                  label="Producto"
                  value={
                    productoSolicitado.producto
                      ? labels.producto[productoSolicitado.producto]
                      : null
                  }
                />
                {productoSolicitado.producto === 'credito' && (
                  <>
                    <SummaryField
                      label="Modalidad"
                      value={
                        productoSolicitado.modalidadCredito
                          ? labels.modalidadCredito[productoSolicitado.modalidadCredito]
                          : null
                      }
                    />
                    <SummaryField
                      label="Tipo de garantía"
                      value={
                        productoSolicitado.tipoGarantia
                          ? labels.tipoGarantia[productoSolicitado.tipoGarantia]
                          : null
                      }
                    />
                    <SummaryField label="Aplica FNG" value={garantias.aplicaFNG} />
                    <SummaryField label="Aplica USAID" value={garantias.aplicaUSAID} />
                  </>
                )}
                <SummaryField label="Débito automático" value={debitoAutomatico.autoriza} />
                {desembolso.metodo && (
                  <SummaryField
                    label="Método de desembolso"
                    value={
                      desembolso.metodo === 'cuenta_mibanco' ? 'Cuenta MIBANCO' : 'Cuenta otro banco'
                    }
                  />
                )}
              </div>
            </SectionCard>

            {/* Step 5: Compliance */}
            <SectionCard title="Cumplimiento">
              <div className="space-y-1">
                <SummaryField label="Es PEP" value={isPEP} warning={isPEP} />
                <SummaryField
                  label="Operaciones en moneda extranjera"
                  value={operacionesMonedaExtranjera.realizaOperaciones}
                />
                <SummaryField
                  label="Productos en el exterior"
                  value={operacionesMonedaExtranjera.tieneProductos}
                />
                <SummaryField
                  label="Declarante de renta"
                  value={informacionTributaria.esDeclaranteRenta}
                />
              </div>
            </SectionCard>

            {/* Step 6: Authorizations */}
            <SectionCard title="Autorizaciones">
              <div className="space-y-1">
                <SummaryField
                  label="Autoriza centrales de riesgo"
                  value={autorizaciones.autorizaCentrales}
                />
                <SummaryField
                  label="Autoriza tratamiento de datos"
                  value={autorizaciones.autorizaTratamientoDatos}
                />
                <SummaryField
                  label="Confirma recepción de información"
                  value={autorizaciones.confirmaRecepcionInfo}
                />
                <SummaryField
                  label="Acepta compromiso de actualización"
                  value={autorizaciones.aceptaCompromisoActualizacion}
                />
              </div>
            </SectionCard>

            {/* Environmental */}
            {(evaluacionAmbiental.generaImpacto ||
              evaluacionAmbiental.necesitaPermiso ||
              evaluacionAmbiental.involucraEstrategias) && (
              <SectionCard title="Evaluación Ambiental">
                <div className="space-y-1">
                  <SummaryField
                    label="Genera impacto ambiental"
                    value={evaluacionAmbiental.generaImpacto}
                  />
                  <SummaryField
                    label="Requiere permisos ambientales"
                    value={evaluacionAmbiental.necesitaPermiso}
                  />
                  <SummaryField
                    label="Involucra estrategias de sostenibilidad"
                    value={evaluacionAmbiental.involucraEstrategias}
                  />
                </div>
              </SectionCard>
            )}

            {/* Special Condition */}
            {condicionEspecial.tieneDiscapacidad && (
              <SectionCard title="Condición Especial">
                <div className="space-y-1">
                  <SummaryField label="Tiene discapacidad" value={condicionEspecial.tieneDiscapacidad} />
                  <SummaryField
                    label="Tipos"
                    value={condicionEspecial.tiposDiscapacidad?.join(', ') || null}
                  />
                </div>
              </SectionCard>
            )}

            {/* Signature Section - Print Only */}
            <div className="hidden print:block mt-8 pt-8 border-t-2 border-gray-300">
              <h3 className="text-lg font-semibold mb-6">Firmas</h3>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="border-b-2 border-gray-400 h-16"></div>
                  <p className="text-sm text-center mt-2">Firma del Solicitante</p>
                  <p className="text-xs text-center text-gray-500">
                    {datosPersonales.primerNombre} {datosPersonales.primerApellido}
                  </p>
                  <p className="text-xs text-center text-gray-500">
                    {datosPersonales.tipoDocumento}: {datosPersonales.numeroDocumento}
                  </p>
                </div>
                <div>
                  <div className="border-b-2 border-gray-400 h-16"></div>
                  <p className="text-sm text-center mt-2">Firma del Asesor</p>
                  <p className="text-xs text-center text-gray-500">MIBANCO Colombia S.A.</p>
                </div>
              </div>
              <div className="mt-8 text-center">
                <p className="text-xs text-gray-500">
                  Fecha de diligenciamiento: {new Date().toLocaleDateString('es-CO')}
                </p>
              </div>
            </div>
          </div>

          {/* Completion Message */}
          <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg print:hidden">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-800">Formulario Completado</h3>
                <p className="text-sm text-green-700 mt-1">
                  Ha completado todos los pasos del formulario. Puede descargar el PDF o imprimirlo
                  para obtener las firmas requeridas. Una vez firmado, entregue el documento físico
                  a su asesor de MIBANCO.
                </p>
              </div>
            </div>
          </div>

          {/* Return to Home */}
          <div className="mt-6 text-center print:hidden">
            <Button
              variant="ghost"
              onClick={() => {
                if (
                  confirm(
                    '¿Desea iniciar un nuevo formulario? Los datos actuales serán eliminados.'
                  )
                ) {
                  useFormStore.getState().resetForm();
                  router.push('/');
                }
              }}
            >
              Iniciar nuevo formulario
            </Button>
          </div>
        </div>
      </main>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:block {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}
