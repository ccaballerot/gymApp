export interface Plan {
  id?: number;
  nombre: string;
  precio: number;
  estado: [];
}

export interface Estado {
  value: string;
  viewValue: string;
}
