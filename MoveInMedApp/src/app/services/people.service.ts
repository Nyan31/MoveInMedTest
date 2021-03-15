import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Films } from '../models/films';
import { Planets } from '../models/planets';
import { Species } from '../models/species';
import { Starships } from '../models/starships';
import { Vehicles } from '../models/vehicles';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getAllPeople(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'people');
  }

  getSpecificPageOfPeople(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  getHomeworldOfSpecificPeople(url: string): Observable<Planets> {
    return this.http.get<Planets>(url);
  }

  getFilmOfSpecificPeople(url): Observable<Films> {
    return this.http.get<Films>(url);
  }

  getSpecieOfSpecificPeople(url): Observable<Species> {
    return this.http.get<Species>(url);
  }

  getStarshipOfSpecificPeople(url): Observable<Starships> {
    return this.http.get<Starships>(url);
  }

  getVehicleOfSpecificPeople(url): Observable<Vehicles> {
    return this.http.get<Vehicles>(url);
  }

}
