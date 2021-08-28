import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './shared/services/guard';
import { AdminerGuard } from './shared/services/guard/adminer.guard';
import { EventService } from './shared/utils/services/events/event.service';
import { LocalStorageService } from './shared/services/localstorage/localstorage.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,

  ],
  providers: [
    AuthGuard,
    AdminerGuard,
    EventService,
    LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
