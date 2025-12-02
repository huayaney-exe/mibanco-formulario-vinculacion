// Form options/dropdowns

export const tipoDocumentoOptions = [
  { value: 'CC', label: 'Cédula de Ciudadanía' },
  { value: 'CE', label: 'Cédula de Extranjería' },
  { value: 'Pasaporte', label: 'Pasaporte' },
  { value: 'Otro', label: 'Otro' },
];

export const estadoCivilOptions = [
  { value: 'soltero', label: 'Soltero(a)' },
  { value: 'casado', label: 'Casado(a)' },
  { value: 'union_libre', label: 'Unión libre' },
  { value: 'viudo', label: 'Viudo(a)' },
  { value: 'divorciado', label: 'Divorciado(a)' },
];

export const nivelEducativoOptions = [
  { value: 'na', label: 'N/A' },
  { value: 'primaria', label: 'Primaria' },
  { value: 'bachillerato', label: 'Bachillerato' },
  { value: 'tecnico', label: 'Técnico' },
  { value: 'tecnologo', label: 'Tecnólogo' },
  { value: 'universitario', label: 'Universitario' },
  { value: 'postgrado', label: 'Postgrado' },
];

export const coberturaSaludOptions = [
  { value: 'sisben', label: 'SISBÉN' },
  { value: 'eps', label: 'EPS' },
  { value: 'prepagada', label: 'Prepagada' },
  { value: 'plan_complementario', label: 'Plan Complementario' },
  { value: 'na', label: 'N/A' },
];

export const etniaOptions = [
  { value: 'ninguno', label: 'Ningún grupo étnico' },
  { value: 'gitano', label: 'Gitano' },
  { value: 'indigena', label: 'Indígena' },
  { value: 'palenquero', label: 'Palenquero de San Basilio' },
  { value: 'raizal', label: 'Raizal del archipiélago de San Andrés, Providencia y Santa Catalina' },
  { value: 'afrodescendiente', label: 'Negro, Mulato, Afrodescendiente' },
];

export const ocupacionOptions = [
  { value: 'independiente', label: 'Independiente' },
  { value: 'asalariado', label: 'Asalariado' },
  { value: 'pensionado', label: 'Pensionado' },
  { value: 'jubilado', label: 'Jubilado' },
  { value: 'rentista', label: 'Rentista' },
  { value: 'otro', label: 'Otro' },
];

export const tipoViviendaOptions = [
  { value: 'propia_sin_hipoteca', label: 'Propia sin hipoteca' },
  { value: 'propia_con_hipoteca', label: 'Propia con hipoteca' },
  { value: 'arrendada', label: 'Arrendada' },
  { value: 'familiar', label: 'Familiar' },
];

export const estratoOptions = [
  { value: '1', label: 'Estrato 1' },
  { value: '2', label: 'Estrato 2' },
  { value: '3', label: 'Estrato 3' },
  { value: '4', label: 'Estrato 4' },
  { value: '5', label: 'Estrato 5' },
  { value: '6', label: 'Estrato 6' },
];

export const sectorEconomicoOptions = [
  { value: 'comercio', label: 'Comercio' },
  { value: 'servicio', label: 'Servicio' },
  { value: 'produccion', label: 'Producción' },
  { value: 'agropecuario', label: 'Agropecuario' },
];

export const tipoLocalOptions = [
  { value: 'propia_sin_hipoteca', label: 'Propia sin hipoteca' },
  { value: 'propia_con_hipoteca', label: 'Propia con hipoteca' },
  { value: 'arrendada', label: 'Arrendada' },
  { value: 'familiar', label: 'Familiar' },
  { value: 'ambulante', label: 'Ambulante' },
];

export const tipoEmpresaOptions = [
  { value: 'privada', label: 'Privada' },
  { value: 'publica', label: 'Pública' },
  { value: 'mixta', label: 'Mixta' },
];

export const tipoContratoOptions = [
  { value: 'prestacion_servicios', label: 'Prestación de servicios' },
  { value: 'obra_labor', label: 'Obra o labor contratada' },
  { value: 'fijo', label: 'Fijo' },
  { value: 'aprendizaje', label: 'Aprendizaje' },
];

export const origenFondosOptions = [
  { value: 'herencia', label: 'Herencia' },
  { value: 'prestamos', label: 'Préstamos' },
  { value: 'aportes_familiares', label: 'Aportes Familiares' },
  { value: 'otros', label: 'Otros' },
];

export const modalidadCreditoOptions = [
  { value: 'comercial', label: 'Comercial' },
  { value: 'consumo', label: 'Consumo' },
  { value: 'vivienda', label: 'Vivienda' },
];

export const tipoGarantiaOptions = [
  { value: 'individual', label: 'Individual' },
  { value: 'conjunta', label: 'Conjunta' },
  { value: 'alterna', label: 'Alterna' },
];

export const productoMicrocreditoOptions = [
  { value: 'rentadiaria', label: 'Mibanco Rentadiaria' },
  { value: 'proposito_milagroso', label: 'Propósito Milagroso' },
  { value: 'popular_rural', label: 'Popular rural' },
  { value: 'popular_urbano', label: 'Popular urbano' },
  { value: 'produc_rural', label: 'Produc rural' },
  { value: 'produc_urbano', label: 'Produc urbano' },
];

export const mecanismosRecepcionOptions = [
  { value: 'correo_electronico', label: 'Correo electrónico' },
  { value: 'direccion_residencia', label: 'Dirección de residencia' },
  { value: 'direccion_empresa', label: 'Dirección de empresa' },
  { value: 'celular_sms', label: 'Celular/SMS' },
];

export const tipoOperacionMonedaExtranjeraOptions = [
  { value: 'exportador', label: 'Exportador' },
  { value: 'importador', label: 'Importador' },
  { value: 'inversiones', label: 'Inversiones' },
  { value: 'prestamos', label: 'Préstamos' },
  { value: 'pago_servicios', label: 'Pago de servicios' },
  { value: 'giros_remesas', label: 'Envío/Recepción de giros y remesas' },
  { value: 'otra', label: 'Otra' },
];

export const tipoDiscapacidadOptions = [
  { value: 'intelectual_cognitiva', label: 'Intelectual o cognitiva' },
  { value: 'mental_psicosocial', label: 'Mental o psicosocial' },
  { value: 'visual', label: 'Visual' },
  { value: 'auditiva', label: 'Auditiva' },
  { value: 'otra', label: 'Otra' },
];

export const rolSolicitanteOptions = [
  { value: 'solicitante', label: 'Solicitante' },
  { value: 'firma_solidaria', label: 'Firma Solidaria' },
  { value: 'representante_legal', label: 'Representante Legal' },
  { value: 'corresponsal_bancario', label: 'Corresponsal Bancario' },
  { value: 'codeudor', label: 'Codeudor' },
];

export const bancosOptions = [
  { value: 'bancolombia', label: 'Bancolombia' },
  { value: 'davivienda', label: 'Davivienda' },
  { value: 'bbva', label: 'BBVA Colombia' },
  { value: 'banco_bogota', label: 'Banco de Bogotá' },
  { value: 'banco_occidente', label: 'Banco de Occidente' },
  { value: 'banco_popular', label: 'Banco Popular' },
  { value: 'av_villas', label: 'AV Villas' },
  { value: 'scotiabank', label: 'Scotiabank Colpatria' },
  { value: 'itau', label: 'Itaú' },
  { value: 'banco_agrario', label: 'Banco Agrario' },
  { value: 'banco_caja_social', label: 'Banco Caja Social' },
  { value: 'banco_falabella', label: 'Banco Falabella' },
  { value: 'bancoomeva', label: 'Bancoomeva' },
  { value: 'banco_pichincha', label: 'Banco Pichincha' },
  { value: 'nequi', label: 'Nequi' },
  { value: 'daviplata', label: 'Daviplata' },
  { value: 'otro', label: 'Otro' },
];
