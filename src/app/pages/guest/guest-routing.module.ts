import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuestLayoutComponent } from 'src/app/layout/guest/guest-layout/guest-layout.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { InscriptionPageComponent } from './inscription-page/inscription-page.component';



const routes: Routes = [
  {
    path: '',
    component: GuestLayoutComponent,
    children: [
      { path: '', component: InscriptionPageComponent, pathMatch: 'full'},
      { path: 'acceuil', component: AcceuilComponent, pathMatch: 'full'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestRoutingModule { }
