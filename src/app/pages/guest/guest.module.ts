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
import { AcceuilComponent } from './acceuil/acceuil.component';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [  
    InscriptionPageComponent, 
    AcceuilComponent,
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
    MatCardModule
  ]
})
export class GuestModule { }
