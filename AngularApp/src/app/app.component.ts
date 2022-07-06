import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Pets App';
  isLogin: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private _auth: AuthService,
    private  _router: Router
  ) { }

  ngOnInit(): void {
    this.isUserLogin();
    this.isUserAdmin();
  }

  isUserLogin(){
    if(this._auth.getToken()!=null){
      this.isLogin = true;
    }
  }

  isUserAdmin(){
    if(this._auth.getAdmin()=="true"){
      this.isAdmin = true;
    }
  }

  logout(){
    this._auth.logout();
    this.isLogin = false;
    this.isAdmin = false;
    console.log('logged out');
    this._router.navigateByUrl('/login').then(() => {
      window.location.reload();
    });
  }
}
