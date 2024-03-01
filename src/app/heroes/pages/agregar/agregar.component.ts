import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img {
      width:100%;
      border-radius: 5px;
    }
  `]
})
export class AgregarComponent {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  constructor(
    private _snarkBar: MatSnackBar,
    private _dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private heroesService: HeroesService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.pipe(
      switchMap( ({ id }) => this.heroesService.getHeroesById( id ) )
    ).subscribe({
      next: heroe => {this.heroe = heroe; console.log('hereo editar', heroe)}
    })
  }

  guardar() {
    if ( this.heroe.superhero.trim().length === 0 ) return;

    if ( this.heroe.id ) {
      console.log('Actualizando...');
      this.heroesService.updateHeroe( this.heroe )
              .subscribe({
                next: heroe => this.openSnackBar('Registro Actualizado')
              })
    } else {
      console.log('Creando...');
      this.heroesService.addHeroe( this.heroe )
              .subscribe({
                next: heroe => {
                  this.openSnackBar('Registro Creado')
                  this.router.navigate(['/heroes/editar', heroe.id]);
                }
              })
    }
  }

  remove() {
    const dialogRef = this._dialog.open( ConfirmarComponent, {
      // width: '250px'
      data: this.heroe
    });

    // dialogRef.afterClosed().subscribe({
    //   next: result => {

    //     if ( result ) {
    //       this.heroesService.removeHeroe( this.heroe.id! )
    //           .subscribe({
    //             next: resp => this.router.navigate(['/heroes'])
    //           })          
    //     }

    //   }
    // })

    dialogRef.afterClosed().pipe(
      switchMap(
        result => result ? ( this.heroesService.removeHeroe(this.heroe.id! ) ) : ''
      )
    ).subscribe({
      next: () => this.router.navigate(['/heroes'])
    })
  }

  openSnackBar( mensaje: string ) {
    this._snarkBar.open( mensaje, 'ok!', {
      duration: 2500
    });
  }

}
