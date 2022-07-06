import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
import { Specialty } from '../models/specialty';


@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {
  readonly baseURL = 'http://localhost:3000/';

  constructor(private _httpClient: HttpClient) {
  }

  public getSpecialitys(): Observable<Specialty[]> {
    const url = this.baseURL;
    return this._httpClient.get<Specialty[]>(`${url}api/specialitys`);
  }

  public getSpeciality(id: any): Observable<Specialty> {
    const url = `${this.baseURL}api/specialitys/${id}`;
    return this._httpClient.get<Specialty>(url);
  }

  public updateSpeciality(speciality: Specialty): Observable<any> {
    const url = `${this.baseURL}api/specialitys/${speciality.id}`;
    return this._httpClient.put(url, speciality);
  }

  public addSpeciality(speciality: Specialty): Observable<Specialty> {
    return this._httpClient.post<Specialty>(`${this.baseURL}api/specialitys`, speciality);
  }

  deleteSpeciality(id: number): Observable<Specialty> {
    const url = `${this.baseURL}api/specialitys/${id}`;
    return this._httpClient.delete<Specialty>(url);
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Specialty[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this._httpClient.get<Specialty[]>(`${this.baseURL}api/specialitys/?name=${term}`);
  }

  // public login(loginForm: any): Observable<any> {
  //   const url = this.baseURL + '/api/Autenticacion/ObtenerAutenticacion';
  //   const params = new HttpParams({
  //     fromObject: loginForm
  //   })
  //   return this._httpClient.get(url, {
  //     params
  //   })
  // }
}
