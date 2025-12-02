// Colombia Departments and Cities
export interface Departamento {
  codigo: string;
  nombre: string;
}

export interface Ciudad {
  codigo: string;
  nombre: string;
  departamento: string;
}

export const departamentos: Departamento[] = [
  { codigo: 'AMA', nombre: 'Amazonas' },
  { codigo: 'ANT', nombre: 'Antioquia' },
  { codigo: 'ARA', nombre: 'Arauca' },
  { codigo: 'ATL', nombre: 'Atlántico' },
  { codigo: 'BOL', nombre: 'Bolívar' },
  { codigo: 'BOY', nombre: 'Boyacá' },
  { codigo: 'CAL', nombre: 'Caldas' },
  { codigo: 'CAQ', nombre: 'Caquetá' },
  { codigo: 'CAS', nombre: 'Casanare' },
  { codigo: 'CAU', nombre: 'Cauca' },
  { codigo: 'CES', nombre: 'Cesar' },
  { codigo: 'CHO', nombre: 'Chocó' },
  { codigo: 'COR', nombre: 'Córdoba' },
  { codigo: 'CUN', nombre: 'Cundinamarca' },
  { codigo: 'DC', nombre: 'Bogotá D.C.' },
  { codigo: 'GUA', nombre: 'Guainía' },
  { codigo: 'GUV', nombre: 'Guaviare' },
  { codigo: 'HUI', nombre: 'Huila' },
  { codigo: 'LAG', nombre: 'La Guajira' },
  { codigo: 'MAG', nombre: 'Magdalena' },
  { codigo: 'MET', nombre: 'Meta' },
  { codigo: 'NAR', nombre: 'Nariño' },
  { codigo: 'NSA', nombre: 'Norte de Santander' },
  { codigo: 'PUT', nombre: 'Putumayo' },
  { codigo: 'QUI', nombre: 'Quindío' },
  { codigo: 'RIS', nombre: 'Risaralda' },
  { codigo: 'SAP', nombre: 'San Andrés y Providencia' },
  { codigo: 'SAN', nombre: 'Santander' },
  { codigo: 'SUC', nombre: 'Sucre' },
  { codigo: 'TOL', nombre: 'Tolima' },
  { codigo: 'VAC', nombre: 'Valle del Cauca' },
  { codigo: 'VAU', nombre: 'Vaupés' },
  { codigo: 'VID', nombre: 'Vichada' },
];

// Main cities per department (simplified list)
export const ciudades: Ciudad[] = [
  // Antioquia
  { codigo: 'MED', nombre: 'Medellín', departamento: 'ANT' },
  { codigo: 'BEL', nombre: 'Bello', departamento: 'ANT' },
  { codigo: 'ITA', nombre: 'Itagüí', departamento: 'ANT' },
  { codigo: 'ENV', nombre: 'Envigado', departamento: 'ANT' },
  { codigo: 'RIO', nombre: 'Rionegro', departamento: 'ANT' },

  // Atlántico
  { codigo: 'BAQ', nombre: 'Barranquilla', departamento: 'ATL' },
  { codigo: 'SOL', nombre: 'Soledad', departamento: 'ATL' },
  { codigo: 'MAL', nombre: 'Malambo', departamento: 'ATL' },

  // Bogotá D.C.
  { codigo: 'BOG', nombre: 'Bogotá', departamento: 'DC' },

  // Bolívar
  { codigo: 'CTG', nombre: 'Cartagena', departamento: 'BOL' },
  { codigo: 'MAG', nombre: 'Magangué', departamento: 'BOL' },

  // Boyacá
  { codigo: 'TUN', nombre: 'Tunja', departamento: 'BOY' },
  { codigo: 'DUI', nombre: 'Duitama', departamento: 'BOY' },
  { codigo: 'SOG', nombre: 'Sogamoso', departamento: 'BOY' },

  // Caldas
  { codigo: 'MAN', nombre: 'Manizales', departamento: 'CAL' },
  { codigo: 'VIL', nombre: 'Villamaría', departamento: 'CAL' },

  // Cauca
  { codigo: 'POP', nombre: 'Popayán', departamento: 'CAU' },

  // Cesar
  { codigo: 'VAL', nombre: 'Valledupar', departamento: 'CES' },

  // Córdoba
  { codigo: 'MON', nombre: 'Montería', departamento: 'COR' },

  // Cundinamarca
  { codigo: 'SOA', nombre: 'Soacha', departamento: 'CUN' },
  { codigo: 'CHA', nombre: 'Chía', departamento: 'CUN' },
  { codigo: 'ZIP', nombre: 'Zipaquirá', departamento: 'CUN' },
  { codigo: 'FAC', nombre: 'Facatativá', departamento: 'CUN' },
  { codigo: 'FUS', nombre: 'Fusagasugá', departamento: 'CUN' },
  { codigo: 'GIR', nombre: 'Girardot', departamento: 'CUN' },

  // Huila
  { codigo: 'NEI', nombre: 'Neiva', departamento: 'HUI' },

  // La Guajira
  { codigo: 'RIO', nombre: 'Riohacha', departamento: 'LAG' },

  // Magdalena
  { codigo: 'STA', nombre: 'Santa Marta', departamento: 'MAG' },

  // Meta
  { codigo: 'VIL', nombre: 'Villavicencio', departamento: 'MET' },

  // Nariño
  { codigo: 'PAS', nombre: 'Pasto', departamento: 'NAR' },
  { codigo: 'TUM', nombre: 'Tumaco', departamento: 'NAR' },
  { codigo: 'IPI', nombre: 'Ipiales', departamento: 'NAR' },

  // Norte de Santander
  { codigo: 'CUC', nombre: 'Cúcuta', departamento: 'NSA' },

  // Quindío
  { codigo: 'ARM', nombre: 'Armenia', departamento: 'QUI' },

  // Risaralda
  { codigo: 'PER', nombre: 'Pereira', departamento: 'RIS' },
  { codigo: 'DOS', nombre: 'Dosquebradas', departamento: 'RIS' },

  // Santander
  { codigo: 'BUC', nombre: 'Bucaramanga', departamento: 'SAN' },
  { codigo: 'FLO', nombre: 'Floridablanca', departamento: 'SAN' },
  { codigo: 'GIR', nombre: 'Girón', departamento: 'SAN' },
  { codigo: 'PIE', nombre: 'Piedecuesta', departamento: 'SAN' },
  { codigo: 'BAR', nombre: 'Barrancabermeja', departamento: 'SAN' },

  // Sucre
  { codigo: 'SIN', nombre: 'Sincelejo', departamento: 'SUC' },

  // Tolima
  { codigo: 'IBA', nombre: 'Ibagué', departamento: 'TOL' },

  // Valle del Cauca
  { codigo: 'CAL', nombre: 'Cali', departamento: 'VAC' },
  { codigo: 'PAL', nombre: 'Palmira', departamento: 'VAC' },
  { codigo: 'BUE', nombre: 'Buenaventura', departamento: 'VAC' },
  { codigo: 'TUL', nombre: 'Tuluá', departamento: 'VAC' },
  { codigo: 'BUG', nombre: 'Buga', departamento: 'VAC' },
  { codigo: 'JAM', nombre: 'Jamundí', departamento: 'VAC' },
  { codigo: 'YUM', nombre: 'Yumbo', departamento: 'VAC' },
];

export function getCiudadesByDepartamento(departamentoCodigo: string): Ciudad[] {
  return ciudades.filter((c) => c.departamento === departamentoCodigo);
}

export function getDepartamentoOptions() {
  return departamentos.map((d) => ({ value: d.codigo, label: d.nombre }));
}

export function getCiudadOptions(departamentoCodigo: string) {
  return getCiudadesByDepartamento(departamentoCodigo).map((c) => ({
    value: c.codigo,
    label: c.nombre,
  }));
}
