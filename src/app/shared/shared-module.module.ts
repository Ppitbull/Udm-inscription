import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormationInscriptionComponent } from './components/formation-inscription/formation-inscription.component';
import {MatSelectModule} from '@angular/material/select';
import { InfosPersoInscriptionComponent } from './components/infos-perso-inscription/infos-perso-inscription.component';
import { QualificationsInscriptionComponent } from './components/qualifications-inscription/qualifications-inscription.component';
import {MatTableModule} from '@angular/material/table';
import { FiliereFormationInscriptionComponent } from './components/filiere-formation-inscription/filiere-formation-inscription.component';
import { FormAdminssionFinalComponent } from './components/form-adminssion-final/form-adminssion-final.component';
import { InputTypeNumberModule } from './components/input-type-number/input-type-number.module';
import { DocsFormModule } from './components/docs-form/docs-form.module';
import { SimpleLoaderComponent } from './components/loader/simple-loader/simple-loader.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LeftFormationListComponent } from './components/left-formation-list/left-formation-list.component';
import { TableEtudiantListComponent } from './components/table-etudiant-list/table-etudiant-list.component';
import { ModalCandidatureComponent } from './components/modal-candidature/modal-candidature.component';
import { DossierComponent } from './components/dossiers/dossier.component';


@NgModule({
  declarations: [   
    FormationInscriptionComponent, 
    InfosPersoInscriptionComponent, 
    QualificationsInscriptionComponent, 
    FiliereFormationInscriptionComponent,
    FormAdminssionFinalComponent,
    SimpleLoaderComponent,
    LeftFormationListComponent,
    TableEtudiantListComponent,
    ModalCandidatureComponent,
    DossierComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatSelectModule,
    MatTableModule,
    InputTypeNumberModule,
    DocsFormModule,
    ModalModule.forRoot()
  ],
  exports:[
    FormationInscriptionComponent,
    InfosPersoInscriptionComponent,
    QualificationsInscriptionComponent,
    FiliereFormationInscriptionComponent,
    FormAdminssionFinalComponent,
    InputTypeNumberModule,
    SimpleLoaderComponent,
    LeftFormationListComponent,
    TableEtudiantListComponent,

  ]
})
export class SharedModule { }
