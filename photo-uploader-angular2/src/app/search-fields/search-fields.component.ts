import { Component, OnInit, EventEmitter } from '@angular/core';
import { SearchParams } from '../models/search-params.model';
import { NgForm } from "@angular/forms"

@Component({
  selector: 'app-search-fields',
  templateUrl: './search-fields.component.html',
  styleUrls: ['./search-fields.component.css'],
  outputs: ['searchParamsEvent']
})

export class SearchFieldsComponent implements OnInit {
  searchParams = new SearchParams();

  searchParamsEvent = new EventEmitter<SearchParams>();

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.searchParamsEvent.emit(form.value);
  }
}
