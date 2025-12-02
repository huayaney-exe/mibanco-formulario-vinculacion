import { type ClassValue, clsx } from 'clsx';

// Utility for combining class names
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Format currency (Colombian Pesos)
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

// Parse currency string to number
export function parseCurrency(value: string): number {
  const cleaned = value.replace(/[^\d]/g, '');
  return parseInt(cleaned, 10) || 0;
}

// Format phone number
export function formatPhone(value: string): string {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length <= 3) return cleaned;
  if (cleaned.length <= 6) return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
  return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 10)}`;
}

// Format document number
export function formatDocument(value: string): string {
  const cleaned = value.replace(/\D/g, '');
  // Format with dots every 3 digits from right
  return cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Parse document number
export function parseDocument(value: string): string {
  return value.replace(/\D/g, '');
}

// Validate email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone (10 digits for Colombia)
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 10;
}

// Calculate age from birth date
export function calculateAge(birthDate: string): number {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

// Check if adult (18+)
export function isAdult(birthDate: string): boolean {
  return calculateAge(birthDate) >= 18;
}

// Format date to DD/MM/YYYY
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

// Get step name
export function getStepName(step: number): string {
  const names: Record<number, string> = {
    1: 'Datos Personales',
    2: 'Datos Laborales',
    3: 'Información Financiera',
    4: 'Producto Solicitado',
    5: 'Cumplimiento',
    6: 'Autorizaciones',
  };
  return names[step] || `Paso ${step}`;
}

// Get step URL
export function getStepUrl(step: number): string {
  if (step === 7) return '/formulario/resumen';
  return `/formulario/paso-${step}`;
}

// Calculate financial capacity
export function calculateCapacidadPago(
  ingresosMensuales: number,
  otrosIngresos: number,
  costoVentas: number,
  gastosOperativos: number,
  egresosMensuales: number
): number {
  return (ingresosMensuales + otrosIngresos) - (costoVentas + gastosOperativos + egresosMensuales);
}
