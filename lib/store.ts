import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  FormularioVinculacion,
  FormMetadata,
  ValidationWarning,
  DatosPersonales,
  DatosConyuge,
  DatosUbicacion,
  DatosCorrespondencia,
  DatosIndependiente,
  DatosAsalariado,
  Referencias,
  OrigenFondos,
  InformacionFinanciera,
  ProductoSolicitado,
  Garantias,
  DebitoAutomatico,
  Desembolso,
  InformacionPEP,
  OperacionesMonedaExtranjera,
  InformacionTributaria,
  EvaluacionAmbiental,
  CondicionEspecial,
  Autorizaciones,
  Firma,
  EstadoGestion,
} from '@/types/form';

// Initial states
const initialDatosPersonales: DatosPersonales = {
  tipoVinculacion: null,
  rol: null,
  tipoDocumento: null,
  tipoDocumentoOtro: '',
  numeroDocumento: '',
  primerNombre: '',
  segundoNombre: '',
  primerApellido: '',
  segundoApellido: '',
  fechaNacimiento: '',
  estadoCivil: null,
  personasACargo: 0,
  nivelEducativo: null,
  profesion: '',
  coberturaSalud: null,
  etnia: '',
  tieneOtraNacionalidad: false,
  paisNacionalidad: '',
  ocupacion: null,
  ocupacionOtra: '',
  tieneVinculoMibanco: false,
  cualVinculo: '',
  tieneFamiliaresMibanco: false,
  cualFamiliar: '',
  celular: '',
  email: '',
};

const initialDatosConyuge: DatosConyuge = {
  tipoDocumento: null,
  numeroDocumento: '',
  nombresApellidos: '',
  telefono: '',
};

const initialDatosUbicacion: DatosUbicacion = {
  direccionResidencia: '',
  departamento: '',
  ciudad: '',
  barrio: '',
  estrato: null,
  telefonoFijo: '',
  tiempoResidenciaMeses: null,
  tipoVivienda: null,
  nombrePropietario: '',
  telefonoPropietario: '',
};

const initialDatosCorrespondencia: DatosCorrespondencia = {
  departamento: '',
  ciudad: '',
  barrio: '',
  mecanismosRecepcion: [],
};

const initialDatosIndependiente: DatosIndependiente = {
  actividadEconomica: '',
  nombreEmpresa: '',
  sectorEconomico: null,
  negocioEnVivienda: false,
  tiempoLocalMeses: null,
  tiempoActividadMeses: null,
  numeroEmpleados: null,
  direccionLocal: '',
  departamentoLocal: '',
  ciudadLocal: '',
  barrioLocal: '',
  telefono1: '',
  telefono2: '',
  tipoLocal: null,
  nombrePropietarioLocal: '',
  telefonoPropietarioLocal: '',
  registroMercantil: false,
};

const initialDatosAsalariado: DatosAsalariado = {
  nombreEmpresa: '',
  cargo: '',
  antiguedadMeses: null,
  direccionEmpresa: '',
  departamento: '',
  ciudad: '',
  barrio: '',
  telefono: '',
  tipoEmpresa: null,
  tipoContrato: null,
};

const initialReferencias: Referencias = {
  comercial: { nombre: '', telefono: '', parentesco: '' },
  personal: { nombre: '', cargo: '', parentesco: '', telefono: '' },
};

const initialOrigenFondos: OrigenFondos = {
  origenes: [],
  otroOrigen: '',
  complementoIngresos: '',
};

const initialInformacionFinanciera: InformacionFinanciera = {
  ingresosMensuales: 0,
  costoVentas: 0,
  gastosOperativos: 0,
  otrosIngresos: 0,
  egresosMensuales: 0,
  capacidadPago: 0,
  detalleOtrosIngresos: '',
  totalActivos: 0,
  totalPasivos: 0,
  ventasBrutasAnuales: 0,
};

const initialProductoSolicitado: ProductoSolicitado = {
  producto: null,
  modalidadCredito: null,
  tipoGarantia: null,
  productoMicrocredito: null,
  numeroCuenta: '',
};

const initialGarantias: Garantias = {
  aplicaFNG: false,
  periodoGraciaMeses: null,
  comisionFNG: 0,
  tipoCobro: null,
  aplicaUSAID: false,
  rangoMonto: null,
  diferidaCuotas: false,
  noTiene: false,
  cobro1erAno: null,
  cobro2doAno: null,
};

const initialDebitoAutomatico: DebitoAutomatico = {
  autoriza: false,
  tipoCuenta: null,
  numeroCuenta: '',
  nombreBanco: '',
};

const initialDesembolso: Desembolso = {
  metodo: null,
  numeroCuentaMibanco: '',
  tipoCuentaOtros: null,
  numeroCuentaOtros: '',
  nombreBancoOtros: '',
};

const initialInformacionPEP: InformacionPEP = {
  administraRecursosPublicos: false,
  esReconocidoPublicamente: false,
  desempenaCargosPublicos: false,
  esPEPExtranjero: false,
  esRepresentanteLegalInternacional: false,
  familiarEsPEP: false,
};

const initialOperacionesMonedaExtranjera: OperacionesMonedaExtranjera = {
  realizaOperaciones: false,
  tiposOperacion: [],
  otraOperacion: '',
  pais: '',
  ciudad: '',
  moneda: '',
  tieneProductos: false,
  tipoProducto: '',
  paisProducto: '',
  numeroProducto: '',
  montoCupo: 0,
};

const initialInformacionTributaria: InformacionTributaria = {
  esDeclaranteRenta: false,
  paisResidenciaFiscal: '',
  numeroTIN: '',
  soporteAdjunto: [],
  otroSoporte: '',
};

const initialEvaluacionAmbiental: EvaluacionAmbiental = {
  generaImpacto: false,
  necesitaPermiso: false,
  involucraEstrategias: false,
};

const initialCondicionEspecial: CondicionEspecial = {
  tieneDiscapacidad: false,
  tiposDiscapacidad: [],
};

const initialAutorizaciones: Autorizaciones = {
  autorizaCentrales: false,
  autorizaTratamientoDatos: false,
  confirmaRecepcionInfo: false,
  autorizaDestruccionDocumentos: false,
  aceptaCompromisoActualizacion: false,
  aceptaFondosGarantias: false,
};

const initialEstadoGestion: EstadoGestion = {
  estado: 'borrador',
};

// Store interface
interface FormStore {
  // Form data
  form: FormularioVinculacion;
  metadata: FormMetadata;

  // Actions - Set entire sections
  setDatosPersonales: (data: Partial<DatosPersonales>) => void;
  setDatosConyuge: (data: Partial<DatosConyuge>) => void;
  setDatosUbicacion: (data: Partial<DatosUbicacion>) => void;
  setDatosCorrespondencia: (data: Partial<DatosCorrespondencia>) => void;
  setDatosIndependiente: (data: Partial<DatosIndependiente>) => void;
  setDatosAsalariado: (data: Partial<DatosAsalariado>) => void;
  setReferencias: (data: Partial<Referencias>) => void;
  setOrigenFondos: (data: Partial<OrigenFondos>) => void;
  setInformacionFinanciera: (data: Partial<InformacionFinanciera>) => void;
  setProductoSolicitado: (data: Partial<ProductoSolicitado>) => void;
  setGarantias: (data: Partial<Garantias>) => void;
  setDebitoAutomatico: (data: Partial<DebitoAutomatico>) => void;
  setDesembolso: (data: Partial<Desembolso>) => void;
  setInformacionPEP: (data: Partial<InformacionPEP>) => void;
  setOperacionesMonedaExtranjera: (data: Partial<OperacionesMonedaExtranjera>) => void;
  setInformacionTributaria: (data: Partial<InformacionTributaria>) => void;
  setEvaluacionAmbiental: (data: Partial<EvaluacionAmbiental>) => void;
  setCondicionEspecial: (data: Partial<CondicionEspecial>) => void;
  setAutorizaciones: (data: Partial<Autorizaciones>) => void;

  // Firma y gestión
  setFirmaCliente: (firma: Firma | null) => void;
  setEstadoGestion: (data: Partial<EstadoGestion>) => void;
  iniciarGestion: () => string; // Retorna número de radicación

  // Navigation
  setCurrentStep: (step: number) => void;
  markStepComplete: (step: number) => void;
  isStepComplete: (step: number) => boolean;

  // Validation
  addWarning: (warning: ValidationWarning) => void;
  removeWarning: (field: string) => void;
  clearWarnings: () => void;

  // Persistence
  updateLastSaved: () => void;
  resetForm: () => void;
}

export const useFormStore = create<FormStore>()(
  persist(
    (set, get) => ({
      form: {
        datosPersonales: initialDatosPersonales,
        datosConyuge: initialDatosConyuge,
        datosUbicacion: initialDatosUbicacion,
        datosCorrespondencia: initialDatosCorrespondencia,
        datosIndependiente: initialDatosIndependiente,
        datosAsalariado: initialDatosAsalariado,
        referencias: initialReferencias,
        origenFondos: initialOrigenFondos,
        informacionFinanciera: initialInformacionFinanciera,
        productoSolicitado: initialProductoSolicitado,
        garantias: initialGarantias,
        debitoAutomatico: initialDebitoAutomatico,
        desembolso: initialDesembolso,
        informacionPEP: initialInformacionPEP,
        operacionesMonedaExtranjera: initialOperacionesMonedaExtranjera,
        informacionTributaria: initialInformacionTributaria,
        evaluacionAmbiental: initialEvaluacionAmbiental,
        condicionEspecial: initialCondicionEspecial,
        autorizaciones: initialAutorizaciones,
        firmaCliente: null,
        estadoGestion: initialEstadoGestion,
      },
      metadata: {
        currentStep: 1,
        completedSteps: [],
        warnings: [],
        startedAt: new Date().toISOString(),
        lastSavedAt: new Date().toISOString(),
      },

      // Section setters
      setDatosPersonales: (data) =>
        set((state) => ({
          form: {
            ...state.form,
            datosPersonales: { ...state.form.datosPersonales, ...data },
          },
        })),

      setDatosConyuge: (data) =>
        set((state) => ({
          form: {
            ...state.form,
            datosConyuge: { ...state.form.datosConyuge, ...data },
          },
        })),

      setDatosUbicacion: (data) =>
        set((state) => ({
          form: {
            ...state.form,
            datosUbicacion: { ...state.form.datosUbicacion, ...data },
          },
        })),

      setDatosCorrespondencia: (data) =>
        set((state) => ({
          form: {
            ...state.form,
            datosCorrespondencia: { ...state.form.datosCorrespondencia, ...data },
          },
        })),

      setDatosIndependiente: (data) =>
        set((state) => ({
          form: {
            ...state.form,
            datosIndependiente: { ...state.form.datosIndependiente, ...data },
          },
        })),

      setDatosAsalariado: (data) =>
        set((state) => ({
          form: {
            ...state.form,
            datosAsalariado: { ...state.form.datosAsalariado, ...data },
          },
        })),

      setReferencias: (data) =>
        set((state) => ({
          form: {
            ...state.form,
            referencias: { ...state.form.referencias, ...data },
          },
        })),

      setOrigenFondos: (data) =>
        set((state) => ({
          form: {
            ...state.form,
            origenFondos: { ...state.form.origenFondos, ...data },
          },
        })),

      setInformacionFinanciera: (data) =>
        set((state) => ({
          form: {
            ...state.form,
            informacionFinanciera: { ...state.form.informacionFinanciera, ...data },
          },
        })),

      setProductoSolicitado: (data) =>
        set((state) => ({
          form: {
            ...state.form,
            productoSolicitado: { ...state.form.productoSolicitado, ...data },
          },
        })),

      setGarantias: (data) =>
        set((state) => ({
          form: {
            ...state.form,
            garantias: { ...state.form.garantias, ...data },
          },
        })),

      setDebitoAutomatico: (data) =>
        set((state) => ({
          form: {
            ...state.form,
            debitoAutomatico: { ...state.form.debitoAutomatico, ...data },
          },
        })),

      setDesembolso: (data) =>
        set((state) => ({
          form: {
            ...state.form,
            desembolso: { ...state.form.desembolso, ...data },
          },
        })),

      setInformacionPEP: (data) =>
        set((state) => ({
          form: {
            ...state.form,
            informacionPEP: { ...state.form.informacionPEP, ...data },
          },
        })),

      setOperacionesMonedaExtranjera: (data) =>
        set((state) => ({
          form: {
            ...state.form,
            operacionesMonedaExtranjera: { ...state.form.operacionesMonedaExtranjera, ...data },
          },
        })),

      setInformacionTributaria: (data) =>
        set((state) => ({
          form: {
            ...state.form,
            informacionTributaria: { ...state.form.informacionTributaria, ...data },
          },
        })),

      setEvaluacionAmbiental: (data) =>
        set((state) => ({
          form: {
            ...state.form,
            evaluacionAmbiental: { ...state.form.evaluacionAmbiental, ...data },
          },
        })),

      setCondicionEspecial: (data) =>
        set((state) => ({
          form: {
            ...state.form,
            condicionEspecial: { ...state.form.condicionEspecial, ...data },
          },
        })),

      setAutorizaciones: (data) =>
        set((state) => ({
          form: {
            ...state.form,
            autorizaciones: { ...state.form.autorizaciones, ...data },
          },
        })),

      // Firma y gestión
      setFirmaCliente: (firma) =>
        set((state) => ({
          form: {
            ...state.form,
            firmaCliente: firma,
            estadoGestion: firma
              ? { ...state.form.estadoGestion, estado: 'firmado', fechaFirma: new Date().toISOString() }
              : { ...state.form.estadoGestion, estado: 'borrador', fechaFirma: undefined },
          },
        })),

      setEstadoGestion: (data) =>
        set((state) => ({
          form: {
            ...state.form,
            estadoGestion: { ...state.form.estadoGestion, ...data },
          },
        })),

      iniciarGestion: () => {
        const numeroRadicacion = `VIN-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 999999)).padStart(6, '0')}`;
        set((state) => ({
          form: {
            ...state.form,
            estadoGestion: {
              ...state.form.estadoGestion,
              estado: 'enviado_validacion',
              fechaEnvioValidacion: new Date().toISOString(),
              numeroRadicacion,
            },
          },
        }));
        return numeroRadicacion;
      },

      // Navigation
      setCurrentStep: (step) =>
        set((state) => ({
          metadata: { ...state.metadata, currentStep: step },
        })),

      markStepComplete: (step) =>
        set((state) => ({
          metadata: {
            ...state.metadata,
            completedSteps: state.metadata.completedSteps.includes(step)
              ? state.metadata.completedSteps
              : [...state.metadata.completedSteps, step],
          },
        })),

      isStepComplete: (step) => get().metadata.completedSteps.includes(step),

      // Validation
      addWarning: (warning) =>
        set((state) => ({
          metadata: {
            ...state.metadata,
            warnings: [
              ...state.metadata.warnings.filter((w) => w.field !== warning.field),
              warning,
            ],
          },
        })),

      removeWarning: (field) =>
        set((state) => ({
          metadata: {
            ...state.metadata,
            warnings: state.metadata.warnings.filter((w) => w.field !== field),
          },
        })),

      clearWarnings: () =>
        set((state) => ({
          metadata: { ...state.metadata, warnings: [] },
        })),

      // Persistence
      updateLastSaved: () =>
        set((state) => ({
          metadata: { ...state.metadata, lastSavedAt: new Date().toISOString() },
        })),

      resetForm: () =>
        set({
          form: {
            datosPersonales: initialDatosPersonales,
            datosConyuge: initialDatosConyuge,
            datosUbicacion: initialDatosUbicacion,
            datosCorrespondencia: initialDatosCorrespondencia,
            datosIndependiente: initialDatosIndependiente,
            datosAsalariado: initialDatosAsalariado,
            referencias: initialReferencias,
            origenFondos: initialOrigenFondos,
            informacionFinanciera: initialInformacionFinanciera,
            productoSolicitado: initialProductoSolicitado,
            garantias: initialGarantias,
            debitoAutomatico: initialDebitoAutomatico,
            desembolso: initialDesembolso,
            informacionPEP: initialInformacionPEP,
            operacionesMonedaExtranjera: initialOperacionesMonedaExtranjera,
            informacionTributaria: initialInformacionTributaria,
            evaluacionAmbiental: initialEvaluacionAmbiental,
            condicionEspecial: initialCondicionEspecial,
            autorizaciones: initialAutorizaciones,
            firmaCliente: null,
            estadoGestion: initialEstadoGestion,
          },
          metadata: {
            currentStep: 1,
            completedSteps: [],
            warnings: [],
            startedAt: new Date().toISOString(),
            lastSavedAt: new Date().toISOString(),
          },
        }),
    }),
    {
      name: 'formulario-vinculacion-storage',
    }
  )
);
