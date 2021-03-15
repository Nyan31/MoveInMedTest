import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSelect } from '@ionic/angular';
import { Films } from '../models/films';
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
  arrayOfAllDirector: string[] = [];
  displayArrayFilmByDirector: Films[];
  arrayOfFilteredFilmsToSend: Films[];

  // refer to the director select via the template reference
  @ViewChild('directorSelect') directorSelect: IonSelect;

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
      this.filmsGlobalInformations = data.results.sort((a, b) => a.title.localeCompare(b.title));
      this.arrayOfFilteredFilmsToSend = this.filmsGlobalInformations;

      this.filmsGlobalInformations.forEach((specificFilm) => {
        if (!this.arrayOfAllDirector.includes(specificFilm.director)) {
          this.arrayOfAllDirector.push(specificFilm.director);
        }
      });

    });
  }

  /**
   * Sort array list of films by specific param
   * @param sortChoice by alphabetic order or by release date
   */
  displayFilmBySortParam(sortChoice) {
    this.directorSelect.value = '';
    if(!sortChoice.detail.checked) {
      this.filmsGlobalInformations.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      this.filmsGlobalInformations.sort((d1, d2) => new Date(d1.release_date).getTime() - new Date(d2.release_date).getTime());
    }
    this.arrayOfFilteredFilmsToSend = this.filmsGlobalInformations;
  }

  /**
   * Filter array list of films by specific director selected
   * @param selectedDirector specified director in select
   */
  displayFilmBySelectedDirector(selectedDirector) {
    this.displayArrayFilmByDirector = [];
    this.filmsGlobalInformations.forEach((specificFilm) => {
      if (specificFilm.director == selectedDirector.detail.value) {
        this.displayArrayFilmByDirector.push(specificFilm);
      }
    });
    this.arrayOfFilteredFilmsToSend = this.displayArrayFilmByDirector;

  }
}
