import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { People } from 'src/app/models/people';
import { PeopleService } from 'src/app/services/people.service';

/**
 * This page display all details of a specific people.
 */
@Component({
  selector: 'app-people-by-id',
  templateUrl: './people-by-id.component.html',
  styleUrls: ['./people-by-id.component.scss'],
})
export class PeopleByIdComponent implements OnInit {

  @Input() specificPeopleReceived: People;
  @Output() viewOfSpecificPeople = new EventEmitter<boolean>();

  constructor(private peopleService: PeopleService) { }

  /**
   * Specific people component Initialisation
   */
  ngOnInit() {}

  /**
   * Onchange fct to listen and get details of specific people received.
   * @param changes to listen change in component.
   */
  ngOnChanges(changes: SimpleChanges) {
    if(!this.specificPeopleReceived.films[0].title){
      this.getAllDetailsOfCurrentSpecificPeople();
    }
  }

  /**
   * Simple output for redirect user to the list of people page.
   */
  back() {
    this.viewOfSpecificPeople.emit(false);
  }

  /**
   * Fct to get all urls in films/species/starships/vehicles to transform in data.
   */
  getAllDetailsOfCurrentSpecificPeople() {
    console.log(this.specificPeopleReceived);
    let temporaryArrayOfFilms = [];
    let temporaryArrayOfSpecies = [];
    let temporaryArrayOfStarships = [];
    let temporaryArrayOfVehicles = [];

    this.specificPeopleReceived.films.forEach(url => {
      this.peopleService.getFilmOfSpecificPeople(url).subscribe((data) => {
        temporaryArrayOfFilms.push(data);
      })
    });
    this.specificPeopleReceived.species.forEach(url => {
      this.peopleService.getFilmOfSpecificPeople(url).subscribe((data) => {
        temporaryArrayOfSpecies.push(data);
      })
    });
    this.specificPeopleReceived.starships.forEach(url => {
      this.peopleService.getFilmOfSpecificPeople(url).subscribe((data) => {
        temporaryArrayOfStarships.push(data);
      })
    });
    this.specificPeopleReceived.vehicles.forEach(url => {
      this.peopleService.getFilmOfSpecificPeople(url).subscribe((data) => {
        temporaryArrayOfVehicles.push(data);
      })
    });

    this.specificPeopleReceived.films = temporaryArrayOfFilms;
    this.specificPeopleReceived.species = temporaryArrayOfSpecies;
    this.specificPeopleReceived.starships = temporaryArrayOfStarships;
    this.specificPeopleReceived.vehicles = temporaryArrayOfVehicles;
  }

}
