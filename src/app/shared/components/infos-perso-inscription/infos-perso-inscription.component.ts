import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { pays as paysList, ville as villeList } from '../../utils/location.const';

@Component({
  selector: 'app-infos-perso-inscription',
  templateUrl: './infos-perso-inscription.component.html',
  styleUrls: ['./infos-perso-inscription.component.scss']
})
export class InfosPersoInscriptionComponent implements OnInit {
  paysList=paysList
  villeList=villeList
  @Input() form:FormGroup;
  waitSubmittedForm=false;
  submitedForm=false;
  constructor(
    private formBuilder:FormBuilder,
    private router:Router
  ) { }

  ngOnInit(): void {
  }
  submitForm()
  {

  }
}
