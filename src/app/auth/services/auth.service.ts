import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;
  constructor(
    private http: HttpClient
  ) { }

  get auth() {
    return { ...this._auth }
  }

  verficaAutenticacion(): Observable<boolean> {

    if ( !localStorage.getItem('token') ) {
      return of( false );
    }

    return this.http.get<Auth>(`${ this._baseUrl }/usuarios/1`)
              .pipe(
                map( auth => {
                    this._auth = auth;
                    return true;
                  } ));
  }

  getUsuario() {
    return this.http.get<Auth>(`${ this._baseUrl }/usuarios/1`)
            .pipe(
              tap( auth => this._auth = auth ),
              tap( auth => localStorage.setItem('token', auth.id) )
            );
  }

  logout() {
    this._auth = undefined;
  }
}
