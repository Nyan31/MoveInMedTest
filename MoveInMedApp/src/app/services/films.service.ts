import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Films } from '../models/films';
import { environment } from '../../environments/environment.prod';
import { People } from '../models/people';
import { Starships } from '../models/starships';
import { Planets } from '../models/planets';
import { Vehicles } from '../models/vehicles';
import { Species } from '../models/species';

@Injectable({
  providedIn: 'root',
})
export class FilmsService {
  apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getAllMovies(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'films');
  }

  getAllCharactersFromSpecificMovie(apiUrlSpecificCharacter: string): Observable<People> {
    return this.http.get<People>(apiUrlSpecificCharacter);
  }

  getAllPlanetsFromSpecificMovie(apiUrlSpecificPlanets: string): Observable<Planets> {
    return this.http.get<Planets>(apiUrlSpecificPlanets);
  }

  getAllStarshipsFromSpecificMovie(apiUrlSpecificStarships: string): Observable<Starships> {
    return this.http.get<Starships>(apiUrlSpecificStarships);
  }

  getAllVehiclesFromSpecificMovie(apiUrlSpecificVehicles: string): Observable<Vehicles> {
    return this.http.get<Vehicles>(apiUrlSpecificVehicles);
  }

  getAllSpeciesFromSpecificMovie(apiUrlSpecificSpecies: string): Observable<Species> {
    return this.http.get<Species>(apiUrlSpecificSpecies);
  }
}
