import { Component, OnInit, Input, SimpleChanges, EventEmitter } from '@angular/core';
import { SearchParams } from '../models/search-params.model';
import { SearchResults } from '../models/search-results.model';
import { MemberService } from '../service/member.service';
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
  inputs: ['searchParams'],
  outputs: ['selectedMemberEvent'],
  providers: [MemberService]
})
export class SearchResultsComponent implements OnInit {
  @Input() searchParams: SearchParams;
  selectedMemberEvent = new EventEmitter<string>();
  private selectedRow = -1;
  public searchResults: any;
  private errorMessage: string;
  constructor(private memberService: MemberService) { 

  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    let param : SearchParams = changes['searchParams'].currentValue; 

    if( param.email.length == 0 && param.phone.length == 0 && param.firstname.length == 0 && param.lastname.length == 0 ){
      this.searchResults = [];
      return;
    }

    this.memberService.getMembers(param)
      .subscribe(
            (response) => {
                console.log(response);
                this.searchResults = response.result;
            },
            (error: any) => {
                // Checks for error in response (error from the Token endpoint).
                if (error._body != "") {
                    let body: any = error.json();

                    switch (body.error) {
                        case "invalid_grant":
                            this.errorMessage = "Invalid email or password";
                            break;
                        default:
                            this.errorMessage = "Unexpected error. Try again";
                    }
                } else {
                    let errMsg = (error.message) ? error.message :
                        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
                    console.log(errMsg);
                    this.errorMessage = "Server error. Try again later.";
                }
            });
  }

  getImage(memberId: string, idx: number) {
    this.selectedRow = idx;
    this.selectedMemberEvent.emit(memberId);
  }


}
