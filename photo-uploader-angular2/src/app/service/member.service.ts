import { Injectable } from '@angular/core';
import { SearchResults } from '../models/search-results.model';
import { SearchParams } from '../models/search-params.model';
@Injectable()
export class MemberService {
  public members: SearchResults[] = [
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
    },
    {
      memberId: 'ca63b92c-f8f5-4b4f-9628-8e80219becf4',
      firstname: 'Alice',
      lastname: "Frank",
      email: "alice@brentedwardsonline.com",
      phone: "03658554552",
      image: "string"
    },
    {
      memberId: 'f5f70ef5-264e-4df5-9602-c25d47908232',
      firstname: 'Brent',
      lastname: "Edwards",
      email: "brent@brentedwardsonline.com",
      phone: "0405250846",
      image: "string"
    },
    {
      memberId: '7ae0219d-b466-4b9e-b03a-b966b7db38a0',
      firstname: 'Guest',
      lastname: "User",
      email: "guest@guest.com",
      phone: "0889554545",
      image: "string"
    },
  ]; 



  constructor() { }
  
  getMembers(searchParams: SearchParams) {
    return this.members.filter( m => m.firstname === searchParams.firstname)
  }

  saveImage() {

  }

}
