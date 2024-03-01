import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      return this.authService.verficiaAutenticacion()
        .pipe(
          tap( estaAutenticado => {
            console.log('guard canActivate', estaAutenticado);
            if ( !estaAutenticado ) {
              this.router.navigate(['./auth/login']);
            }
          } )
        )

  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean {
      
    return this.authService.verficiaAutenticacion()
        .pipe(
          tap( estaAtenticado => {
            console.log('guard canLoad', estaAtenticado);
            if ( !estaAtenticado ) {
              this.router.navigate(['./auth/login']);
            }
          } )
        )
  }
}
