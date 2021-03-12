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

}
