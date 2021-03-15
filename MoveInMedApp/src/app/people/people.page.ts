import { Component, Input, OnInit } from '@angular/core';
import { People } from '../models/people';
import { PeopleService } from '../services/people.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.page.html',
  styleUrls: ['./people.page.scss'],
})
export class PeoplePage implements OnInit {

  arrayListOfAllPeople = [];
  currentPreviousPagePeople: string;
  currentNextPagePeople: string;

  currentTextSearched: string = '';
  arrayOfPeopleFromSearch = [];
  tempResultOfPeopleSearch = [];

  specificPeopleToSend: People;
  viewSpecificPeople: boolean = false;

  constructor(private peopleService: PeopleService) {}

  ngOnInit() {
    this.getAllDataPeople();
  }

  /**
   * Call films service for get all data of movies
   * Get details data for each api url array
   */
  getAllDataPeople() {
    this.peopleService.getAllPeople().subscribe((data) => {
      this.arrayListOfAllPeople = data.results;
      this.currentNextPagePeople = data.next;
      this.currentPreviousPagePeople = data.previous;
      this.getHomeWorldOfCurrentListPeople();
      this.getAllPeopleForArraySearch(data);
    });
  }

  nextPagePeople() {
    if (this.currentNextPagePeople) {
      this.arrayListOfAllPeople = [];
      this.peopleService
        .getSpecificPageOfPeople(this.currentNextPagePeople)
        .subscribe((data) => {
          this.currentNextPagePeople = data.next;
          this.currentPreviousPagePeople = data.previous;
          this.arrayListOfAllPeople = data.results;
          this.getHomeWorldOfCurrentListPeople();
        });
    }
  }

  previousPagePeople() {
    if (this.currentPreviousPagePeople) {
      this.arrayListOfAllPeople = [];
      this.peopleService
        .getSpecificPageOfPeople(this.currentPreviousPagePeople)
        .subscribe((data) => {
          this.currentNextPagePeople = data.next;
          this.currentPreviousPagePeople = data.previous;
          this.arrayListOfAllPeople = data.results;
          this.getHomeWorldOfCurrentListPeople();
        });
    }
  }

  getHomeWorldOfCurrentListPeople() {
    this.arrayListOfAllPeople.forEach((people) => {
      this.peopleService
        .getHomeworldOfSpecificPeople(people.homeworld)
        .subscribe((data) => {
          people.homeworld = data.name;
        });
    });
  }

  search(e) {
    this.currentTextSearched = e;
    this.tempResultOfPeopleSearch = [];
    this.arrayOfPeopleFromSearch.forEach(element => {
      if(element.name.toLowerCase().includes(e.toString().toLowerCase())) {
        const check = this.tempResultOfPeopleSearch.find(e => e.name === element.name);
        if(!check) {
          this.tempResultOfPeopleSearch.push(element);
        }
      }
    });
  }

  getAllPeopleForArraySearch(data) {
    let nbOfPages = (Math.ceil(data.count / 10) * 10) / 10;
    this.arrayOfPeopleFromSearch = this.arrayListOfAllPeople;

    for (let i = 2; i <= nbOfPages; i++) {
      this.peopleService
        .getSpecificPageOfPeople(
          this.peopleService.apiUrl + 'people/?page=' + i
        )
        .subscribe((data) => {
          data.results.forEach((element) => {
            this.peopleService
              .getHomeworldOfSpecificPeople(element.homeworld)
              .subscribe((data) => {
                element.homeworld = data.name;
                this.arrayOfPeopleFromSearch.push(element);
              });
          });
        });
    }
  }

  goToViewofSpecificPeople(specificPeople: People) {
    this.specificPeopleToSend = specificPeople;
    this.viewSpecificPeople = true;
  }

  changeCurentViewPeople(e) {
    this.viewSpecificPeople = false;
  }
}
