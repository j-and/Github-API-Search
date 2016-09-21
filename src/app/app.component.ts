/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation, OnInit } from '@angular/core';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.style.css'
  ],
  template: `
    <nav>GitHub API</nav>
    <main>
      <router-outlet></router-outlet>
    </main>`,

  // providers: [HeroService]

})
export class App  {


//
//
//   heroes: Hero[];
//   selectedHero: Hero;
//
//   constructor
//     //(public appState: AppState) {}
//
//
// (private heroService: HeroService) { }
//
// getHeroes(): void {
//   this.heroes = this.heroService.getHeroes();;
// }
//
//
//
// ngOnInit(): void {
//   this.getHeroes();
// //console.log('Initial App State', this.appState.state)
// }
// onSelect(hero: Hero): void {
//   this.selectedHero = hero;
// }

}







/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
