import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { SearchParams } from '../models/search-params.model';
import { SearchResults } from '../models/search-results.model';
import { MemberService } from '../service/member.service';
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
  inputs: ['searchParams'],
  providers: [MemberService]
})
export class SearchResultsComponent implements OnInit {
  @Input() searchParams: SearchParams;
  public searchResults: SearchResults[] = [];

  constructor(private memberService: MemberService) { 

  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    let param : SearchParams = changes['searchParams'].currentValue; 
    this.searchResults = this.memberService.getMembers(param);
  }

  getImage(memberId: string) {
    console.log("Member: " + memberId);
  }
}
