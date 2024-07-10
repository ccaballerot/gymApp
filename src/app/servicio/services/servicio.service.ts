import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClientServiceList, ServicioList } from '../interfaces/servicio.interface';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) {}

  getAllServicios(): Observable<ServicioList[]> {
    return this.http.get<ServicioList[]>(`${ this.baseUrl }/servicios`);
  }

  getAllClients(): Observable<ClientServiceList[]> {
    return this.http.get<ClientServiceList[]>(`${ this.baseUrl }/clientesServicio`);
  }
}
