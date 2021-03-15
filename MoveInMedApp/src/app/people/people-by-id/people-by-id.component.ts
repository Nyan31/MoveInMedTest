import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { People } from 'src/app/models/people';
import { PeopleService } from 'src/app/services/people.service';

@Component({
  selector: 'app-people-by-id',
  templateUrl: './people-by-id.component.html',
  styleUrls: ['./people-by-id.component.scss'],
})
export class PeopleByIdComponent implements OnInit {

  @Input() specificPeopleReceived: People;
  @Output() viewOfSpecificPeople = new EventEmitter<boolean>();

  specificPeopleToDisplay: People;

  constructor(private peopleService: PeopleService) { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    this.specificPeopleToDisplay = this.specificPeopleReceived;
    this.getAllDetailsOfCurrentSpecificPeople();
  }

  back() {
    this.viewOfSpecificPeople.emit(false);
  }

  getAllDetailsOfCurrentSpecificPeople() {
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
