import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from "rxjs/operators";
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }
  `
  ]
})
export class HeroeComponent {

  heroe!: Heroe;
  constructor(
    private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.pipe(
      switchMap( ({ id }) => this.heroesService.getHeroesById( id ) )
    ).subscribe({
      next: heroe => {
        console.log('heroe', heroe)
        this.heroe = heroe}
    })
  }

  back() {
    this.router.navigate(['/heroes/listado'])
  }

}
