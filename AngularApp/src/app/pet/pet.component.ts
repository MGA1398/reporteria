import { Component, OnInit } from '@angular/core';
import { PetService } from '../services/pet.service';
import { Pet } from '../models/pet';
import {Observable} from "rxjs";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss'],
  providers: [PetService]
})
export class PetComponent implements OnInit {

  pets: Pet[] = [];
  isAdmin: boolean = false;


  constructor(
    private petService: PetService
  ) { }

  ngOnInit(): void {
    this.getPets();
  }

  getPets(): void {
    this.petService.getPets()
      .subscribe(pets => this.pets = pets);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.petService.addPet({ name } as Pet)
      .subscribe(pet => {
        this.pets.push(pet);
      });
  }

  delete(pet: Pet): void {
    this.pets = this.pets.filter(h => h !== pet);
    this.petService.deletePet(pet.id).subscribe();
  }

}
