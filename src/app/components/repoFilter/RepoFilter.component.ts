import {Component, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'RepoFilter',
  encapsulation: ViewEncapsulation.None,
  /* styleUrls: [
   '../app.style.css'
   ],*/
  templateUrl: './RepoFilter.html'
})


export class RepoFilter {
  searchTerm: string;

  @Input() name: string;
  @Output() onSearch = new EventEmitter();

  search() {
    this.onSearch.emit(this.searchTerm);
  }

  constructor() {
  }
}

