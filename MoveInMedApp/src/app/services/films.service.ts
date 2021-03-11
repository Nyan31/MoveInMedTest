import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Films } from '../models/films';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class FilmsService {
  apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getAllMovies(): Observable<Films[]> {
    return this.http.get<Films[]>(this.apiUrl + 'films');
  }
}
