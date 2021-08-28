import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsFormItemComponent } from './docs-form-item/docs-form-item.component';
import { DocsFormsComponent } from './docs-forms/docs-forms.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider'


@NgModule({
  declarations: [
    DocsFormItemComponent,
    DocsFormsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule
  ],
  exports:[
    DocsFormsComponent,
    MatDividerModule
  ]
})
export class DocsFormModule { }
