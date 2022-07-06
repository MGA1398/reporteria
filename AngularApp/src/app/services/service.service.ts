import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
import { Service } from '../models/service';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  readonly baseURL = 'http://localhost:3000/';

  constructor(private _httpClient: HttpClient) {
  }

  public getServices(): Observable<Service[]> {
    const url = this.baseURL;
    return this._httpClient.get<Service[]>(`${url}api/services`);
  }

  public getService(id: any): Observable<Service> {
    const url = `${this.baseURL}api/services/${id}`;
    return this._httpClient.get<Service>(url);
  }

  public updateService(service: Service): Observable<any> {
    const url = `${this.baseURL}api/services/${service.id}`;
    return this._httpClient.put(url, service);
  }

  public addService(service: Service): Observable<Service> {
    return this._httpClient.post<Service>(`${this.baseURL}api/services`, service);
  }

  deleteService(id: number): Observable<Service> {
    const url = `${this.baseURL}api/services/${id}`;
    return this._httpClient.delete<Service>(url);
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Service[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this._httpClient.get<Service[]>(`${this.baseURL}api/services/?name=${term}`);
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
