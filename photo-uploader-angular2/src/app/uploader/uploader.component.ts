import { Component, OnInit } from '@angular/core';
import { SearchParams } from '../models/search-params.model';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css'],
})
export class UploaderComponent implements OnInit {
  public searchData = new SearchParams();

  constructor() {
    
   }

  ngOnInit() {
  }
}
