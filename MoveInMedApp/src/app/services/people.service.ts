import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Films } from '../models/films';
import { People } from '../models/people';
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

  getFilmOfSpecificPeople(url: any): Observable<any> {
    return this.http.get<any>(url);
  }
  getSpecieOfSpecificPeople(url: any): Observable<any> {
    return this.http.get<any>(url);
  }
  getStarshipOfSpecificPeople(url: any): Observable<any> {
    return this.http.get<any>(url);
  }
  getVehicleOfSpecificPeople(url: any): Observable<any> {
    return this.http.get<any>(url);
  }


}
