import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service'
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import {User} from "../../../models/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isLogin: boolean = false
 // errorMessage: any
  isAdmin: any;

  constructor(
    private _auth: AuthService,
    private _router:Router
  ) { }

  ngOnInit(): void {
    this.isUserLogin();
    this.isAdmin = 'No';
  }

  onSubmit(form: NgForm): void  {
    this._auth.register(form.value).subscribe( res => {
      this._router.navigateByUrl('/admin').then(() => {
        window.location.reload();
      });
    });
  }
  isUserLogin(){
    if(this._auth.getToken() != null){
      this.isLogin = true;
    }
  }
  logout(){
    this._auth.logout();
    this.isLogin = false;
    console.log('logged out');
    this._router.navigateByUrl('/login').then(() => {
      window.location.reload();
    });
  }

}
