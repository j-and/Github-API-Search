import {Component, ViewEncapsulation} from '@angular/core';


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

})
export class App {
}


