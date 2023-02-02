import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hobby } from '../models/hobby';
import { Region } from '../models/region';

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  constructor(private http: HttpClient) { }

  getAllHobbies(): Observable<Hobby[]> {
    return this.http.get<Hobby[]>('http://localhost:9090/api/v1/preferences/getAllHobbies');
  }

  getAllRegions(): Observable<Region[]> {
    return this.http.get<Region[]>('http://localhost:9090/api/v1/preferences/getAllRegions');
  }

}
