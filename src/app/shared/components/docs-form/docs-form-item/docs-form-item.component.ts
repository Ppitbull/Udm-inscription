import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomFile } from 'src/app/shared/entities/custom-file';

@Component({
  selector: 'app-docs-form-item',
  templateUrl: './docs-form-item.component.html',
  styleUrls: ['./docs-form-item.component.scss']
})
export class DocsFormItemComponent implements OnInit,OnDestroy {
  @Input() dataForm:{
    id:string,
    label:string,
    type:string,
    required:boolean,
    errorMessage:string,
    form:FormGroup
  }={
    id:"text",label:"",type:"",required:true,errorMessage:"Champ requis",
    form:new FormGroup({})
  }
  @Input() submitedForm:boolean=false;
  @Input() formControl:FormControl;
  files:CustomFile[]=[];
  constructor() { }
  

  ngOnInit(): void {
    this.formControl=new FormControl('',[this.dataForm.required?Validators.required:Validators.nullValidator])
    this.dataForm.form.addControl(this.dataForm.id,this.formControl);
  }
  fileUpload(e)
  {
    this.files=[];
    for (let file of e.target.files) {
      let fileReader: FileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.addEventListener('load', (e) => {
        let doc: CustomFile = new CustomFile();
        doc.name = file.name;
        doc.lastModified = file.lastModified;
        doc.size = file.size;
        doc.type = file.type;
        doc.data = fileReader.result;
        // console.log("File ",doc)
        this.files.push(doc);
      });
    }
  }
  getData():{label:string,files:CustomFile[]}
  {
    return {
      label:this.dataForm.label,
      files:this.files
    }
  }

  ngOnDestroy(): void {
    this.dataForm.form.removeControl(this.dataForm.id)
  }

}
