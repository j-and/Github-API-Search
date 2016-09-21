import {Component, ViewEncapsulation,  Output} from '@angular/core';

@Component({
  selector: 'RepoFilter',
  encapsulation: ViewEncapsulation.None,
 /* styleUrls: [
    '../app.style.css'
  ],*/
  templateUrl: './RepoFilter.html'
})


export class RepoFilter {


  searchTerm:string;




  constructor() {
      }

  onSubmit() {
    console.log('submit', this.searchTerm);

  }

}

