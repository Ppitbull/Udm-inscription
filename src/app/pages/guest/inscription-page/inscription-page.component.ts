import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {  MatStep, MatStepper } from '@angular/material/stepper';
import { FiliereFormationInscriptionComponent } from 'src/app/shared/components/filiere-formation-inscription/filiere-formation-inscription.component';
import { FormAdminssionFinalComponent } from 'src/app/shared/components/form-adminssion-final/form-adminssion-final.component';
import { InfosPersoInscriptionComponent } from 'src/app/shared/components/infos-perso-inscription/infos-perso-inscription.component';
import { QualificationsInscriptionComponent } from 'src/app/shared/components/qualifications-inscription/qualifications-inscription.component';
import { Etudiant } from 'src/app/shared/entities/accounts/etudiant';
import { DossierCandidature } from 'src/app/shared/entities/application-file';
import { CustomFile } from 'src/app/shared/entities/custom-file';

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
  candidat:Etudiant=new Etudiant();
  dossier:DossierCandidature=new DossierCandidature();
  submitedForm:boolean=false;
  canSubmitedForm:boolean=false;
  popup_message:string="";

  @ViewChild("stepper") stepper:MatStepper;
  @ViewChild("informationPersonnelInscriptionComponent") informationPersonnelInscriptionComponent:InfosPersoInscriptionComponent;
  @ViewChild("qualificationInscriptionComponent") qualificationInscriptionComponent:QualificationsInscriptionComponent;
  @ViewChild("filiereFormationComponent") filiereFormationComponent:FiliereFormationInscriptionComponent;
  @ViewChild("formadmissionfinal") formadmissionfinalComponent:FormAdminssionFinalComponent;
  @ViewChild("modalTemplate") modalRef: TemplateRef<any>;
  
  constructor(private _formBuilder: FormBuilder
    // private dialog:BsModalService,
    ) {}
  

  ngOnInit() {
    this.personnalDataFormGroup = this._formBuilder.group({
      nom:new FormControl("",[Validators.required,Validators.minLength(2)]),
      prenom:new FormControl("",[Validators.required,Validators.minLength(6)]),
      dateNaiss:new FormControl("",[Validators.required]),
      lieuxNaiss:new FormControl("",[Validators.required,Validators.minLength(2)]),
      nationalite:new FormControl("",[Validators.required,Validators.minLength(2)]),
      villeresidence:new FormControl("",[Validators.required]),
      email: new FormControl("",[Validators.required,Validators.pattern('^[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z0-9]{2,6}')]),
      tel: new FormControl("",[Validators.required, Validators.minLength(5)]),
      nomContact:new FormControl("",[Validators.required,Validators.minLength(6)]),
      emailContact: new FormControl("",[Validators.required,Validators.pattern('^[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z0-9]{2,6}')]),
      telContact: new FormControl("",[Validators.required, Validators.minLength(5)]),
      imgProfil:new FormControl("",[Validators.required])
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
      acceptVerificationDossier:["",Validators.required],
      accceptPriceInscription:["",Validators.required]
    })

    this.filiereFormationFormGroup= this._formBuilder.group({
      cycle:['',Validators.required],
      premierFaculte:['',Validators.required],
      premierFilere:['',Validators.required],
      premierNiveau:['',Validators.required]
    })
    this.finalFormGroup.controls.acceptVerificationDossier.valueChanges.subscribe((change)=>{
      if(change && this.finalFormGroup.value.accceptPriceInscription) this.canSubmitedForm=true;
      else this.canSubmitedForm=false;
    })
    this.finalFormGroup.controls.accceptPriceInscription.valueChanges.subscribe((change)=>{
      if(change && this.finalFormGroup.value.acceptVerificationDossier) this.canSubmitedForm=true;
      else this.canSubmitedForm=false;
    })
  }

  ngAfterViewInit(): void {
    // this.stepInfosPersonnel.
  }
  submit()
  {
    this.submitedForm=true;
    let docs:{label:string,file:CustomFile}[]=[];
    this.formadmissionfinalComponent.getData().forEach((doc)=>doc.files.forEach(file =>  docs.push({
      label:doc.label,
      file
    })));

    this.dossier.documents.listDocument=this.formadmissionfinalComponent.getData();
  }
  changeSteppe(event)
  {
  }
  validChangeSteppe(index)
  {
    this.candidat=new Etudiant();
    this.dossier=new DossierCandidature();
    if(index==0)
    {
      this.informationPersonnelInscriptionComponent.submitedForm=true;
      this.candidat.hydrate(
        {
          ...this.personnalDataFormGroup.value,
          tel:this.personnalDataFormGroup.value.tel.internationalNumber?this.personnalDataFormGroup.value.tel.internationalNumber:"",
          telContact:this.personnalDataFormGroup.value.telContact.internationalNumber?this.personnalDataFormGroup.value.telContact.internationalNumber:"",
          villeResidenceActuelle:this.personnalDataFormGroup.value.villeresidence,
          dateCreation:new Date().toISOString()
        }
      );
      // console.log(this.candidat)
    }
    if(index==1) 
    {
      this.qualificationInscriptionComponent.submitedForm=true;
      this.dossier.qualifications.bac=this.qualificationInscriptionComponent.getData()[0];
      this.dossier.qualifications.bts=this.qualificationInscriptionComponent.getData()[1];
      this.dossier.qualifications.license=this.qualificationInscriptionComponent.getData()[2];
      this.dossier.qualifications.autre=this.qualificationInscriptionComponent.getData()[3];
    }
    if(index==2) 
    {
      this.filiereFormationComponent.submitedForm=true;
      this.dossier.formations.premierChoix={
        cycle:this.filiereFormationComponent.getData()[0].cycle.cycle,
        filiere:this.filiereFormationComponent.getData()[0].filiere,
        faculte:this.filiereFormationComponent.getData()[0].faculte.ab,
        niveau:this.filiereFormationComponent.getData()[0].niveau
      }

      this.dossier.formations.secondChoix={
        cycle:this.filiereFormationComponent.getData()[1].cycle.cycle,
        filiere:this.filiereFormationComponent.getData()[1].filiere,
        faculte:this.filiereFormationComponent.getData()[1].faculte.ab,
        niveau:this.filiereFormationComponent.getData()[1].niveau
      }

      this.dossier.formations.troisiemeChoix={
        cycle:this.filiereFormationComponent.getData()[2].cycle.cycle,
        filiere:this.filiereFormationComponent.getData()[2].filiere,
        faculte:this.filiereFormationComponent.getData()[2].faculte.ab,
        niveau:this.filiereFormationComponent.getData()[2].niveau
      }
    }
  }
}
