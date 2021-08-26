import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from 'src/app/layout/layout.module';
import { BrowserModule } from '@angular/platform-browser';
import { BackOfficeRoutingModule } from './Back-office-routing.module';
import {MatStepperModule} from '@angular/material/stepper'
import {MatFormFieldModule} from '@angular/material/form-field';
import { SharedModule } from 'src/app/shared/shared-module.module';
import { BFooterComponent } from 'src/app/layout/back-office/b-footer/b-footer.component';
import { BLayoutComponent } from 'src/app/layout/back-office/b-layout/b-layout.component';
import { BNavbarComponent } from 'src/app/layout/back-office/b-navbar/b-navbar.component';
import { BSidebarComponent } from 'src/app/layout/back-office/b-sidebar/b-sidebar.component';
import { DashboardComponent } from 'src/app/layout/page-content/dashboard/dashboard.component';
import { ProfilComponent } from 'src/app/layout/page-content/profil/profil.component';

@NgModule({
  declarations: [
    BFooterComponent,
    BLayoutComponent,
    BNavbarComponent,
    BSidebarComponent,
    DashboardComponent,
    ProfilComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BackOfficeRoutingModule,
    LayoutModule,
    MatStepperModule,
    MatFormFieldModule,
    SharedModule
  ]
})
export class BackOfficeModule { }
