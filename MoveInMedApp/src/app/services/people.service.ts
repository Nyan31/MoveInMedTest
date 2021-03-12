import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { People } from '../models/people';
import { Planets } from '../models/planets';

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

  getHomeworldOfSpecificPeople(url: string): Observable<any> {
    return this.http.get<Planets>(url);
  }

}
