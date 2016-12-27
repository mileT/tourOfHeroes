import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  templateUrl: 'heroes.component.html',
  styleUrls: ['heroes.component.css'],
})

export class HeroesComponent implements OnInit {
  heroes : Hero[];
  selectedHero: Hero;

  constructor(
    private heroServive: HeroService,
    private router: Router) {};

  ngOnInit(): void {
    this.getHeroes();
  };

  add(name: string): void {
    name = name.trim();
    if(!name) { return; }
      this.heroServive.create(name)
        .then( hero => {
          this.heroes.push(hero);
          this.selectedHero = null;
        });
  }

  delete(hero: Hero): void {
    this.heroServive.delete(hero.id)
        .then( () => { this.heroes = this.heroes.filter( h => h != hero);
          if (this.selectedHero === hero) { this.selectedHero = null; }
        });
  }

  getHeroes(): void {
    //this.heroes = this.heroServive.getHeroes();
    this.heroServive.getHeroesSlowly().then(heroes => this.heroes = heroes);
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
}
