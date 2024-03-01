import { Component } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent {

  termino: string = '';
  heroes: Heroe[] = [];
  heroeSelected!: Heroe | undefined;

  constructor(
    private heroesService: HeroesService
  ) {}

  buscando() {
    console.log('this.termino', this.termino);
    this.heroesService.getSugerencias( this.termino.trim() )
            .subscribe({
              next: res => this.heroes = res
            })

  }

  opcionSeleccionada( event: MatAutocompleteSelectedEvent ) {
    if ( !event.option.value ) {
      console.log('No hay valor');
      this.heroeSelected = undefined;
      return;
    }
    const heroe = event.option.value;
    this.termino = heroe.superhero;

    this.heroesService.getHeroesById( heroe.id! )
              .subscribe({
                next: heroe => this.heroeSelected  = heroe
              })
  }

}
