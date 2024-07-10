import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sales } from '../interfaces/sales.interface';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) {}

  getAllSales(): Observable<Sales[]> {
    return this.http.get<Sales[]>(`${ this.baseUrl }/ventas`);
  }
}
