import { Component, Input, OnInit } from '@angular/core';
import { People } from '../models/people';
import { PeopleService } from '../services/people.service';

/**
 * This page display the list of all people.
 * It's can filter by lastanem, firstname and homeworld.
 * You can click on specific people for display more details.
 */
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

  /**
   * People page Initialisation
   */
  ngOnInit() {
    this.getAllDataPeople();
  }

  /**
   * Call films service for get all data of movies in first page
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

  /**
   * Call films service for get all data of movies in next page
   */
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

  /**
   * Call films service for get all data of movies in previous page
   */
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

  /**
   * Call films service for get homeworld of all people siplay in current page
   */
  getHomeWorldOfCurrentListPeople() {
    this.arrayListOfAllPeople.forEach((people) => {
      this.peopleService
        .getHomeworldOfSpecificPeople(people.homeworld)
        .subscribe((data) => {
          people.homeworld = data.name;
        });
    });
  }

  /**
   * Search fct for find specific people by lastname/firstname/homeworld
   * @param event text in searchbar
   */
  search(e) {
    this.currentTextSearched = e;
    this.tempResultOfPeopleSearch = [];
    this.arrayOfPeopleFromSearch.forEach(element => {
      if(element.name.toLowerCase().includes(e.toString().toLowerCase()) || element.homeworld.toLowerCase().includes(e.toString().toLowerCase())) {
        const check = this.tempResultOfPeopleSearch.find(e => e.name === element.name);
        if(!check) {
          this.tempResultOfPeopleSearch.push(element);
        }
      }
    });
  }

  /**
   * fct for get all people, replace url homeworld by data homeworld and push them in array used in search.
   * @param data list of all people received by the api.
   */
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

  /**
   * fct launched on click in specific people list.
   * Display people-by-id component with specific people data.
   * @param specificPeople specific people from api.
   */
  goToViewofSpecificPeople(specificPeople: People) {
    this.specificPeopleToSend = specificPeople;
    this.viewSpecificPeople = true;
  }

  /**
   * fct to hide people-by-id component & display the list of people.
   * @param event
   */
  changeCurentViewPeople(e) {
    this.viewSpecificPeople = false;
  }
}
