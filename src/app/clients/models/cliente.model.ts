
export class Cliente {

  static jsonClient(obj: any) {

    return new Cliente(
      obj.id,
      obj.dni,
      obj.nombre,
      obj.apellido,
      obj.celular,
      obj.email,
      obj.estado
    );
  }

  constructor(
    public id: number,
    public dni: number,
    public nombre: string,
    public apellido: string,
    public celular: number,
    public email: string,
    public estado: string
  ) {}

  get fullName() {
    console.log('fullNameeeee')
    return `${ this.nombre } ${ this.apellido }`
  }
}
