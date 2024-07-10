import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ClientesService } from '../../services/clientes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from '../../models';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  cliente: Cliente = {
    id: 0,
    dni:    0,
    nombre: '',
    apellido:   '',
    celular:    0,
    email:  '',
    estado: '',
    fullName: ''
  }

  miFormulario: FormGroup = this._fb.group({
    dni: [ , [ Validators.required, Validators.minLength(7) ] ],
    nombre: [ , [ Validators.required, Validators.minLength(3) ] ],
    apellido: [ , [ Validators.required, Validators.minLength(3) ] ],
    celular: [ , [ Validators.required, Validators.minLength(9) ] ],
    email: [ , [ Validators.required, Validators.minLength(3), Validators.email ] ]
  })

  constructor(
    private _fb: FormBuilder,
    private _snarkBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private clientesService: ClientesService
  ) {}

  ngOnInit() {
    if ( this.router.url.includes('edit') ) {

      this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.clientesService.getClientById( id ) )
      ).subscribe(
          cliente => {
            this.cliente = cliente;

            if ( !cliente ) {
              return this.router.navigateByUrl('/');
            }

            this.miFormulario.patchValue({
              dni: cliente.dni,
              nombre: cliente.nombre,
              apellido: cliente.apellido,
              celular: cliente.celular,
              email: cliente.email
            });

          return;
        });
    }

  }

  // fieldValidation(field: string) {
  //   return this.miFormulario.controls[field].errors &&
  //          this.miFormulario.controls[field].touched
  // }

  // guardarr() {
  //   console.log(this.miFormulario.valid);
  //   if( this.miFormulario.invalid ) {
  //     this.miFormulario.markAllAsTouched();
  //     return;
  //   }
  //   this.miFormulario.reset();

  // }

  guardar() {
    console.log( this.miFormulario.get('dni')?.value )
    if ( this.cliente.dni.toString().trim().length === 0 ) return;

    if ( this.cliente.id ) {
      console.log('Actualizando...', this.miFormulario.value);
      this.clientesService.updateClient( this.miFormulario.value )
              .subscribe({
                next: cliente => this.openSnackBar('Registro Actualizado')
              })
    } else {
      console.log('Creando...');
      this.clientesService.addClient( this.miFormulario.value )
              .subscribe({
                next: heroe => {
                  this.openSnackBar('Registro Creado')
                  this.router.navigate(['/clientes/editar', heroe.id]);
                }
              })
    }
  }

  remove() {
    // const dialogRef = this._dialog.open( ConfirmarComponent, {
    //   width: '250px',
    //   data: this.heroe
    // });

    // dialogRef.afterClosed().pipe(
    //   switchMap(
    //     result => result ? ( this.heroesService.removeHeroe(this.heroe.id! ) ) : ''
    //   )
    // ).subscribe({
    //   next: () => this.router.navigate(['/heroes'])
    // })
  }

  openSnackBar( mensaje: string ) {
    this._snarkBar.open( mensaje, 'ok!', {
      duration: 2500
    });
  }

  // openSnackBar( mensaje: string ) {
  //   this._snarkBar.open( mensaje, 'ok!', {
  //     duration: 2500
  //   });
  // }

}
