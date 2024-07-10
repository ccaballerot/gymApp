export interface ServicioList {
  id?: string
  plan: string;
  cliente: string;
  periodo: string;
  diasRest: string;
  estado: string;
}

export interface Servicio {
  plan: Plan[];
  clientes: String[];
  estado: Estado[];
  fecIni: string;
  fecVenc: string;
  metodoPago: MetodoPago[];
  cancelo: number;
}

export interface ClientServiceList {
  id?: string,
  name: string
}

export interface Plan {
  value: string;
  viewValue: string;
}

export interface Estado {
  value: string;
  viewValue: string;
}

export interface MetodoPago {
  value: string;
  viewValue: string;
}
