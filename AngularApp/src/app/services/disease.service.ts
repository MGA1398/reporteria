import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
import { Disease } from '../models/disease';


@Injectable({
  providedIn: 'root'
})
export class DiseaseService {
  readonly baseURL = 'http://localhost:3000/';

  constructor(private _httpClient: HttpClient) {
  }

  public getDiseases(): Observable<Disease[]> {
    const url = this.baseURL;
    return this._httpClient.get<Disease[]>(`${url}api/diseases`);
  }

  public getDisease(id: any): Observable<Disease> {
    const url = `${this.baseURL}api/diseases/${id}`;
    return this._httpClient.get<Disease>(url);
  }

  public updateDisease(disease: Disease): Observable<any> {
    const url = `${this.baseURL}api/diseases/${disease.id}`;
    return this._httpClient.put(url, disease);
  }

  public addDisease(disease: Disease): Observable<Disease> {
    return this._httpClient.post<Disease>(`${this.baseURL}api/diseases`, disease);
  }

  deleteDisease(id: number): Observable<Disease> {
    const url = `${this.baseURL}api/diseases/${id}`;
    return this._httpClient.delete<Disease>(url);
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Disease[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this._httpClient.get<Disease[]>(`${this.baseURL}api/diseases/?name=${term}`);
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
