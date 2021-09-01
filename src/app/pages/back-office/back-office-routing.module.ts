import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BLayoutComponent } from 'src/app/layout/back-office/b-layout/b-layout.component';
import { ActualiteComponent } from 'src/app/layout/page-content/actualite/actualite.component';
import { DashboardComponent } from 'src/app/layout/page-content/dashboard/dashboard.component';
import { DAcceptComponent } from 'src/app/layout/page-content/dossiers/d-accept/d-accept.component';
import { DAdmisComponent } from 'src/app/layout/page-content/dossiers/d-admis/d-admis.component';
import { DListComponent } from 'src/app/layout/page-content/dossiers/d-list/d-list.component';
import { DRefusComponent } from 'src/app/layout/page-content/dossiers/d-refus/d-refus.component';
import { ManageAdminComponent } from 'src/app/layout/page-content/manage-admin/manage-admin.component';
import { ProfilComponent } from 'src/app/layout/page-content/profil/profil.component';



const routes: Routes = [
  {
    path: '',
    component: BLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashbord'},
      { path: 'dashboard', component: DashboardComponent, pathMatch: 'full'},
      { path: 'manage-admin', component: ManageAdminComponent, pathMatch: 'full'},
      { path: 'profil', component: ProfilComponent, pathMatch: 'full'},
      { path: 'd-accept', component: DAcceptComponent, pathMatch: 'full'},
      { path: 'd-admis', component: DAdmisComponent, pathMatch: 'full'},
      { path: 'd-list', component: DListComponent, pathMatch: 'full'},
      { path: 'd-refus', component: DRefusComponent, pathMatch: 'full'},
      { path: 'actualite', component: ActualiteComponent, pathMatch: 'full'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackOfficeRoutingModule { }
