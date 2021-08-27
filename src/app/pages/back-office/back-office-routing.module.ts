import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BLayoutComponent } from 'src/app/layout/back-office/b-layout/b-layout.component';
import { DashboardComponent } from 'src/app/layout/page-content/dashboard/dashboard.component';
import { ProfilComponent } from 'src/app/layout/page-content/profil/profil.component';



const routes: Routes = [
  {
    path: '',
    component: BLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashbord'},
      { path: 'dashboard', component: DashboardComponent, pathMatch: 'full'},
      { path: 'profil', component: ProfilComponent, pathMatch: 'full'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackOfficeRoutingModule { }
