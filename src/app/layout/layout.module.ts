import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from "@angular/router";
import { GuestFooterComponent } from './guest/guest-footer/guest-footer.component';
import { GuestLayoutComponent } from './guest/guest-layout/guest-layout.component';
import { GuestTopNavComponent } from './guest/guest-top-nav/guest-top-nav.component';
import { PageContentComponent } from "./page-content/page-content.component";


@NgModule({
    declarations: [
    
    GuestFooterComponent,
         GuestLayoutComponent,
         GuestTopNavComponent,
         PageContentComponent
  ],
    imports: [
      CommonModule,
      RouterModule,
      MatToolbarModule,
      MatIconModule
    ],
    exports:[
       
    ]
  })
  export class LayoutModule { }