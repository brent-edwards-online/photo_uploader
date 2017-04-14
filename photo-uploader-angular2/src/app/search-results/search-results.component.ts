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
  public searchResults: SearchResults[] = [
    {
      memberId: '8ad5e65b-5df0-4681-a8db-60bb2dff8e76',
      firstname: 'Brent',
      lastname: "Smith",
      email: "brent.smith@bob.com",
      phone: "0421585545",
      image: "string"
    },
    {
      memberId: '94ee74ce-787d-42b4-b16c-da120d79b103',
      firstname: 'James',
      lastname: "Jones",
      email: "james@jones.co.uk",
      phone: "02145785545",
      image: "string"
    }

  ];

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
