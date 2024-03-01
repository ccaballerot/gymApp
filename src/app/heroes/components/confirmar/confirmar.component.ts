import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styles: []
})
export class ConfirmarComponent {

  constructor( private _matDialogRef: MatDialogRef<ConfirmarComponent>,
               @Inject(MAT_DIALOG_DATA) public data: Heroe ){}

  ngOnInit() {
    console.log('data', this.data);
  }

  borrar() {
    this._matDialogRef.close(true);
  }

  cerrar() {
    this._matDialogRef.close();
  }

}
