import {Component, ViewEncapsulation} from '@angular/core';

//import { filterState } from './app.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'RepoList',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    '../app.style.css'
  ],
  templateUrl: './RepoList.html'
})


export class RepoList {

  constructor() {
    //public filterState: filterState

  }

  ngOnInit() {
    //console.log('Initial Filter State', this.filterState.state);
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
