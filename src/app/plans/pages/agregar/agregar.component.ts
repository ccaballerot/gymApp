import {Component, OnInit, ViewChild} from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";
import {Estado, Plan} from "../../interfaces/plans.interface";
import {PlansService} from "../../services/plans.service";
import { switchMap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  plan: Plan = {
    nombre: '',
    precio: 0,
    estado: []
  };

  selectedValue: string = '';

  estados: Estado[] = [
    {value: 'activo', viewValue: 'Activo'},
    {value: 'inactivo', viewValue: 'Inactivo'}
  ];

  miFormulario: FormGroup = this._fb.group({
    nombre: [ , [ Validators.required, Validators.minLength(4) ] ],
    precio: [ , [ Validators.required ]],
    estado: [ , [ Validators.required ]]
  })

  constructor(
    private _fb: FormBuilder,
    private _snarkBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private plansService: PlansService
  ) {}

  ngOnInit() {
    if ( this.router.url.includes('edit') ) {

      this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.plansService.getPlanById( id ) )
      ).subscribe(
          plan => {
            if ( !plan ) {
              return this.router.navigateByUrl('/');
            }

            this.miFormulario.patchValue({
              nombre: plan.nombre,
              precio: plan.precio,
              estado: plan.estado
            });

          return;
        });
    }

  }

  formValid() {
    if ( this.miFormulario.invalid ) {
      this.miFormulario.markAllAsTouched();
      console.log('invalid1!')
      return;
    }
    console.log('Paso!')
    // this.miFormulario.reset();
  }

  save() {
    this.formValid();

    console.log('this.plan.nombre', this.plan)

    if ( this.plan.nombre.toString().trim().length === 0 ) return;

    if ( this.plan.id ) {
      console.log('Actualizando...');
      this.plansService.updatePlan( this.plan )
              .subscribe({
                next: plan => this.openSnackBar('Registro Actualizado')
              })
    } else {
      console.log('Creando...');
      this.plansService.addPlan( this.plan )
              .subscribe({
                next: heroe => {
                  this.openSnackBar('Registro Creado')
                  this.router.navigate(['/clientes/editar', heroe.id]);
                }
              })
    }
  }

  remove() {}

  openSnackBar( mensaje: string ) {
    this._snarkBar.open( mensaje, 'ok!', {
      duration: 2500
    });
  }


}

