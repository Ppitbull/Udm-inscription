import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {  MatStep, MatStepper } from '@angular/material/stepper';
import { FiliereFormationInscriptionComponent } from 'src/app/shared/components/filiere-formation-inscription/filiere-formation-inscription.component';
import { InfosPersoInscriptionComponent } from 'src/app/shared/components/infos-perso-inscription/infos-perso-inscription.component';
import { QualificationsInscriptionComponent } from 'src/app/shared/components/qualifications-inscription/qualifications-inscription.component';

@Component({
  selector: 'app-inscription-page',
  templateUrl: './inscription-page.component.html',
  styleUrls: ['./inscription-page.component.scss']
})
export class InscriptionPageComponent implements OnInit,AfterViewInit {
  personnalDataFormGroup: FormGroup;
  qualificationFormGroup: FormGroup;
  filiereFormationFormGroup:FormGroup;
  finalFormGroup:FormGroup;

  @ViewChild("stepper") stepper:MatStepper;
  @ViewChild("informationPersonnelInscriptionComponent") informationPersonnelInscriptionComponent:InfosPersoInscriptionComponent;
  @ViewChild("qualificationInscriptionComponent") qualificationInscriptionComponent:QualificationsInscriptionComponent;
  @ViewChild("filiereFormationComponent") filiereFormationComponent:FiliereFormationInscriptionComponent;
  constructor(private _formBuilder: FormBuilder) {}
  

  ngOnInit() {
    this.personnalDataFormGroup = this._formBuilder.group({
      nom:new FormControl("",[Validators.required,Validators.minLength(2)]),
      prenom:new FormControl("",[Validators.required,Validators.minLength(6)]),
      dateNaiss:new FormControl("",[Validators.required]),
      lieuxNaissance:new FormControl("",[Validators.required,Validators.minLength(2)]),
      nationalite:new FormControl("",[Validators.required,Validators.minLength(2)]),
      villeresidence:new FormControl("",[Validators.required]),
      email: new FormControl("",[Validators.required,Validators.pattern('^[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z0-9]{2,6}')]),
      tel: new FormControl("",[Validators.required, Validators.minLength(5)]),
      nomContat:new FormControl("",[Validators.required,Validators.minLength(6)]),
      emailContact: new FormControl("",[Validators.required,Validators.pattern('^[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z0-9]{2,6}')]),
      telContact: new FormControl("",[Validators.required, Validators.minLength(5)]),
    });

    this.qualificationFormGroup = this._formBuilder.group({
      anneBac: ['', Validators.required],
      serieBac:["",Validators.required],
      mentionBac:["",Validators.required],
      anneDut: [''],
      serieDut:[""],
      mentionDut:[""],
      anneLic: [''],
      serieLic:[""],
      mentionLic:[""],
      anneAutre: [''],
      serieAutre:[""],
      mentionAutre:[""]
    });
    this.finalFormGroup=this._formBuilder.group({
      
    })

    this.filiereFormationFormGroup= this._formBuilder.group({
      cycle:['',Validators.required],
      premierFaculte:['',Validators.required],
      premierFilere:['',Validators.required],
      premierNiveau:['',Validators.required]
    })
  }

  ngAfterViewInit(): void {
    // this.stepInfosPersonnel.
  }
  submit()
  {
    console.log(this.personnalDataFormGroup.value);
    console.log(this.qualificationInscriptionComponent.getData())
    console.log(this.filiereFormationComponent.getData())
  }
  changeSteppe(event)
  {
    console.log(event);
  }
  validChangeSteppe(index)
  {
    if(index==0) this.informationPersonnelInscriptionComponent.submitedForm=true;
    if(index==1) this.qualificationInscriptionComponent.submitedForm=true;
    if(index==2) this.filiereFormationComponent.submitedForm=true;
  }
}
