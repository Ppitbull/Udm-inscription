import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './shared/services/guard';
import { AdminerGuard } from './shared/services/guard/adminer.guard';
import { EventService } from './shared/utils/services/events/event.service';
import { LocalStorageService } from './shared/services/localstorage/localstorage.service';
import { FileUploadComponent } from './shared/components/file-upload/file-upload.component';
import { UploadListComponent } from './shared/components/file-upload/upload-list/upload-list.component';
import { UploadFormComponent } from './shared/components/file-upload/upload-form/upload-form.component';
import { HttpClientModule } from '@angular/common/http';
import { UploaderComponent } from './shared/components/file-upload/uploader/uploader.component';
import { UploadTaskComponent } from './shared/components/file-upload/upload-task/upload-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotificationsService } from './shared/services/notification/notification.service';



@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    UploadListComponent,
    UploadFormComponent,
    UploaderComponent,
    UploadTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,

  ],
  providers: [
    AuthGuard,
    AdminerGuard,
    EventService,
    LocalStorageService,
    NotificationsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
