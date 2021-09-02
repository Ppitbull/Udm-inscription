import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BLayoutComponent } from 'src/app/layout/back-office/b-layout/b-layout.component';
import { ActualiteComponent } from 'src/app/layout/page-content/actualite/actualite.component';
import { DashboardComponent } from 'src/app/layout/page-content/dashboard/dashboard.component';
import { ManageAdminComponent } from 'src/app/layout/page-content/manage-admin/manage-admin.component';
import { ProfilComponent } from 'src/app/layout/page-content/profil/profil.component';
import { DossierCandidatureState } from 'src/app/shared/utils/enum/dossier-candidature.enum';
import { ListCandidatureComponent } from './list-candidature/list-candidature.component';



const routes: Routes = [
  {
    path: '',
    component: BLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashbord'},
      { path: 'dashboard', component: DashboardComponent, pathMatch: 'full'},
      { path: 'manage-admin', component: ManageAdminComponent, pathMatch: 'full'},
      { path: 'profil', component: ProfilComponent, pathMatch: 'full'},
      { 
        path: 'd-accept', 
        component: ListCandidatureComponent,
        pathMatch: 'full',
        data:{
          title:"Liste des dossiers acceptés",
          docType:DossierCandidatureState.ACCEPTED
        }
      },
      { 
        path: 'd-admis', 
        component: ListCandidatureComponent, 
        pathMatch: 'full',
        data:{
          title:"Liste des candidats admis",
          docType:DossierCandidatureState.ADMITTED
        }
      },
      { 
        path: 'd-list', 
        component: ListCandidatureComponent, 
        pathMatch: 'full',
        data:{
          title:"Liste de tous les dossiers",
          docType:"all"
        }
      },
      { 
        path: 'd-refus', 
        component: ListCandidatureComponent, 
        pathMatch: 'full',
        data:{
          title:"Liste des dossiers rejectés",
          docType:DossierCandidatureState.FAILD
        }
      },
      { 
        path: 'd-invalid', 
        component: ListCandidatureComponent, 
        pathMatch: 'full',
        data:{
          title:"Liste des dossiers invalid",
          docType:DossierCandidatureState.INVALID
        }
      },
      { path: 'actualite', component: ActualiteComponent, pathMatch: 'full'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackOfficeRoutingModule { }
