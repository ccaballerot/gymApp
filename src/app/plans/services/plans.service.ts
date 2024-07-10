import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Plan} from "../interfaces/plans.interface";


@Injectable({
  providedIn: 'root'
})
export class PlansService {

  private baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) {}

  getAllPlans(): Observable<Plan[]> {
    return this.http.get<Plan[]>(`${ this.baseUrl }/planes`);
  }

  getPlanById( id: string): Observable<Plan> {
    return this.http.get<Plan>(`${ this.baseUrl }/planes/${ id }`)
  }

  addPlan( plan: Plan ): Observable<Plan> {
    return this.http.post<Plan>(`${ this.baseUrl }/planes`, plan)
  }

  updatePlan( plan: Plan ): Observable<Plan> {
    return this.http.put<Plan>(`${ this.baseUrl }/planes/${ plan.id }`, plan)
  }

  removePlan( id: string ): Observable<any> {
    return this.http.delete<any>(`${ this.baseUrl }/planes/${ id }`)
  }
}
