import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ListarComponent} from "./pages/listar/listar.component";
import { AgregarComponent } from './pages/agregar/agregar.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'listar',
        component: ListarComponent
      },
      {
        path: 'agregar',
        component: AgregarComponent
      },
      {
        path: 'editar/:id',
        component: AgregarComponent
      },
      // {
      //   path: 'buscar',
      //   component: BuscarComponent
      // },
      // {
      //   path: ':id',
      //   component: HeroeComponent
      // },
      {
        path: '**',
        redirectTo: 'listar'
      }
    ]
  }

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlansRoutingModule { }
