import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Films } from '../models/films';
import { People } from '../models/people';
import { Planets } from '../models/planets';
import { Species } from '../models/species';
import { Starships } from '../models/starships';
import { Vehicles } from '../models/vehicles';
import { FilmsService } from '../services/films.service';

/**
 * This page display data of movies
 * It's can filter by director
 * It's can sort movies by alphabetical order and by release date
 */
@Component({
  selector: 'app-films',
  templateUrl: './films.page.html',
  styleUrls: ['./films.page.scss'],
})
export class FilmsPage implements OnInit {
  filmsGlobalInformations: Films[];

  selectedDirector: string;
  displayArrayFilmByDirector: Films[];


  constructor(private filmsService: FilmsService) {}

  /**
   * Films page Initialisation
   */
  ngOnInit() {
    this.getAllDataMovies();
  }

  /**
   * Call films service for get all data of movies
   * Get details data for each api url array
   */
  getAllDataMovies() {
    this.filmsService.getAllMovies().subscribe((data) => {
      const temporaryFilmsGlobalInformations = data.results;

      temporaryFilmsGlobalInformations.forEach(specificFilm => {

        let allCharactersFromSpecificFilm: People[] = [];
        let allPlanetsFromSpecificFilm: Planets[] = [];
        let allStarshipsFromSpecificFilm: Starships[] = [];
        let allVehiclesFromSpecificFilm: Vehicles[] = [];
        let allSpeciesFromSpecificFilm: Species[] = [];

        specificFilm.characters.forEach(specificCharacter => {
          this.filmsService.getAllCharactersFromSpecificMovie(specificCharacter).subscribe((data) => {
            allCharactersFromSpecificFilm.push(data);
          })
        });

        specificFilm.planets.forEach(specificPlanets => {
          this.filmsService.getAllPlanetsFromSpecificMovie(specificPlanets).subscribe((data) => {
            allPlanetsFromSpecificFilm.push(data);
          })
        });

        specificFilm.starships.forEach(specificStarships => {
          this.filmsService.getAllStarshipsFromSpecificMovie(specificStarships).subscribe((data) => {
            allStarshipsFromSpecificFilm.push(data);
          })
        });

        specificFilm.vehicles.forEach(specificVehicles => {
          this.filmsService.getAllVehiclesFromSpecificMovie(specificVehicles).subscribe((data) => {
            allVehiclesFromSpecificFilm.push(data);
          })
        });

        specificFilm.species.forEach(specificSpecies => {
          this.filmsService.getAllSpeciesFromSpecificMovie(specificSpecies).subscribe((data) => {
            allSpeciesFromSpecificFilm.push(data);
          })
        });

        specificFilm.characters = allCharactersFromSpecificFilm;
        specificFilm.planets = allPlanetsFromSpecificFilm;
        specificFilm.starships = allStarshipsFromSpecificFilm;
        specificFilm.vehicles = allVehiclesFromSpecificFilm;
        specificFilm.species = allSpeciesFromSpecificFilm;

        this.filmsGlobalInformations = temporaryFilmsGlobalInformations;

        //fct implement for sort array
        // this.filmsGlobalInformations.sort((a, b) => a.title.localeCompare(b.title));
        // this.filmsGlobalInformations.sort((d1, d2) => new Date(d1.release_date).getTime() - new Date(d2.release_date).getTime());



      });

    });
  }
  // Future fct for sort by director selected
  // displayFilmBySelectedDirector(selectedDirector: string) {
  //   this.filmsGlobalInformations.forEach(specificFilm => {
  //     if (specificFilm.director == selectedDirector) {
  //       this.displayArrayFilmByDirector.push(specificFilm);
  //     }
  //   });
  // }
}
