import {Component, Input, NgZone, OnInit} from '@angular/core';
import {Transaction} from "../models/transaction";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TransactionService} from "../services/transaction.service";
import {PetService} from "../services/pet.service";
import {Pet} from "../models/pet";
import {Service} from "../models/service";
import {ServiceService} from "../services/service.service";
import {SpecialtyService} from "../services/specialty.service";
import {Specialty} from "../models/specialty";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit {

  @Input() transaction!: Transaction;
  isAdmin: boolean = false;
  pets: Pet[] = [];
  services: Service[] = [];
  specialities: Specialty[] = [];
  submitted = false;
  pet: any;
  service: any;
  specialty: any;
  total: any;
  transactionForm: FormGroup;
  date = new Date();

  constructor(
    private _auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService,
    private petService: PetService,
    private serviceService: ServiceService,
    private specialtyService: SpecialtyService,
    private location: Location,
    public fb: FormBuilder,
    private ngZone: NgZone,
    ) {
    this.transactionForm = this.fb.group( {
      patient_name: ['', [Validators.required]],
      service_type: ['', [Validators.required]],
      service_price: ['', [Validators.required]],
      speciality_type: ['', [Validators.required]],
      transaction_date: ['', [Validators.required]],
      transaction_description: ['', [Validators.required]],
      transaction_amount: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.isUserAdmin();
    if (this.route.snapshot.paramMap.get('id')!=null){
      this.getTransaction();
    } else {
      this.getPets();
      this.getSpecialities();
      this.getServices();
    }
  }

  isUserAdmin(){
    if(this._auth.getAdmin()=="true"){
      this.isAdmin = true;
    }
  }

  parseDate(dateString: string): Date {
    if (dateString) {
      return new Date(dateString);
    }
    return null;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.transactionForm.valid) {
      return false;
    } else {
      this.transactionForm.value.patient_id = this.pet.id;
      this.transactionForm.value.patient_name = this.pet.name;
      this.transactionForm.value.service_id = this.service.id;
      this.transactionForm.value.service_type = this.service.type;
      this.transactionForm.value.service_price = this.service.price;
      this.transactionForm.value.speciality_id = this.specialty.id;
      this.transactionForm.value.speciality_type = this.specialty.type;
      this.transactionForm.value.disease_id = this.pet.disease_id;
      this.transactionForm.value.disease_type = this.pet.disease_type;
      return this.transactionService.addTransaction(this.transactionForm.value).subscribe({
        complete: () => {
          console.log('Transaction successfully created!');
            this.ngZone.run(() => this.router.navigateByUrl('/transactions'));
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }

  get myForm() {
    return this.transactionForm.controls;
  }

  public selectPet(data: any) {
    this.pet = data;
  }

  public selectService(data: any) {
    this.service = data;
    this.total = data.price;
  }

  public selectSpecialty(data: any) {
    this.specialty = data;
  }

  getTransaction(): void {
    const id= this.route.snapshot.paramMap.get('id');
    this.transactionService.getTransaction(id)
      .subscribe(transaction=>  {
        this.transaction =transaction});
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.transaction) {
      this.transactionService.updateTransaction(this.transaction)
        .subscribe(() => this.goBack());
    }
  }

  getPets(): void {
    this.petService.getPets()
      .subscribe(pets => this.pets = pets);
  }

  getServices(): void{
    this.serviceService.getServices()
      .subscribe(services=> this.services = services);
  }

  getSpecialities(): void{
    this.specialtyService.getSpecialitys()
      .subscribe(specialities=> this.specialities = specialities);
  }
}
