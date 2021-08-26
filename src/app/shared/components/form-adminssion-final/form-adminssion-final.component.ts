import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-adminssion-final',
  templateUrl: './form-adminssion-final.component.html',
  styleUrls: ['./form-adminssion-final.component.scss']
})
export class FormAdminssionFinalComponent implements OnInit {
  @Input() form:FormGroup;
  @Input() nom:string="Cedric"
  @Input() prenom:string="Nguendap"
  submitedForm:boolean=false;
  constructor() { }

  ngOnInit(): void {
  }

}
