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


@NgModule({
  declarations: [   
    FormationInscriptionComponent, 
    InfosPersoInscriptionComponent, 
    QualificationsInscriptionComponent, 
    FiliereFormationInscriptionComponent,
    FormAdminssionFinalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatSelectModule,
    MatTableModule
  ],
  exports:[
    FormationInscriptionComponent,
    InfosPersoInscriptionComponent,
    QualificationsInscriptionComponent,
    FiliereFormationInscriptionComponent,
    FormAdminssionFinalComponent
  ]
})
export class SharedModule { }
