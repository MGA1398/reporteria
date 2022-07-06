import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {Pet} from "../models/pet";
import {PetService} from "../services/pet.service";
import {Service} from "../models/service";
import {Specialty} from "../models/specialty";
import {ServiceService} from "../services/service.service";
import {SpecialtyService} from "../services/specialty.service";
import {User} from "../models/user";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  isLogin: boolean = false;
  isAdmin: boolean = false;
  pets: Pet[] = [];
  services: Service[] = [];
  specialities: Specialty[] = [];
  users: User[] = [];

  constructor(
    private _auth: AuthService,
    private  _router: Router,
    private petService: PetService,
    private serviceService: ServiceService,
    private specialityService: SpecialtyService
  ) { }

  ngOnInit(): void {
    this.isUserLogin();
    this.isUserAdmin();
    this.getPets();
    this.getServices();
    this.getSpecialities();
    this.getUsers();
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

  getPets(): void {
    this.petService.getPets()
      .subscribe(pets => this.pets = pets);
  }

  delete(pet: Pet): void {
    this.pets = this.pets.filter(h => h !== pet);
    this.petService.deletePet(pet.id).subscribe();
  }

  getServices(): void{
    this.serviceService.getServices()
      .subscribe(services=> this.services = services);
  }

  deleteService(service: Service): void {
    this.services = this.services.filter(h => h !== service);
    this.serviceService.deleteService(service.id).subscribe();
  }

  getSpecialities(): void{
    this.specialityService.getSpecialitys()
      .subscribe(specialities=> this.specialities = specialities);
  }

  deleteSpecialty(specialty: Specialty): void {
    this.specialities = this.specialities.filter(h => h !== specialty);
    this.specialityService.deleteSpeciality(specialty.id).subscribe();
  }

  getUsers(): void{
    this._auth.getUsers()
      .subscribe(users=> this.users = users);
  }

  deleteUser(user: User): void {
    this.users = this.users.filter(h => h !== user);
    this._auth.deleteUser(user.id).subscribe();
  }

}
