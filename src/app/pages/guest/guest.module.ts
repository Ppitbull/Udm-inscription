import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from 'src/app/layout/layout.module';
import { BrowserModule } from '@angular/platform-browser';
import { InscriptionPageComponent } from './inscription-page/inscription-page.component';
import { GuestRoutingModule } from './guest-routing.module';
import {MatStepperModule} from '@angular/material/stepper'
import {MatFormFieldModule} from '@angular/material/form-field';
import { SharedModule } from 'src/app/shared/shared-module.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { LoginComponent } from './login/login.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [  
    InscriptionPageComponent, 
    AcceuilComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GuestRoutingModule,
    LayoutModule,
    MatStepperModule,
    MatFormFieldModule,
    SharedModule,
    MatProgressBarModule,
    ModalModule.forRoot()
  ]
})
export class GuestModule { }
