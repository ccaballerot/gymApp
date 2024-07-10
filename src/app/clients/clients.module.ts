import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ClientsRoutingModule } from './clients-routing.module';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ListarComponent } from './pages/listar/listar.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AgregarComponent,
    ClienteComponent,
    ListarComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    ClientsRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ClientsModule { }
