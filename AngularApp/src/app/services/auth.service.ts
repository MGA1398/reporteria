import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { User} from "../models/user";
import { JwtResponse} from "../models/jwt-response";
import {tap} from "rxjs/operators";
import { Observable, BehaviorSubject} from "rxjs";

@Injectable()
export class AuthService {
  AUTH_SERVER: string = 'http://localhost:3000';
  authSubject = new BehaviorSubject(false);
  private token: string | any;
  private isAdmin: string;
  constructor(private httpClient: HttpClient) { }

  register( user: User): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(`${this.AUTH_SERVER}/api/register`,
      user)
  }

  login( user: User): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(`${this.AUTH_SERVER}/api/login`,
      user).pipe(tap(
      (res: JwtResponse) => {
        if(res){
          this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn, res.dataUser.isAdmin);
        }
      }
    ))
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('EXPIRES_IN');
    window.location.reload();
  }

  private saveToken(token: string, expiresIn: string, isAdmin: boolean): void {
    localStorage.setItem('ACCESS_TOKEN', token);
    localStorage.setItem('EXPIRES_IN', expiresIn);
    this.isAdmin = String(isAdmin);
    localStorage.setItem('IS_ADMIN', this.isAdmin);
    this.token = token;
  }

   getToken(): string {
    if(!this.token){
      this.token = localStorage.getItem('ACCESS_TOKEN');
    }
    return this.token;
  }

   getAdmin(): string {
    if (!this.isAdmin){
      this.isAdmin = localStorage.getItem('IS_ADMIN');
    }
    return this.isAdmin
  }

  getUsers(): Observable<User[]> {
    const url = this.AUTH_SERVER;
    return this.httpClient.get<User[]>(`${url}/api/users`);
  }

  deleteUser(id: number): Observable<User> {
    const url = `${this.AUTH_SERVER}/api/user/${id}`;
    return this.httpClient.delete<User>(url);
  }
  // getUserDetails() {
  //   if(localStorage.getItem('userData')){
  //     return localStorage.getItem('userData')
  //   }else{
  //     return null
  //   }
  //
  // }
  // setDataInLocalStorage(variableName: any, data: any) {
  //   localStorage.setItem(variableName, data);
  // }
  // getToken() {
  //   return localStorage.getItem('token');
  // }
  // clearStorage() {
  //   localStorage.clear();
  // }
}
