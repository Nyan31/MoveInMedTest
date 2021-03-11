import { Component, OnInit } from '@angular/core';
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
      const temporaryFilmsGlobalInformations = data;
      console.log(data);
    });
  }
}
