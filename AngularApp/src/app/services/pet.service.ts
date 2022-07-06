import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
import { Pet } from '../models/pet';


@Injectable({
  providedIn: 'root'
})
export class PetService {
  readonly baseURL = 'http://localhost:3000/';

  constructor(private _httpClient: HttpClient) {
  }

  public getPets(): Observable<Pet[]> {
    const url = this.baseURL;
    return this._httpClient.get<Pet[]>(`${url}api/pets`);
  }

  public getPet(id: any): Observable<Pet> {
    const url = `${this.baseURL}api/pets/${id}`;
    return this._httpClient.get<Pet>(url);
  }

  public updatePet(pet: Pet): Observable<any> {
    const url = `${this.baseURL}api/pets/${pet.id}`;
    return this._httpClient.put(url, pet);
  }

  public addPet(pet: Pet): Observable<Pet> {
    return this._httpClient.post<Pet>(`${this.baseURL}api/pets`, pet);
  }

  deletePet(id: number): Observable<Pet> {
    const url = `${this.baseURL}api/pets/${id}`;
    return this._httpClient.delete<Pet>(url);
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Pet[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this._httpClient.get<Pet[]>(`${this.baseURL}api/pets/?name=${term}`);
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
