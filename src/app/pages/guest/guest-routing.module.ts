import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuestLayoutComponent } from 'src/app/layout/guest/guest-layout/guest-layout.component';
import { GuestWelcomeComponent } from 'src/app/layout/guest/guest-welcome/guest-welcome.component';
import { InscriptionPageComponent } from './inscription-page/inscription-page.component';



const routes: Routes = [
  {
    path: '',
    component: GuestLayoutComponent,
    children: [
      { path: '', component: GuestWelcomeComponent, pathMatch: 'full'},
      { path: 'inscription', component: InscriptionPageComponent, pathMatch: 'full'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestRoutingModule { }
