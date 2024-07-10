import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AuthGuard } from './auth/guards/OLD_auth.guard';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { authGuard } from './auth/guards/auth.guard';

const routes: Routes = [
    {
      path: 'auth',
      loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
    },
    {
      path: 'clientes',
      loadChildren: () => import('./clients/clients.module').then( m => m.ClientsModule ),
      canLoad: [ authGuard ]
    },
    {
      path: 'planes',
      loadChildren: () => import('./plans/plans.module').then( m => m.PlansModule ),
      // canLoad: [ AuthGuard ]
    },
    {
      path: 'servicios',
      loadChildren: () => import('./servicio/servicio.module').then( m => m.ServicioModule )
    },
    {
      path: 'productos',
      loadChildren: () => import('./products/products.module').then( m => m.ProductsModule )
    },
    {
      path: 'ventas',
      loadChildren: () => import('./sales/sales.module').then( m => m.SalesModule )
    },
    {
      path: '404',
      component: ErrorPageComponent
    },
    {
      path: '**',
      redirectTo: 'clientes'
    }
]

@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
