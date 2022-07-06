import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { AuthService } from '../../../services/auth.service'
import { Router } from '@angular/router';
import { User } from "../../../models/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLogin: boolean = false;
  errorMessage: any;

  constructor(
    private _auth: AuthService,
    private _router:Router
  ) { }

  ngOnInit(): void {
    this.isUserLogin();
  }


  onSubmit(form: NgForm): void {
    this._auth.login(form.value).subscribe( res => {
      this._router.navigateByUrl('/dashboard').then(() => {
        window.location.reload();
      });
    })
  }
  isUserLogin(){
    if(this._auth.getToken()!=null){
      this.isLogin = true;
    }
  }
  logout(){
    this._auth.logout();
    console.log('logged out');
    this.isLogin = false;
    this._router.navigateByUrl('/login').then(() => {
    });
  }

}
