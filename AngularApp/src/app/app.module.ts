import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PetComponent } from './pet/pet.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PetDetailComponent } from './pet-detail/pet-detail.component';
import {HttpClientModule} from "@angular/common/http";
import { DashboardComponent } from './dashboard/dashboard.component';
import { PetSearchComponent } from './pet-search/pet-search.component';
import {AuthModule} from "./auth/auth/auth.module";
import { VisualizerComponent } from './shared/visualizer/visualizer.component';
import { EditComponent } from './shared/edit/edit.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import {LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { DateFilterPipe } from './services/pipes/date-filter.pipe';
import { SelectFilterPipe } from './services/pipes/select-filter.pipe';
import { ServiceFilterPipe } from './services/pipes/service-filter.pipe';
import { SpecialtyFilterPipe } from './services/pipes/specialty-filter.pipe';
import { FilterCountPipe } from './services/pipes/filter-count.pipe';
import { AdminComponent } from './admin/admin.component';
import { DiseaseFilterPipe } from './services/pipes/disease-filter.pipe';
registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    PetComponent,
    PetDetailComponent,
    DashboardComponent,
    PetSearchComponent,
    VisualizerComponent,
    EditComponent,
    TransactionsComponent,
    TransactionDetailComponent,
    DateFilterPipe,
    SelectFilterPipe,
    ServiceFilterPipe,
    SpecialtyFilterPipe,
    FilterCountPipe,
    AdminComponent,
    DiseaseFilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AuthModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'es'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
