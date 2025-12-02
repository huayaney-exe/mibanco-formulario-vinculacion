// Form Types for Formulario de Vinculación MIBANCO

export type TipoVinculacion = 'nuevo' | 'renovado';

export type RolSolicitante =
  | 'solicitante'
  | 'firma_solidaria'
  | 'representante_legal'
  | 'corresponsal_bancario'
  | 'codeudor';

export type TipoDocumento = 'CC' | 'CE' | 'Pasaporte' | 'Otro';

export type EstadoCivil =
  | 'soltero'
  | 'casado'
  | 'union_libre'
  | 'viudo'
  | 'divorciado';

export type NivelEducativo =
  | 'na'
  | 'primaria'
  | 'bachillerato'
  | 'tecnico'
  | 'tecnologo'
  | 'universitario'
  | 'postgrado';

export type CoberturaSalud = 'sisben' | 'eps' | 'prepagada' | 'plan_complementario' | 'na';

export type Ocupacion =
  | 'independiente'
  | 'asalariado'
  | 'pensionado'
  | 'jubilado'
  | 'rentista'
  | 'otro';

export type TipoVivienda =
  | 'propia_sin_hipoteca'
  | 'propia_con_hipoteca'
  | 'arrendada'
  | 'familiar';

export type TipoLocal =
  | 'propia_sin_hipoteca'
  | 'propia_con_hipoteca'
  | 'arrendada'
  | 'familiar'
  | 'ambulante';

export type SectorEconomico = 'comercio' | 'servicio' | 'produccion' | 'agropecuario';

export type TipoEmpresa = 'privada' | 'publica' | 'mixta';

export type TipoContrato =
  | 'prestacion_servicios'
  | 'obra_labor'
  | 'fijo'
  | 'aprendizaje';

export type ModalidadCredito = 'comercial' | 'consumo' | 'vivienda';

export type TipoGarantia = 'individual' | 'conjunta' | 'alterna';

export type ProductoMicrocredito =
  | 'rentadiaria'
  | 'proposito_milagroso'
  | 'popular_rural'
  | 'popular_urbano'
  | 'produc_rural'
  | 'produc_urbano';

// Section interfaces
export interface DatosPersonales {
  tipoVinculacion: TipoVinculacion | null;
  rol: RolSolicitante | null;
  tipoDocumento: TipoDocumento | null;
  tipoDocumentoOtro: string;
  numeroDocumento: string;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  fechaNacimiento: string;
  estadoCivil: EstadoCivil | null;
  personasACargo: number;
  nivelEducativo: NivelEducativo | null;
  profesion: string;
  coberturaSalud: CoberturaSalud | null;
  etnia: string;
  tieneOtraNacionalidad: boolean;
  paisNacionalidad: string;
  ocupacion: Ocupacion | null;
  ocupacionOtra: string;
  tieneVinculoMibanco: boolean;
  cualVinculo: string;
  tieneFamiliaresMibanco: boolean;
  cualFamiliar: string;
  celular: string;
  email: string;
}

export interface DatosConyuge {
  tipoDocumento: TipoDocumento | null;
  numeroDocumento: string;
  nombresApellidos: string;
  telefono: string;
}

export interface DatosUbicacion {
  direccionResidencia: string;
  departamento: string;
  ciudad: string;
  barrio: string;
  estrato: number | null;
  telefonoFijo: string;
  tiempoResidenciaMeses: number | null;
  tipoVivienda: TipoVivienda | null;
  nombrePropietario: string;
  telefonoPropietario: string;
}

export interface DatosCorrespondencia {
  departamento: string;
  ciudad: string;
  barrio: string;
  mecanismosRecepcion: string[];
}

export interface DatosIndependiente {
  actividadEconomica: string;
  nombreEmpresa: string;
  sectorEconomico: SectorEconomico | null;
  negocioEnVivienda: boolean;
  tiempoLocalMeses: number | null;
  tiempoActividadMeses: number | null;
  numeroEmpleados: number | null;
  direccionLocal: string;
  departamentoLocal: string;
  ciudadLocal: string;
  barrioLocal: string;
  telefono1: string;
  telefono2: string;
  tipoLocal: TipoLocal | null;
  nombrePropietarioLocal: string;
  telefonoPropietarioLocal: string;
  registroMercantil: boolean;
}

export interface DatosAsalariado {
  nombreEmpresa: string;
  cargo: string;
  antiguedadMeses: number | null;
  direccionEmpresa: string;
  departamento: string;
  ciudad: string;
  barrio: string;
  telefono: string;
  tipoEmpresa: TipoEmpresa | null;
  tipoContrato: TipoContrato | null;
}

export interface Referencias {
  comercial: {
    nombre: string;
    telefono: string;
    parentesco: string;
  };
  personal: {
    nombre: string;
    cargo: string;
    parentesco: string;
    telefono: string;
  };
}

export interface OrigenFondos {
  origenes: string[];
  otroOrigen: string;
  complementoIngresos: string;
}

export interface InformacionFinanciera {
  ingresosMensuales: number;
  costoVentas: number;
  gastosOperativos: number;
  otrosIngresos: number;
  egresosMensuales: number;
  capacidadPago: number; // Calculated
  detalleOtrosIngresos: string;
  totalActivos: number;
  totalPasivos: number;
  ventasBrutasAnuales: number;
}

export interface ProductoSolicitado {
  producto: 'cuenta_ahorros' | 'credito' | null;
  modalidadCredito: ModalidadCredito | null;
  tipoGarantia: TipoGarantia | null;
  productoMicrocredito: ProductoMicrocredito | null;
  numeroCuenta: string;
}

export interface InformacionPEP {
  administraRecursosPublicos: boolean;
  esReconocidoPublicamente: boolean;
  desempenaCargosPublicos: boolean;
  esPEPExtranjero: boolean;
  esRepresentanteLegalInternacional: boolean;
  familiarEsPEP: boolean;
}

export interface OperacionesMonedaExtranjera {
  realizaOperaciones: boolean;
  tiposOperacion: string[];
  otraOperacion: string;
  pais: string;
  ciudad: string;
  moneda: string;
  tieneProductos: boolean;
  tipoProducto: string;
  paisProducto: string;
  numeroProducto: string;
  montoCupo: number;
}

export interface InformacionTributaria {
  esDeclaranteRenta: boolean;
  paisResidenciaFiscal: string;
  numeroTIN: string;
  soporteAdjunto: string[];
  otroSoporte: string;
}

export interface Garantias {
  aplicaFNG: boolean;
  periodoGraciaMeses: number | null;
  comisionFNG: number;
  tipoCobro: 'anticipado_unico' | 'anticipado_anual' | null;
  aplicaUSAID: boolean;
  rangoMonto: 'menor_4smmlv' | 'mayor_4smmlv' | null;
  diferidaCuotas: boolean;
  noTiene: boolean;
  cobro1erAno: 'anticipado' | 'diferida' | null;
  cobro2doAno: 'anticipado' | 'diferida' | null;
}

export interface DebitoAutomatico {
  autoriza: boolean;
  tipoCuenta: 'ahorros' | 'corriente' | null;
  numeroCuenta: string;
  nombreBanco: string;
}

export interface Desembolso {
  metodo: 'cuenta_mibanco' | 'cuenta_otros' | null;
  numeroCuentaMibanco: string;
  tipoCuentaOtros: 'ahorros' | 'corriente' | null;
  numeroCuentaOtros: string;
  nombreBancoOtros: string;
}

export interface EvaluacionAmbiental {
  generaImpacto: boolean;
  necesitaPermiso: boolean;
  involucraEstrategias: boolean;
}

export interface CondicionEspecial {
  tieneDiscapacidad: boolean;
  tiposDiscapacidad: string[];
}

export interface Autorizaciones {
  autorizaCentrales: boolean;
  autorizaTratamientoDatos: boolean;
  confirmaRecepcionInfo: boolean;
  autorizaDestruccionDocumentos: boolean;
  aceptaCompromisoActualizacion: boolean;
  aceptaFondosGarantias: boolean;
}

// Complete Form State
export interface FormularioVinculacion {
  // Step 1
  datosPersonales: DatosPersonales;
  datosConyuge: DatosConyuge;
  datosUbicacion: DatosUbicacion;

  // Step 2
  datosCorrespondencia: DatosCorrespondencia;
  datosIndependiente: DatosIndependiente;
  datosAsalariado: DatosAsalariado;
  referencias: Referencias;

  // Step 3
  origenFondos: OrigenFondos;
  informacionFinanciera: InformacionFinanciera;

  // Step 4
  productoSolicitado: ProductoSolicitado;
  garantias: Garantias;
  debitoAutomatico: DebitoAutomatico;
  desembolso: Desembolso;

  // Step 5
  informacionPEP: InformacionPEP;
  operacionesMonedaExtranjera: OperacionesMonedaExtranjera;
  informacionTributaria: InformacionTributaria;

  // Step 6
  evaluacionAmbiental: EvaluacionAmbiental;
  condicionEspecial: CondicionEspecial;
  autorizaciones: Autorizaciones;
}

// Validation Warning (soft validation)
export interface ValidationWarning {
  field: string;
  message: string;
}

// Form Metadata
export interface FormMetadata {
  currentStep: number;
  completedSteps: number[];
  warnings: ValidationWarning[];
  startedAt: string;
  lastSavedAt: string;
}
