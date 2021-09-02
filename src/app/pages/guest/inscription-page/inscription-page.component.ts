import { AfterViewInit, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {  MatStep, MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { takeLast } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FiliereFormationInscriptionComponent } from 'src/app/shared/components/filiere-formation-inscription/filiere-formation-inscription.component';
import { FormAdminssionFinalComponent } from 'src/app/shared/components/form-adminssion-final/form-adminssion-final.component';
import { InfosPersoInscriptionComponent } from 'src/app/shared/components/infos-perso-inscription/infos-perso-inscription.component';
import { SimpleLoaderComponent } from 'src/app/shared/components/loader/simple-loader/simple-loader.component';
import { QualificationsInscriptionComponent } from 'src/app/shared/components/qualifications-inscription/qualifications-inscription.component';
import { Etudiant } from 'src/app/shared/entities/accounts/etudiant';
import { DossierCandidature } from 'src/app/shared/entities/application-file';
import { CustomFile } from 'src/app/shared/entities/custom-file';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { EtudiantCandidatureService } from 'src/app/shared/services/etudiant-candidature/etudiant-candidature.service';
import { InscriptionEtudiantService } from 'src/app/shared/services/inscription-etudiant/inscription-etudiant.service';
import { UserProfilService } from 'src/app/shared/services/user-profil/user-profil.service';
import { ActionStatus } from 'src/app/shared/utils/services/firebase';

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
  upload_step:boolean=false;
  upload_value=0;

  @ViewChild("stepper") stepper:MatStepper;
  @ViewChild("informationPersonnelInscriptionComponent") informationPersonnelInscriptionComponent:InfosPersoInscriptionComponent;
  @ViewChild("qualificationInscriptionComponent") qualificationInscriptionComponent:QualificationsInscriptionComponent;
  @ViewChild("filiereFormationComponent") filiereFormationComponent:FiliereFormationInscriptionComponent;
  @ViewChild("formadmissionfinal") formadmissionfinalComponent:FormAdminssionFinalComponent;
  @ViewChild("modalTemplate") modalTemplateRef: TemplateRef<any>;
  modalRef:BsModalRef;
  dialogRef:BsModalRef;
  
  constructor(
    private _formBuilder: FormBuilder,
    private inscriptionEtudiantService:InscriptionEtudiantService,
    private dialog:BsModalService,
    private router:Router,
    private cd:ChangeDetectorRef,
    private userProfile:UserProfilService,
    private candidatureDossierService:EtudiantCandidatureService,
    private authService:AuthService
    ) {}
  

  ngOnInit() {
    this.personnalDataFormGroup = this._formBuilder.group({
      nom:new FormControl("",[Validators.required,Validators.minLength(2)]),
      prenom:new FormControl("",[Validators.required,Validators.minLength(2)]),
      dateNaiss:new FormControl("",[Validators.required]),
      lieuxNaiss:new FormControl("",[Validators.required,Validators.minLength(2)]),
      nationalite:new FormControl("",[Validators.required,Validators.minLength(2)]),
      villeresidence:new FormControl("",[Validators.required]),
      email: new FormControl("",[Validators.required,Validators.pattern('^[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z0-9]{2,6}')]),
      tel: new FormControl("",[Validators.required, Validators.minLength(5)]),
      nomContact:new FormControl("",[Validators.required,Validators.minLength(6)]),
      emailContact: new FormControl("",[Validators.required,Validators.pattern('^[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z0-9]{2,6}')]),
      telContact: new FormControl("",[Validators.required, Validators.minLength(5)]),
      imgProfil:new FormControl("",[Validators.required]),
      sexe:new FormControl('',[Validators.required])
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
      acceptVerificationDossier:[false,Validators.required],
      accceptPriceInscription:[false,Validators.required]
    })

    this.filiereFormationFormGroup= this._formBuilder.group({
      cycle:['',Validators.required],
      premierFaculte:['',Validators.required],
      premierFilere:['',Validators.required],
      premierNiveau:['',Validators.required]
    })
    this.finalFormGroup.controls.acceptVerificationDossier.valueChanges.subscribe((change)=>{
      this.submitedForm=true;
      setTimeout(()=>{
        if(change && this.finalFormGroup.value.accceptPriceInscription && this.finalFormGroup.valid)this.canSubmitedForm=true
        else this.canSubmitedForm=false;
      })      
    })
    this.finalFormGroup.controls.accceptPriceInscription.valueChanges.subscribe((change)=>{
      setTimeout(()=>{
        if(change && this.finalFormGroup.value.acceptVerificationDossier && this.finalFormGroup.valid) this.canSubmitedForm=true;
        else this.canSubmitedForm=false;
      })
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
    

    this.getAllData();
    let mapFile:Map<string,CustomFile[]>=new Map<string,CustomFile[]>();
    this.openModal()
    this.inscriptionEtudiantService.createEtudiantAccount(this.candidat)
    .then((result:ActionStatus)=> this.authService.authLogin(this.candidat.email.toString(),this.candidat.mdp.toString()))
    .then((result:ActionStatus)=>this.inscriptionEtudiantService.uploadFile("photo_url",[this.informationPersonnelInscriptionComponent.selectedImage]))
    .then((result:ActionStatus)=>{
      this.candidat.photoUrl=result.result[0].link || "";
      return this.inscriptionEtudiantService.saveEtudiantAccount(this.candidat)
    })
    .then((result:ActionStatus)=>{
      this.upload_step=true;
      this.popup_message="Enregistrement des fichiers de candidatures..."      
      let subjects=this.dossier.documents.listDocument.map((doc)=>{
        mapFile.set(doc.label.toString(),doc.files);
        return this.inscriptionEtudiantService.uploadFileWithProgression(`candidature/${this.candidat.id}`,doc.files)
      })
      subjects.forEach((subject=>{
        subject.subscribe({
          next:(value)=>{
            if(value.apiCode==ActionStatus.UPLOAD_RUNNING)
            {
              this.popup_message=`Enregistrement des fichiers de candidatures (${value.result.file}:${value.result.percent}%)`
              this.upload_value=value.result.percent || 0
            }
            if(value.apiCode==ActionStatus.SUCCESS)
            {
              subject.pipe(takeLast(1)).subscribe((value)=>{
                let found=false;
                for(let key of Array.from(mapFile.keys()))
                {
                  for(let file of mapFile.get(key))
                  {
                    if(file.name==value.result.file)
                    {
                      found=true;
                      file.link=value.result.url;
                      break;
                    }
                  }
                  if(found) break;
                }
              })
            }
          }
        })
      }))
      return Promise.all(subjects.map((subject)=>subject.toPromise()))
    })
    .then((result:ActionStatus[])=>{
      this.upload_step=false;
      this.popup_message="Creation du dossier de candidature..."
      for(let i=0; i<this.dossier.documents.listDocument.length; i++)
      {
        if(mapFile.has(this.dossier.documents.listDocument[i].label.toString())) this.dossier.documents.listDocument[i].files=mapFile.get(this.dossier.documents.listDocument[i].label.toString())
      }
      this.dossier.etudiantID.setId(this.candidat.id.toString())

      return this.inscriptionEtudiantService.saveEtudiantCandidature(this.dossier)
    })    
    .then((result:ActionStatus)=>{
      this.popup_message="Opération réussite. Rédirection vers l'espace étudiant...";
      this.userProfile.setUser(this.candidat);
      let map=new Map();
      map.set(this.dossier.etudiantID.toString(),this.dossier);
      this.candidatureDossierService.setCandidature(map)
      // setTimeout(()=>window.location.href="/user/dahboard",200)
      setTimeout(()=>{
        this.hideModal();
        this.router.navigate(["/user/dashboard"])
      },200)
    }).catch((error)=>{
      this.popup_message=error.message;
      setTimeout(()=>this.hideModal(),2000)
      console.log(error)
    })
    
  }
  openModal() {
    this.dialogRef = this.dialog.show(this.modalTemplateRef,{
      backdrop: true,
      ignoreBackdropClick: true
    });
    this.popup_message="Creation du compte Etudiant....";
  }
  hideModal(){
    // this.dialog.hide()
    this.dialogRef.hide()
  }
  changeSteppe(event)
  {
  }
  validChangeSteppe(index)
  {    
    if(index==0) setTimeout(()=>this.informationPersonnelInscriptionComponent.submitedForm=true,0)
    else if(index==1) setTimeout(()=>this.qualificationInscriptionComponent.submitedForm=true,0)
    else if(index==2) setTimeout(()=>this.filiereFormationComponent.submitedForm=true,0)
    setTimeout(()=>this.getAllData());
  }

  getAllData()
  {
    this.dossier=new DossierCandidature();
    this.candidat=new Etudiant();

    this.candidat.hydrate(
      {
        ...this.personnalDataFormGroup.value,
        tel:this.personnalDataFormGroup.value.tel.internationalNumber?this.personnalDataFormGroup.value.tel.internationalNumber:"",
        telContact:this.personnalDataFormGroup.value.telContact.internationalNumber?this.personnalDataFormGroup.value.telContact.internationalNumber:"",
        villeResidenceActuelle:this.personnalDataFormGroup.value.villeresidence,
        dateCreation:new Date().toISOString(),
        mdp:`${this.dossier.numeroDossier}`
      }
    );
  
    this.dossier.qualifications.bac=this.qualificationInscriptionComponent.getData()[0];
    this.dossier.qualifications.bts=this.qualificationInscriptionComponent.getData()[1];
    this.dossier.qualifications.license=this.qualificationInscriptionComponent.getData()[2];
    this.dossier.qualifications.autre=this.qualificationInscriptionComponent.getData()[3];
  
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

    this.dossier.documents.listDocument=this.formadmissionfinalComponent.getData();
    this.cd.detectChanges();
  }
}
