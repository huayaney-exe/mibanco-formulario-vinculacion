import { jsPDF } from 'jspdf';
import type { FormularioVinculacion } from '@/types/form';

// MIBANCO brand colors
const COLORS = {
  green: [0, 147, 48] as [number, number, number],
  yellow: [255, 206, 0] as [number, number, number],
  black: [0, 0, 0] as [number, number, number],
  gray: [128, 128, 128] as [number, number, number],
  lightGray: [200, 200, 200] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
};

// Labels for form fields
const LABELS = {
  tipoVinculacion: {
    nuevo: 'Crédito Nuevo',
    renovado: 'Crédito Renovado',
  },
  rol: {
    solicitante: 'Solicitante',
    firma_solidaria: 'Firma Solidaria',
    representante_legal: 'Representante Legal',
    corresponsal_bancario: 'Corresponsal Bancario',
    codeudor: 'Codeudor',
  },
  tipoDocumento: {
    CC: 'C.C.',
    CE: 'C.E.',
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
};

class PDFGenerator {
  private pdf: jsPDF;
  private pageWidth: number;
  private pageHeight: number;
  private margin: number;
  private y: number;
  private lineHeight: number;

  constructor() {
    this.pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'letter',
    });
    this.pageWidth = this.pdf.internal.pageSize.getWidth();
    this.pageHeight = this.pdf.internal.pageSize.getHeight();
    this.margin = 10;
    this.y = this.margin;
    this.lineHeight = 5;
  }

  private checkPageBreak(height: number = 20): void {
    if (this.y + height > this.pageHeight - this.margin) {
      this.pdf.addPage();
      this.y = this.margin;
    }
  }

  private drawHeader(): void {
    // Green header bar
    this.pdf.setFillColor(...COLORS.green);
    this.pdf.rect(0, 0, this.pageWidth, 25, 'F');

    // Title
    this.pdf.setTextColor(...COLORS.white);
    this.pdf.setFontSize(14);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text('MIBANCO COLOMBIA S.A.', this.pageWidth / 2, 10, { align: 'center' });

    this.pdf.setFontSize(11);
    this.pdf.text('FORMULARIO DE VINCULACIÓN Y SOLICITUD DE PRODUCTOS', this.pageWidth / 2, 17, { align: 'center' });

    // Date on the right
    const today = new Date();
    const dateStr = today.toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' });
    this.pdf.setFontSize(8);
    this.pdf.text(`Fecha: ${dateStr}`, this.pageWidth - this.margin, 22, { align: 'right' });

    // Version
    this.pdf.text('V3.7', this.margin, 22);

    this.y = 30;
  }

  private drawSectionHeader(title: string): void {
    this.checkPageBreak(15);

    // Green background for section header
    this.pdf.setFillColor(...COLORS.green);
    this.pdf.rect(this.margin, this.y, this.pageWidth - (this.margin * 2), 7, 'F');

    this.pdf.setTextColor(...COLORS.white);
    this.pdf.setFontSize(9);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text(title, this.margin + 2, this.y + 5);

    this.y += 9;
    this.pdf.setTextColor(...COLORS.black);
  }

  private drawCheckbox(x: number, y: number, checked: boolean, label: string): number {
    const boxSize = 3.5;

    // Draw checkbox
    this.pdf.setDrawColor(...COLORS.black);
    this.pdf.setLineWidth(0.3);
    this.pdf.rect(x, y, boxSize, boxSize);

    if (checked) {
      this.pdf.setFillColor(...COLORS.green);
      this.pdf.rect(x + 0.5, y + 0.5, boxSize - 1, boxSize - 1, 'F');
    }

    // Draw label
    this.pdf.setFontSize(8);
    this.pdf.setFont('helvetica', 'normal');
    this.pdf.text(label, x + boxSize + 2, y + 3);

    return this.pdf.getTextWidth(label) + boxSize + 4;
  }

  private drawField(label: string, value: string | number | null | undefined, x: number, y: number, width: number): void {
    const displayValue = value?.toString() || '';

    // Label
    this.pdf.setFontSize(7);
    this.pdf.setFont('helvetica', 'normal');
    this.pdf.setTextColor(...COLORS.gray);
    this.pdf.text(label, x, y);

    // Value box
    this.pdf.setDrawColor(...COLORS.lightGray);
    this.pdf.setLineWidth(0.2);
    this.pdf.rect(x, y + 1, width, 5);

    // Value text
    this.pdf.setFontSize(8);
    this.pdf.setFont('helvetica', 'normal');
    this.pdf.setTextColor(...COLORS.black);
    this.pdf.text(displayValue, x + 1, y + 4.5);
  }

  private drawFieldRow(fields: Array<{ label: string; value: string | number | null | undefined; width: number }>): void {
    this.checkPageBreak(12);

    let x = this.margin;
    const labelY = this.y;

    for (const field of fields) {
      this.drawField(field.label, field.value, x, labelY, field.width);
      x += field.width + 3;
    }

    this.y += 10;
  }

  private drawCheckboxRow(options: Array<{ label: string; checked: boolean }>, startX?: number): void {
    let x = startX || this.margin;

    for (const option of options) {
      const width = this.drawCheckbox(x, this.y, option.checked, option.label);
      x += width + 2;
    }
  }

  private formatCurrency(value: number | null | undefined): string {
    if (value === null || value === undefined) return '';
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }

  private formatPhone(phone: string | null | undefined): string {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
    }
    return phone;
  }

  public generate(form: FormularioVinculacion): jsPDF {
    const {
      datosPersonales,
      datosConyuge,
      datosUbicacion,
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
      firmaCliente,
    } = form;

    // ========== PAGE 1 ==========
    this.drawHeader();

    // TIPO DE VINCULACIÓN
    this.drawSectionHeader('TIPO DE VINCULACIÓN');
    this.drawCheckboxRow([
      { label: 'Crédito Nuevo', checked: datosPersonales.tipoVinculacion === 'nuevo' },
      { label: 'Crédito Renovado', checked: datosPersonales.tipoVinculacion === 'renovado' },
    ]);
    this.y += 6;

    this.drawCheckboxRow([
      { label: 'Solicitante', checked: datosPersonales.rol === 'solicitante' },
      { label: 'Firma Solidaria', checked: datosPersonales.rol === 'firma_solidaria' },
      { label: 'Codeudor', checked: datosPersonales.rol === 'codeudor' },
      { label: 'Representante Legal', checked: datosPersonales.rol === 'representante_legal' },
      { label: 'Corresponsal Bancario', checked: datosPersonales.rol === 'corresponsal_bancario' },
    ]);
    this.y += 8;

    // PRODUCTO SOLICITADO
    this.drawSectionHeader('PRODUCTO SOLICITADO');
    this.drawCheckboxRow([
      { label: 'Cuenta de Ahorros', checked: productoSolicitado.producto === 'cuenta_ahorros' },
      { label: 'Crédito', checked: productoSolicitado.producto === 'credito' },
    ]);
    this.y += 8;

    // DATOS PERSONALES
    this.drawSectionHeader('DATOS PERSONALES');

    const contentWidth = this.pageWidth - (this.margin * 2);
    const col2 = contentWidth / 2;
    const col4 = contentWidth / 4;

    this.drawFieldRow([
      { label: 'PRIMER NOMBRE', value: datosPersonales.primerNombre, width: col4 - 2 },
      { label: 'SEGUNDO NOMBRE', value: datosPersonales.segundoNombre, width: col4 - 2 },
      { label: 'PRIMER APELLIDO', value: datosPersonales.primerApellido, width: col4 - 2 },
      { label: 'SEGUNDO APELLIDO', value: datosPersonales.segundoApellido, width: col4 - 2 },
    ]);

    // Tipo de documento row
    this.pdf.setFontSize(7);
    this.pdf.setTextColor(...COLORS.gray);
    this.pdf.text('TIPO DE DOCUMENTO:', this.margin, this.y + 3);

    this.drawCheckboxRow([
      { label: 'C.C.', checked: datosPersonales.tipoDocumento === 'CC' },
      { label: 'C.E.', checked: datosPersonales.tipoDocumento === 'CE' },
      { label: 'Pasaporte', checked: datosPersonales.tipoDocumento === 'Pasaporte' },
      { label: 'Otro', checked: datosPersonales.tipoDocumento === 'Otro' },
    ], this.margin + 35);

    this.pdf.text('No. DOCUMENTO:', this.margin + 100, this.y + 3);
    this.drawField('', datosPersonales.numeroDocumento, this.margin + 125, this.y, 60);
    this.y += 10;

    // Estado civil
    this.pdf.setFontSize(7);
    this.pdf.setTextColor(...COLORS.gray);
    this.pdf.text('ESTADO CIVIL:', this.margin, this.y + 3);

    this.drawCheckboxRow([
      { label: 'Soltero(a)', checked: datosPersonales.estadoCivil === 'soltero' },
      { label: 'Casado(a)', checked: datosPersonales.estadoCivil === 'casado' },
      { label: 'Unión libre', checked: datosPersonales.estadoCivil === 'union_libre' },
      { label: 'Viudo(a)', checked: datosPersonales.estadoCivil === 'viudo' },
      { label: 'Divorciado(a)', checked: datosPersonales.estadoCivil === 'divorciado' },
    ], this.margin + 25);
    this.y += 8;

    this.drawFieldRow([
      { label: 'FECHA DE NACIMIENTO', value: datosPersonales.fechaNacimiento, width: col4 },
      { label: 'CELULAR', value: this.formatPhone(datosPersonales.celular), width: col4 },
      { label: 'CORREO ELECTRÓNICO', value: datosPersonales.email, width: col2 - 5 },
    ]);

    // Ocupación
    this.pdf.setFontSize(7);
    this.pdf.setTextColor(...COLORS.gray);
    this.pdf.text('OCUPACIÓN:', this.margin, this.y + 3);

    this.drawCheckboxRow([
      { label: 'Independiente', checked: datosPersonales.ocupacion === 'independiente' },
      { label: 'Asalariado', checked: datosPersonales.ocupacion === 'asalariado' },
      { label: 'Pensionado', checked: datosPersonales.ocupacion === 'pensionado' },
      { label: 'Jubilado', checked: datosPersonales.ocupacion === 'jubilado' },
      { label: 'Rentista', checked: datosPersonales.ocupacion === 'rentista' },
    ], this.margin + 22);
    this.y += 8;

    this.drawFieldRow([
      { label: 'PERSONAS A CARGO', value: datosPersonales.personasACargo, width: col4 - 10 },
    ]);

    // DATOS CÓNYUGE (if married or union libre)
    if (datosPersonales.estadoCivil === 'casado' || datosPersonales.estadoCivil === 'union_libre') {
      this.drawSectionHeader('DATOS CÓNYUGE O COMPAÑERO PERMANENTE');

      this.pdf.setFontSize(7);
      this.pdf.setTextColor(...COLORS.gray);
      this.pdf.text('TIPO DE DOCUMENTO:', this.margin, this.y + 3);

      this.drawCheckboxRow([
        { label: 'C.C.', checked: datosConyuge.tipoDocumento === 'CC' },
        { label: 'C.E.', checked: datosConyuge.tipoDocumento === 'CE' },
        { label: 'Pasaporte', checked: datosConyuge.tipoDocumento === 'Pasaporte' },
      ], this.margin + 35);
      this.y += 8;

      this.drawFieldRow([
        { label: 'No. DOCUMENTO', value: datosConyuge.numeroDocumento, width: col4 },
        { label: 'NOMBRES Y APELLIDOS', value: datosConyuge.nombresApellidos, width: col2 },
        { label: 'TELÉFONO', value: this.formatPhone(datosConyuge.telefono), width: col4 - 5 },
      ]);
    }

    // DATOS DE UBICACIÓN
    this.drawSectionHeader('DATOS DE UBICACIÓN (COLOMBIA)');

    this.drawFieldRow([
      { label: 'DIRECCIÓN RESIDENCIA', value: datosUbicacion.direccionResidencia, width: contentWidth - 5 },
    ]);

    this.drawFieldRow([
      { label: 'DEPARTAMENTO', value: datosUbicacion.departamento, width: col4 },
      { label: 'CIUDAD/MUNICIPIO', value: datosUbicacion.ciudad, width: col4 },
      { label: 'BARRIO/VEREDA', value: datosUbicacion.barrio, width: col4 },
      { label: 'ESTRATO', value: datosUbicacion.estrato, width: col4 - 10 },
    ]);

    // Tipo de vivienda
    this.pdf.setFontSize(7);
    this.pdf.setTextColor(...COLORS.gray);
    this.pdf.text('TIPO DE VIVIENDA:', this.margin, this.y + 3);

    this.drawCheckboxRow([
      { label: 'Propia sin hipoteca', checked: datosUbicacion.tipoVivienda === 'propia_sin_hipoteca' },
      { label: 'Propia con hipoteca', checked: datosUbicacion.tipoVivienda === 'propia_con_hipoteca' },
      { label: 'Arrendada', checked: datosUbicacion.tipoVivienda === 'arrendada' },
      { label: 'Familiar', checked: datosUbicacion.tipoVivienda === 'familiar' },
    ], this.margin + 32);

    this.pdf.text('Tiempo de residencia (meses):', this.margin + 140, this.y + 3);
    this.drawField('', datosUbicacion.tiempoResidenciaMeses, this.margin + 175, this.y, 15);
    this.y += 10;

    // DATOS PARA CLIENTES INDEPENDIENTES
    if (datosPersonales.ocupacion === 'independiente') {
      this.drawSectionHeader('DATOS PARA CLIENTES INDEPENDIENTES');

      this.drawFieldRow([
        { label: 'ACTIVIDAD ECONÓMICA PRINCIPAL', value: datosIndependiente.actividadEconomica, width: col2 },
        { label: 'NOMBRE DE LA EMPRESA', value: datosIndependiente.nombreEmpresa, width: col2 - 5 },
      ]);

      // Sector económico
      this.pdf.setFontSize(7);
      this.pdf.setTextColor(...COLORS.gray);
      this.pdf.text('SECTOR ECONÓMICO:', this.margin, this.y + 3);

      this.drawCheckboxRow([
        { label: 'Comercio', checked: datosIndependiente.sectorEconomico === 'comercio' },
        { label: 'Servicio', checked: datosIndependiente.sectorEconomico === 'servicio' },
        { label: 'Producción', checked: datosIndependiente.sectorEconomico === 'produccion' },
        { label: 'Agropecuario', checked: datosIndependiente.sectorEconomico === 'agropecuario' },
      ], this.margin + 35);
      this.y += 8;

      // Negocio en vivienda
      this.pdf.text('¿EL NEGOCIO SE ENCUENTRA EN LA VIVIENDA?', this.margin, this.y + 3);
      this.drawCheckboxRow([
        { label: 'Sí', checked: datosIndependiente.negocioEnVivienda === true },
        { label: 'No', checked: datosIndependiente.negocioEnVivienda === false },
      ], this.margin + 75);
      this.y += 8;

      this.drawFieldRow([
        { label: 'TIEMPO EN ACTIVIDAD (meses)', value: datosIndependiente.tiempoActividadMeses, width: col4 },
        { label: 'TIEMPO EN LOCAL (meses)', value: datosIndependiente.tiempoLocalMeses, width: col4 },
        { label: 'NÚMERO DE EMPLEADOS', value: datosIndependiente.numeroEmpleados, width: col4 },
      ]);
    }

    // DATOS PARA CLIENTES ASALARIADOS
    if (datosPersonales.ocupacion === 'asalariado') {
      this.drawSectionHeader('DATOS PARA CLIENTES ASALARIADOS');

      this.drawFieldRow([
        { label: 'NOMBRE DE LA EMPRESA', value: datosAsalariado.nombreEmpresa, width: col2 },
        { label: 'CARGO QUE OCUPA', value: datosAsalariado.cargo, width: col4 },
        { label: 'ANTIGÜEDAD (meses)', value: datosAsalariado.antiguedadMeses, width: col4 - 10 },
      ]);

      this.drawFieldRow([
        { label: 'DIRECCIÓN DE LA EMPRESA', value: datosAsalariado.direccionEmpresa, width: col2 + col4 },
        { label: 'TELÉFONO', value: this.formatPhone(datosAsalariado.telefono), width: col4 - 10 },
      ]);
    }

    // REFERENCIAS
    this.drawSectionHeader('REFERENCIAS');

    this.pdf.setFontSize(8);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.setTextColor(...COLORS.black);
    this.pdf.text('REFERENCIA COMERCIAL', this.margin, this.y + 3);
    this.y += 5;

    this.drawFieldRow([
      { label: 'NOMBRES Y APELLIDOS', value: referencias.comercial.nombre, width: col2 },
      { label: 'TELÉFONO', value: this.formatPhone(referencias.comercial.telefono), width: col4 },
      { label: 'PARENTESCO', value: referencias.comercial.parentesco, width: col4 - 10 },
    ]);

    this.pdf.setFontSize(8);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text('REFERENCIA PERSONAL', this.margin, this.y + 3);
    this.y += 5;

    this.drawFieldRow([
      { label: 'NOMBRES Y APELLIDOS', value: referencias.personal.nombre, width: col2 },
      { label: 'TELÉFONO', value: this.formatPhone(referencias.personal.telefono), width: col4 },
      { label: 'PARENTESCO', value: referencias.personal.parentesco, width: col4 - 10 },
    ]);

    // ========== PAGE 2 ==========
    this.checkPageBreak(50);

    // INFORMACIÓN FINANCIERA
    this.drawSectionHeader('INFORMACIÓN FINANCIERA');

    this.drawFieldRow([
      { label: '(1) INGRESOS MENSUALES', value: this.formatCurrency(informacionFinanciera.ingresosMensuales), width: col4 },
      { label: '(2) TOTAL COSTO VENTAS', value: this.formatCurrency(informacionFinanciera.costoVentas), width: col4 },
      { label: '(3) GASTOS OPERATIVOS', value: this.formatCurrency(informacionFinanciera.gastosOperativos), width: col4 },
      { label: '(4) OTROS INGRESOS', value: this.formatCurrency(informacionFinanciera.otrosIngresos), width: col4 - 10 },
    ]);

    this.drawFieldRow([
      { label: '(5) TOTAL EGRESOS MENSUALES', value: this.formatCurrency(informacionFinanciera.egresosMensuales), width: col4 },
      { label: '(6) CAPACIDAD DE PAGO', value: this.formatCurrency(informacionFinanciera.capacidadPago), width: col4 },
      { label: '(7) TOTAL ACTIVOS', value: this.formatCurrency(informacionFinanciera.totalActivos), width: col4 },
      { label: '(8) TOTAL PASIVOS', value: this.formatCurrency(informacionFinanciera.totalPasivos), width: col4 - 10 },
    ]);

    // Origen de fondos
    this.pdf.setFontSize(7);
    this.pdf.setTextColor(...COLORS.gray);
    this.pdf.text('DECLARACIÓN DE ORIGEN DE BIENES Y/O FONDOS:', this.margin, this.y + 3);
    this.y += 5;

    const origenes = origenFondos.origenes || [];
    this.drawCheckboxRow([
      { label: 'Actividad económica', checked: origenes.includes('actividad_economica') },
      { label: 'Herencia', checked: origenes.includes('herencia') },
      { label: 'Préstamos', checked: origenes.includes('prestamos') },
      { label: 'Aportes Familiares', checked: origenes.includes('aportes_familiares') },
      { label: 'Otros', checked: origenes.includes('otros') },
    ]);
    this.y += 8;

    // INFORMACIÓN TRIBUTARIA
    this.drawSectionHeader('INFORMACIÓN TRIBUTARIA');

    this.pdf.setFontSize(7);
    this.pdf.setTextColor(...COLORS.gray);
    this.pdf.text('¿ES DECLARANTE DE RENTA?', this.margin, this.y + 3);
    this.drawCheckboxRow([
      { label: 'Sí', checked: informacionTributaria.esDeclaranteRenta === true },
      { label: 'No', checked: informacionTributaria.esDeclaranteRenta === false },
    ], this.margin + 45);
    this.y += 8;

    // OPERACIONES EN MONEDA EXTRANJERA
    this.drawSectionHeader('OPERACIONES EN MONEDA EXTRANJERA');

    this.pdf.setFontSize(7);
    this.pdf.setTextColor(...COLORS.gray);
    this.pdf.text('¿Realiza usted operaciones en moneda extranjera?', this.margin, this.y + 3);
    this.drawCheckboxRow([
      { label: 'Sí', checked: operacionesMonedaExtranjera.realizaOperaciones === true },
      { label: 'No', checked: operacionesMonedaExtranjera.realizaOperaciones === false },
    ], this.margin + 70);
    this.y += 6;

    this.pdf.text('¿Tiene productos en moneda extranjera?', this.margin, this.y + 3);
    this.drawCheckboxRow([
      { label: 'Sí', checked: operacionesMonedaExtranjera.tieneProductos === true },
      { label: 'No', checked: operacionesMonedaExtranjera.tieneProductos === false },
    ], this.margin + 60);
    this.y += 8;

    // PERSONA POLÍTICAMENTE EXPUESTA
    this.drawSectionHeader('PERSONA POLÍTICAMENTE EXPUESTA (PEP)');

    const pepQuestions = [
      { label: '¿Administra recursos públicos?', value: informacionPEP.administraRecursosPublicos },
      { label: '¿Desempeña cargos públicos?', value: informacionPEP.desempenaCargosPublicos },
      { label: '¿Es usted PEP Extranjero?', value: informacionPEP.esPEPExtranjero },
      { label: '¿Es Representante Legal de org. internacionales?', value: informacionPEP.esRepresentanteLegalInternacional },
      { label: '¿Es usted reconocido públicamente?', value: informacionPEP.esReconocidoPublicamente },
      { label: '¿Su cónyuge o familiar es PEP?', value: informacionPEP.familiarEsPEP },
    ];

    for (let i = 0; i < pepQuestions.length; i += 2) {
      this.checkPageBreak(10);
      this.pdf.setFontSize(7);
      this.pdf.setTextColor(...COLORS.gray);

      // First question
      this.pdf.text(pepQuestions[i].label, this.margin, this.y + 3);
      this.drawCheckboxRow([
        { label: 'Sí', checked: pepQuestions[i].value === true },
        { label: 'No', checked: pepQuestions[i].value === false },
      ], this.margin + 70);

      // Second question (if exists)
      if (pepQuestions[i + 1]) {
        this.pdf.text(pepQuestions[i + 1].label, this.margin + 100, this.y + 3);
        this.drawCheckboxRow([
          { label: 'Sí', checked: pepQuestions[i + 1].value === true },
          { label: 'No', checked: pepQuestions[i + 1].value === false },
        ], this.margin + 175);
      }

      this.y += 6;
    }
    this.y += 2;

    // EVALUACIÓN AMBIENTAL
    this.drawSectionHeader('EVALUACIÓN AMBIENTAL');

    this.pdf.setFontSize(7);
    this.pdf.setTextColor(...COLORS.gray);

    this.pdf.text('¿Su actividad genera algún tipo de impacto ambiental o social?', this.margin, this.y + 3);
    this.drawCheckboxRow([
      { label: 'Sí', checked: evaluacionAmbiental.generaImpacto === true },
      { label: 'No', checked: evaluacionAmbiental.generaImpacto === false },
    ], this.margin + 85);
    this.y += 6;

    this.pdf.text('¿La actividad necesita algún tipo de permiso ambiental?', this.margin, this.y + 3);
    this.drawCheckboxRow([
      { label: 'Sí', checked: evaluacionAmbiental.necesitaPermiso === true },
      { label: 'No', checked: evaluacionAmbiental.necesitaPermiso === false },
    ], this.margin + 80);
    this.y += 6;

    this.pdf.text('¿La actividad involucra estrategias de sostenibilidad?', this.margin, this.y + 3);
    this.drawCheckboxRow([
      { label: 'Sí', checked: evaluacionAmbiental.involucraEstrategias === true },
      { label: 'No', checked: evaluacionAmbiental.involucraEstrategias === false },
    ], this.margin + 78);
    this.y += 8;

    // CONDICIÓN ESPECIAL
    this.drawSectionHeader('CONDICIÓN ESPECIAL');

    this.pdf.setFontSize(7);
    this.pdf.setTextColor(...COLORS.gray);
    this.pdf.text('¿Es usted una persona con discapacidad?', this.margin, this.y + 3);
    this.drawCheckboxRow([
      { label: 'Sí', checked: condicionEspecial.tieneDiscapacidad === true },
      { label: 'No', checked: condicionEspecial.tieneDiscapacidad === false },
    ], this.margin + 65);

    if (condicionEspecial.tieneDiscapacidad) {
      this.pdf.text('Cuál:', this.margin + 95, this.y + 3);
      const tipos = condicionEspecial.tiposDiscapacidad || [];
      this.drawCheckboxRow([
        { label: 'Intelectual o cognitiva', checked: tipos.includes('intelectual') },
        { label: 'Mental o psicosocial', checked: tipos.includes('mental') },
        { label: 'Visual', checked: tipos.includes('visual') },
        { label: 'Auditiva', checked: tipos.includes('auditiva') },
        { label: 'Otra', checked: tipos.includes('otra') },
      ], this.margin + 108);
    }
    this.y += 10;

    // AUTORIZACIONES
    this.checkPageBreak(60);
    this.drawSectionHeader('AUTORIZACIONES Y DECLARACIONES');

    this.pdf.setFontSize(7);
    this.pdf.setTextColor(...COLORS.gray);

    this.pdf.text('Autoriza consulta y reporte en centrales de datos:', this.margin, this.y + 3);
    this.drawCheckboxRow([
      { label: 'Sí', checked: autorizaciones.autorizaCentrales === true },
      { label: 'No', checked: autorizaciones.autorizaCentrales === false },
    ], this.margin + 70);
    this.y += 6;

    this.pdf.text('Autoriza tratamiento de datos personales:', this.margin, this.y + 3);
    this.drawCheckboxRow([
      { label: 'Sí', checked: autorizaciones.autorizaTratamientoDatos === true },
      { label: 'No', checked: autorizaciones.autorizaTratamientoDatos === false },
    ], this.margin + 62);
    this.y += 6;

    this.pdf.text('Confirma recepción de información del producto:', this.margin, this.y + 3);
    this.drawCheckboxRow([
      { label: 'Sí', checked: autorizaciones.confirmaRecepcionInfo === true },
      { label: 'No', checked: autorizaciones.confirmaRecepcionInfo === false },
    ], this.margin + 72);
    this.y += 6;

    this.pdf.text('Acepta compromiso de actualización de información:', this.margin, this.y + 3);
    this.drawCheckboxRow([
      { label: 'Sí', checked: autorizaciones.aceptaCompromisoActualizacion === true },
      { label: 'No', checked: autorizaciones.aceptaCompromisoActualizacion === false },
    ], this.margin + 78);
    this.y += 8;

    // DÉBITO AUTOMÁTICO
    this.pdf.setFontSize(7);
    this.pdf.setTextColor(...COLORS.gray);
    this.pdf.text('AUTORIZACIÓN DÉBITO AUTOMÁTICO:', this.margin, this.y + 3);
    this.drawCheckboxRow([
      { label: 'Sí', checked: debitoAutomatico.autoriza === true },
      { label: 'No', checked: debitoAutomatico.autoriza === false },
    ], this.margin + 55);
    this.y += 8;

    // DESEMBOLSO
    this.drawSectionHeader('DESEMBOLSO');

    this.pdf.setFontSize(7);
    this.pdf.setTextColor(...COLORS.gray);

    this.drawCheckboxRow([
      { label: 'Desembolso cuenta Mibanco', checked: desembolso.metodo === 'cuenta_mibanco' },
      { label: 'Desembolso en cuenta otros bancos', checked: desembolso.metodo === 'cuenta_otros' },
    ]);
    this.y += 8;

    // FIRMAS Y HUELLAS
    this.checkPageBreak(50);
    this.drawSectionHeader('FIRMAS Y HUELLAS');

    this.pdf.setFontSize(8);
    this.pdf.setTextColor(...COLORS.black);
    this.pdf.text('Declaro que he suministrado la información contenida en el formulario de vinculación y sus anexos.', this.margin, this.y + 5);
    this.y += 15;

    // Signature boxes
    const sigBoxWidth = (contentWidth - 20) / 2;

    // Client signature box
    this.pdf.setDrawColor(...COLORS.black);
    this.pdf.setLineWidth(0.3);
    this.pdf.rect(this.margin, this.y, sigBoxWidth, 25);

    // Fingerprint box for client
    this.pdf.rect(this.margin + sigBoxWidth - 18, this.y + 2, 16, 20);

    // Embed signature image if available
    if (firmaCliente?.dataUrl) {
      try {
        // Calculate signature dimensions to fit within the box (leaving space for fingerprint)
        const sigAreaWidth = sigBoxWidth - 25; // Leave space for fingerprint box
        const sigAreaHeight = 20;
        const sigX = this.margin + 2;
        const sigY = this.y + 2;

        this.pdf.addImage(
          firmaCliente.dataUrl,
          'PNG',
          sigX,
          sigY,
          sigAreaWidth,
          sigAreaHeight,
          undefined,
          'FAST'
        );
      } catch (error) {
        console.error('Error adding signature to PDF:', error);
      }
    }

    this.pdf.setFontSize(8);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text('FIRMA DEL CLIENTE / CODEUDOR', this.margin + 5, this.y + 30);

    this.pdf.setFont('helvetica', 'normal');
    this.pdf.setFontSize(7);
    this.pdf.text(`N° Identificación: ${datosPersonales.numeroDocumento || '_______________'}`, this.margin + 5, this.y + 35);

    // Spouse signature box (right side)
    const rightBoxX = this.margin + sigBoxWidth + 20;
    this.pdf.rect(rightBoxX, this.y, sigBoxWidth, 25);

    // Fingerprint box for spouse
    this.pdf.rect(rightBoxX + sigBoxWidth - 18, this.y + 2, 16, 20);

    this.pdf.setFontSize(8);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text('FIRMA SOLIDARIA (SOLO CÓNYUGE)', rightBoxX + 5, this.y + 30);

    this.pdf.setFont('helvetica', 'normal');
    this.pdf.setFontSize(7);
    this.pdf.text('Nombres: _______________________', rightBoxX + 5, this.y + 35);
    this.pdf.text('Apellidos: _______________________', rightBoxX + 5, this.y + 40);
    this.pdf.text('N° Identificación: _______________', rightBoxX + 5, this.y + 45);

    this.y += 50;

    // PARA USO EXCLUSIVO DE MIBANCO
    this.checkPageBreak(30);
    this.drawSectionHeader('PARA USO EXCLUSIVO DE MIBANCO (Responsable de toma de información)');

    this.pdf.setFontSize(6);
    this.pdf.setTextColor(...COLORS.gray);
    const disclaimer = 'Certifico que previo al otorgamiento y aceptación del producto se le suministró al cliente de manera clara, comprensible, suficiente, transparente y oportuna las características, condiciones, costos, plazos, descuentos, comisiones, funcionamiento del producto que está adquiriendo y los servicios financieros derivados del mismo, los derechos y obligaciones que tiene como Consumidor Financiero y las obligaciones y derechos que tiene MIBANCO S.A. y demás aspectos que debe conocer referentes a los productos adquiridos.';

    const splitText = this.pdf.splitTextToSize(disclaimer, contentWidth);
    this.pdf.text(splitText, this.margin, this.y + 3);

    return this.pdf;
  }

  public save(filename: string): void {
    this.pdf.save(filename);
  }
}

export function generateOfficialPDF(form: FormularioVinculacion, documentNumber: string): void {
  const generator = new PDFGenerator();
  const pdf = generator.generate(form);

  const date = new Date().toISOString().split('T')[0];
  const docNum = documentNumber || 'sin-documento';
  pdf.save(`formulario-vinculacion-${docNum}-${date}.pdf`);
}
