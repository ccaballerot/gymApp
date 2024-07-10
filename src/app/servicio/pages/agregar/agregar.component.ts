import { Component, OnInit } from '@angular/core';
import { Servicio, MetodoPago, Estado, Plan } from '../../interfaces/servicio.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicioService } from '../../services/servicio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css'],
})
export class AgregarComponent implements OnInit {

//   - Plan *combo
// - Clientes *combo
// - Estado del servicio *combo
// - Fecha de Inicio *datepicker
// - Fecha de Vencimiento *datepicker
// - Metodo de pago *combo (Efectivo, Yape, Plin)
// - Cancelo	(Con cuanto dinero cancela)
servicio: Servicio = {
  plan: [],
  clientes: [],
  estado: [],
  fecIni: '',
  fecVenc: '',
  metodoPago: [],
  cancelo: 0
}

clientes: any = [];

selectedValueCli: string = '';
selectedValueEst: string = '';
selectedValueMet: string = '';
selectedValuePlan: string = '';

planes: Plan[] = [
  {value: 'unMes', viewValue: 'x 1 mes'},
  {value: 'dosMeses', viewValue: 'x 2 meses'},
  {value: 'tresMeses', viewValue: 'x 3 meses'}
];

estados: Estado[] = [
  {value: 'activo', viewValue: 'Activo'},
  {value: 'inactivo', viewValue: 'Inactivo'}
];

metodoPagos: MetodoPago[] = [
  {value: 'efectivo', viewValue: 'Efectivo'},
  {value: 'yape', viewValue: 'Yape'},
  {value: 'plin', viewValue: 'Plin'}
];

miFormulario: FormGroup = this._fb.group({
  plan: [ , [ Validators.required ] ],
  clientes: [ , [ Validators.required ]],
  estado: [ , [ Validators.required ]],
  metodoPago: [ , [ Validators.required ]],
})

constructor(
  private ServicioService: ServicioService,
  private router: Router,
  private _fb: FormBuilder
) {}

ngOnInit(): void {
  this.ServicioService.getAllClients()
    .subscribe({
      next: clients => {
        console.log(clients)
        this.clientes = clients;
      }
    })
}

onDate(event: any) {
  console.log('eventtt',event.target);
}

save() {}

remove() {}









}
