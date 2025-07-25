import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class SearchApiService {
  API_BASE_URL = 'https://restcountries.com/';
  API_VERSION = 'v3.1/';
  API_ENDPOINT_NAME = 'name/';

  constructor(private httpClient: HttpClient) { }

  getCountryByName(name: string): Observable<any> {
   return this.httpClient.get<Country[]>(`${this.API_BASE_URL}${this.API_VERSION}${this.API_ENDPOINT_NAME}${name}`);
  }

}
