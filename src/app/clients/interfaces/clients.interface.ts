export interface ClienteUno {
    id?:    string;
    dni:    string;
    nombre: string;
    apellido:   string;
    celular:    string;
    email:  string;
}

export interface ClienteE {
    id: number;
    dni: string;
    nombre: string;
    apellido: string;
    celular: number;
    correo: string;
    estado: string;
}

// export enum Publisher {
//     DCComics = "DC Comics",
//     MarvelComics = "Marvel Comics",
// }
