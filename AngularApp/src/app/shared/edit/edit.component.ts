import {Component, Input, NgZone, OnInit} from '@angular/core';
import {Specialty} from "../../models/specialty";
import {Service} from "../../models/service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ServiceService} from "../../services/service.service";
import {SpecialtyService} from "../../services/specialty.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  @Input() service?: Service;
  @Input() specialty?: Specialty;
  submitted = false;
  isLogin: boolean = false;
  isAdmin: boolean = false;
  serviceForm: FormGroup;
  specialtyForm: FormGroup;
  component = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _auth: AuthService,
    private serviceService: ServiceService,
    private specialtyService: SpecialtyService,
    private location: Location,
    public fb: FormBuilder,
    private ngZone: NgZone,
    ) {
    this.serviceForm = this.fb.group({
      type: ['', [Validators.required]],
      price: ['', [Validators.required]]
    });
    this.specialtyForm = this.fb.group({
      type: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.isUserLogin();
    this.isUserAdmin();
    if ( this.router.url.split('/')[1] == 'service') {
      this.component = "service";
      if (this.route.snapshot.paramMap.get('id')!=null){
        this.getService();
      }
    }
    else if ( this.router.url.split('/')[1] == 'specialty'){
      this.component = "specialty";
      if (this.route.snapshot.paramMap.get('id')!=null) {
        this.getSpecialty();
      }
    }
  }

  get myForm() {
    return this.serviceForm.controls;
  }

  get myFormSpecialty() {
    return this.serviceForm.controls;
  }

  onSubmitService() {
    this.submitted = true;
    if (!this.serviceForm.valid) {
      return false;
    } else {
      return this.serviceService.addService(this.serviceForm.value).subscribe({
        complete: () => {
          console.log('Service successfully created!'),
            this.ngZone.run(() => this.router.navigateByUrl('/admin'));
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }

  onSubmitSpecialty() {
    this.submitted = true;
    if (!this.specialtyForm.valid) {
      return false;
    } else {
      return this.specialtyService.addSpeciality(this.specialtyForm.value).subscribe({
        complete: () => {
          console.log('Specialty successfully created!'),
            this.ngZone.run(() => this.router.navigateByUrl('/admin'));
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }

  getService(): void{
    const id= this.route.snapshot.paramMap.get('id');
    this.serviceService.getService(id)
      .subscribe(service=>  {
        this.service =service});
  }

  getSpecialty(): void{
    const id= this.route.snapshot.paramMap.get('id');
    this.specialtyService.getSpeciality(id)
      .subscribe(specialty=>  {
        this.specialty =specialty});
  }

  saveService(): void {
    if (this.service) {
      this.serviceService.updateService(this.service)
        .subscribe(() => this.goBack());
    }
  }

  saveSpecialty(): void {
    if (this.specialty) {
      this.specialtyService.updateSpeciality(this.specialty)
        .subscribe(() => this.goBack());
    }
  }

  isUserLogin(){
    if(this._auth.getToken() != null){
      this.isLogin = true;
    }
  }

  isUserAdmin(){
    if(this._auth.getAdmin()=="true"){
      this.isAdmin = true;
    }
  }

  goBack(): void {
    this.location.back();
  }

}
