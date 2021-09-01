import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BLayoutComponent } from './layout/back-office/b-layout/b-layout.component';
import { FileUploadComponent } from './shared/components/file-upload/file-upload.component';
import { AuthGuard } from './shared/services/guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/guest/guest.module').then(m => m.GuestModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./pages/back-office/back-office.module').then(m => m.BackOfficeModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'file',
    component: FileUploadComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
