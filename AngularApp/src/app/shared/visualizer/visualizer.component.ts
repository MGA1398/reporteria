import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Service} from "../../models/service";
import {Specialty} from "../../models/specialty";
import {AuthService} from "../../services/auth.service";
import {ServiceService} from "../../services/service.service";
import {SpecialtyService} from "../../services/specialty.service";

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.scss']
})

export class VisualizerComponent implements OnInit {
  isLogin: boolean = false;
  services: Service[] = [];
  specialities: Specialty[] = [];
  component = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _auth: AuthService,
    private serviceService: ServiceService,
    private specialityService: SpecialtyService
  ) { }

  ngOnInit(): void {
    this.isUserLogin();
    if (this.router.url === '/services'){
      this.component = "services";
      this.getServices();
    }
    else if (this.router.url === '/specialities'){
      this.component = "specialty";
      this.getSpecialities();
    }
  }

  getServices(): void{
    this.serviceService.getServices()
      .subscribe(services=> this.services = services);
  }

  getSpecialities(): void{
    this.specialityService.getSpecialitys()
      .subscribe(specialities=> this.specialities = specialities);
  }

  isUserLogin(){
    if(this._auth.getToken() != null){
      this.isLogin = true;
    }
  }

}
