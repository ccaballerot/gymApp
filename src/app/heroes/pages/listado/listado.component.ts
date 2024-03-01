import { Component } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent {

  heroes: Heroe[] = [];
  constructor(
    private heroesService: HeroesService
  ) {}

  ngOnInit() {
    this.heroesService.heroesList().subscribe({
      next: heroes => this.heroes = heroes
    })
  }

  

}
