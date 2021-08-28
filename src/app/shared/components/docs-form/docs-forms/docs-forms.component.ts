import { Component, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomFile } from 'src/app/shared/entities/custom-file';
import { DocsFormItemComponent } from '../docs-form-item/docs-form-item.component';

@Component({
  selector: 'app-docs-forms',
  templateUrl: './docs-forms.component.html',
  styleUrls: ['./docs-forms.component.scss']
})
export class DocsFormsComponent implements OnInit {
  @Input() formValue:{
    id:string,
    label:string,
    type:string,
    required:boolean,
    errorMessage:string,
    col:string,
    form:FormGroup
  }[][]=[];
  @Input() submitedForm:boolean=false;

  @ViewChildren(DocsFormItemComponent) inputFilesComponent: QueryList<DocsFormItemComponent>;
  constructor() { }

  ngOnInit(): void {
  }

  getDocumentsList(): {label:string,files:CustomFile[]}[] {
    let documentList:{label:string,files:CustomFile[]}[]=[];
    this.inputFilesComponent.forEach((inputFiles:DocsFormItemComponent)=>{
      documentList.push(inputFiles.getData())
    })
    return documentList;
  }

}
