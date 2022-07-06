import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
import { Transaction } from '../models/transaction';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  readonly baseURL = 'http://localhost:3000/';

  constructor(private _httpClient: HttpClient) {
  }

  public getTransactions(): Observable<Transaction[]> {
    const url = this.baseURL;
    return this._httpClient.get<Transaction[]>(`${url}api/transactions`);
  }

  public getTransaction(id: any): Observable<Transaction> {
    const url = `${this.baseURL}api/transactions/${id}`;
    return this._httpClient.get<Transaction>(url);
  }

  public updateTransaction(transaction: Transaction): Observable<any> {
    const url = `${this.baseURL}api/transactions/${transaction.id}`;
    return this._httpClient.put(url, transaction);
  }

  public addTransaction(transaction: Transaction): Observable<Transaction> {
    return this._httpClient.post<Transaction>(`${this.baseURL}api/transactions`, transaction);
  }

  deleteTransaction(id: number): Observable<Transaction> {
    const url = `${this.baseURL}api/transactions/${id}`;
    return this._httpClient.delete<Transaction>(url);
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Transaction[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this._httpClient.get<Transaction[]>(`${this.baseURL}api/transactions/?name=${term}`);
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
