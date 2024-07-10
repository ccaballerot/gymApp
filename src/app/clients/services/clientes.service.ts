import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente, ClienteResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) {}

  clientesList(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${ this.baseUrl }/clientes`)
      .pipe(
        map(
          data => data.map( x => Cliente.jsonClient( x ) )
        )
      )
  }

  getClientById( id: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${ this.baseUrl }/clientes/${ id }`)
  }

  addClient( client: Cliente ): Observable<Cliente> {
    return this.http.post<Cliente>(`${ this.baseUrl }/clientes`, client)
  }

  updateClient( client: Cliente ): Observable<Cliente> {
    return this.http.put<Cliente>(`${ this.baseUrl }/clientes/${ client.id }`, client)
  }

  removeClient( id: string ): Observable<any> {
    return this.http.delete<any>(`${ this.baseUrl }/clientes/${ id }`)
  }

  // getSugerencias( termino: string ): Observable<Heroe[]> {
  //   return this.http.get<Heroe[]>(`${ this.baseUrl }/heroes/?q=${ termino }&_limit=6`);
  // }

  // addHeroe( heroe: Heroe ): Observable<Heroe> {
  //   return this.http.post<Heroe>(`${ this.baseUrl }/heroes`, heroe)
  // }

  // updateHeroe( heroe: Heroe ): Observable<Heroe> {
  //   return this.http.put<Heroe>(`${ this.baseUrl }/heroes/${ heroe.id }`, heroe)
  // }

  // removeHeroe( id: string ): Observable<any> {
  //   return this.http.delete<any>(`${ this.baseUrl }/heroes/${ id }`)
  // }

}
