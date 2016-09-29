import {Component, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'RepoFilter',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './RepoFilter.template.html'
})


export class RepoFilter {
  searchTerm: string;

  @Output() onSearch = new EventEmitter();

  constructor() {
  }

  search() {
    this.onSearch.emit(this.searchTerm);
  }

}

