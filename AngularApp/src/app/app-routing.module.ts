import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PetComponent} from "./pet/pet.component";
import {DashboardComponent} from './dashboard/dashboard.component';
import {PetDetailComponent} from "./pet-detail/pet-detail.component";
import {LoginComponent} from "./auth/components/login/login.component";
import {RegisterComponent} from "./auth/components/register/register.component";
import {VisualizerComponent} from "./shared/visualizer/visualizer.component";
import {EditComponent} from "./shared/edit/edit.component";
import {TransactionsComponent} from "./transactions/transactions.component";
import {TransactionDetailComponent} from "./transaction-detail/transaction-detail.component";
import {AdminComponent} from "./admin/admin.component";

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'auth', loadChildren: () => import('./auth/auth/auth.module').then(x => x.AuthModule) },
  {path: 'dashboard', component: DashboardComponent},
  {path: 'pets', component: PetComponent},
  {path: 'detail', component: PetDetailComponent},
  {path: 'detail/:id', component: PetDetailComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'services', component: VisualizerComponent},
  {path: 'specialities', component: VisualizerComponent},
  {path: 'service/:id', component: EditComponent},
  {path: 'service', component: EditComponent},
  {path: 'specialty/:id', component: EditComponent},
  {path: 'specialty', component: EditComponent},
  {path: 'transactions', component: TransactionsComponent},
  {path: 'transactionDetail', component: TransactionDetailComponent},
  {path: 'transactionDetail/:id', component: TransactionDetailComponent},
  {path: 'admin', component: AdminComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
