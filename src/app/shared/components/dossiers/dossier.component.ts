import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Etudiant } from '../../entities/accounts/etudiant';
import { DossierCandidature } from '../../entities/application-file';
import { CommentNotification } from '../../entities/notification/commentaire';
import { CommentairesService } from '../../services/commentaires/commentaires.service';
import { EtudiantCandidatureService } from '../../services/etudiant-candidature/etudiant-candidature.service';
import { UserProfilService } from '../../services/user-profil/user-profil.service';
import { DossierCandidatureState } from '../../utils/enum/dossier-candidature.enum';
import { ActionStatus } from '../../utils/services/firebase';

@Component({
  selector: 'app-dossier',
  templateUrl: './dossier.component.html',
  styleUrls: ['./dossier.component.scss']
})
export class DossierComponent implements OnInit,OnChanges {

  @Input() candidat:Etudiant=new Etudiant();
  @Input() candidature:DossierCandidature=new DossierCandidature()
  @Input() modalRef;
  @Output() endRequest:EventEmitter<any>=new EventEmitter();
  formControlMessage:FormControl=new FormControl('',[Validators.required]);
  waitResponse:boolean=false
  id: string = 'JDN565dIAS';
  nom: string = 'Nom';
  prenom: string = 'Utilisateur';
  nomComplet: string = this.nom + ' ' + this.prenom;
  dateN: string;
  nationnalite: string = '...';
  email: string = '...';
  lieuN: string = '...';
  villeR: string = '...';
  numTel: string = '...';
  nomAutre: string = '...';
  emailAutre: string = '...';
  tel1Autre: string = '...';
  tel2Autre: string = '...';
  diplome: string = '...';
  serie: string = '...';
  mention: string = '...';
  annee: number;
  faculte1: string = '...';
  faculte2: string = '...';
  faculte3: string = '...';
  filiere1: string = '...';
  filiere2: string = '...';
  filiere3: string = '...';
  cycle1: string = '...';
  cycle2: string = '...';
  cycle3: string = '...';
  niveau1: string="";
  niveau2: string="";
  niveau3: string="";

  etat: string = 'attente';
  comment: string = 'Aucune';
  midle: boolean = false;

  attente: boolean = false;
  invalid: boolean = false;
  correct: boolean = false;
  recal: boolean = false;
  admis: boolean = false;
  imgUrl:String=""
  constructor(
    private candidatureService:EtudiantCandidatureService,
    private commentaireService:CommentairesService,
    private userProfilService:UserProfilService,
    private router:Router
  ) {
    this.getEtat();
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    if(changes.candidat && changes.candidature) this.switchData();
  }

  switchData()
  {
    this.id = this.candidature.numeroDossier.toString();
    this.nom =this.candidat.nom.toString();
    this.prenom = this.candidat.prenom.toString();
    this.nomComplet= this.candidat.getFullName();
    this.dateN=this.candidat.dateNaiss.toString();
    this.nationnalite = this.candidat.nationalite.toString();
    this.email = this.candidat.email.toString()
    this.lieuN = this.candidat.lieuxNaiss.toString()
    this.villeR = this.candidat.villeResidenceActuelle.toString()
    this.numTel = this.candidat.tel.toString()
    this.nomAutre = this.candidat.nomContact;
    this.emailAutre = this.candidat.emailContact;
    this.tel1Autre = this.candidat.telContact
    // diplome: string = '...';
    // serie: string = '...';
    // mention: string = '...';
    // annee: number;
    this.faculte1 = this.candidature.formations.premierChoix.faculte
    this.faculte2 = this.candidature.formations.secondChoix.faculte;
    this.faculte3 = this.candidature.formations.troisiemeChoix.faculte;
    this.filiere1 = this.candidature.formations.premierChoix.filiere;
    this.filiere2 = this.candidature.formations.secondChoix.filiere;
    this.filiere3 = this.candidature.formations.troisiemeChoix.filiere;

    this.cycle1 = this.candidature.formations.premierChoix.cycle;
    this.cycle2 = this.candidature.formations.secondChoix.cycle;
    this.cycle3 = this.candidature.formations.troisiemeChoix.cycle;
    this.niveau1 = this.candidature.formations.premierChoix.niveau;
    this.niveau2=this.candidature.formations.secondChoix.niveau;
    this.niveau3=this.candidature.formations.troisiemeChoix.niveau;
    this.imgUrl=this.candidat.photoUrl==""?"../../../../assets/img/no-user-image.png":this.candidat.photoUrl
    this.getEtat();
  }

  ngOnInit(): void {
  }

  midleChange(){
    this.midle = true
  }

  getEtat() {

    switch(this.candidature.state)
    {
      case DossierCandidatureState.ACCEPTED:
        this.etat="correct";
        break;
      case DossierCandidatureState.ADMITTED:
        this.etat="admis";
        break;
      case DossierCandidatureState.FAILD:
        this.etat="recal";
        break;
      case DossierCandidatureState.INVALID:
        this.etat="invalid";
        break;
      case DossierCandidatureState.WAITING:
        this.etat="attente";
        break
    }

    if (this.etat == 'attente'){
      this.attente = true;
      this.invalid = false;
      this.recal = false;
      this.correct = false;
      this.admis = false;
    }
    else if (this.etat == 'invalid') {
      this.attente = false;
      this.invalid = true;
      this.recal = false;
      this.correct = false;
      this.admis = false;
    }
    else if (this.etat == 'recal') {
      this.attente = false;
      this.invalid = false;
      this.recal = true;
      this.correct = false;
      this.admis = false;
    }
    else if (this.etat == 'admis') {
      this.attente = false;
      this.invalid = false;
      this.recal = false;
      this.correct = false;
      this.admis = true;
    }
    else if (this.etat == 'correct') {
      this.attente = false;
      this.invalid = false;
      this.recal = false;
      this.correct = true;
      this.admis = false;
    }
  }

  ///// Fonction pour marquer le dossier en attente lorsque le quandidat renvois à nouveau ses dosier = met état du dossier à attente
  // tslint:disable-next-line:typedef
  wait(){
    this.midle = false;
    //...
  }

  ///// Fonction pour retourner le dossier (dossier invalid) = met état du dossier à invalid
  // tslint:disable-next-line:typedef
  return(){
    if(this.formControlMessage.invalid) return;
    this.midle=false;
    this.waitResponse=true;
    let comment:CommentNotification=new CommentNotification();
    comment.dateSend=(new Date()).toISOString();
    comment.content=this.formControlMessage.value;
    comment.to.setId(this.candidat.id.toString());
    comment.from.setId(this.userProfilService.currentUser.getValue().id.toString());

    Promise.all([
      this.candidatureService.changeCandidatureState(this.candidature.id, this.candidat.id,DossierCandidatureState.INVALID),
      this.commentaireService.addComment(comment,this.candidature.id)
    ])
    .then((result:ActionStatus[])=>{
      this.waitResponse=false;
      this.closeModal()
      //affichage d'un message de success
    })
    .catch((error)=>{
      this.waitResponse=false;
      this.closeModal()
      //affichage d'un message d'erreur
    })
  }

  ///// Fonction pour acepter le dossier (dossier correct) = met état du dossier à correct
  // tslint:disable-next-line:typedef
  valid(){
    this.midle = false;
    this.waitResponse=true;
    this.candidatureService.changeCandidatureState(this.candidature.id, this.candidat.id, DossierCandidatureState.ACCEPTED)
    .then((result:ActionStatus)=>{
      this.waitResponse=false;
      this.closeModal()

      //affichage d'un message de success
    })
    .catch((error)=>{
      this.waitResponse=false;
      this.closeModal()

      //affichage d'un message d'erreur
    })
    //...
  }

  ///// Fonction pour marque le candidat comme réussi () met état du dossier à admis
  // tslint:disable-next-line:typedef
  win(){
    this.waitResponse=true;
    this.candidatureService.changeCandidatureState(this.candidature.id, this.candidat.id,DossierCandidatureState.ADMITTED)
    .then((result:ActionStatus)=>{
      this.waitResponse=false;
      this.closeModal()

      //affichage d'un message de success
    })
    .catch((error:ActionStatus)=>{
      this.waitResponse=false;
      this.closeModal()

      //affichage d'un message d'erreur
    })
  }

  ///// Fonction pour marque le candidat comme échoué () met état du dossier à recal
  // tslint:disable-next-line:typedef
  lost(){
    this.midle = false;
    this.waitResponse=true;
    this.candidatureService.changeCandidatureState(this.candidature.id, this.candidat.id,DossierCandidatureState.FAILD)
    .then((result:ActionStatus)=>{
      this.waitResponse=false;
      this.closeModal()

      //affichage d'un message de success
    })
    .catch((error)=>{
      this.waitResponse=false;
      this.closeModal()

      //affichage d'un message d'erreur
    })
  }
  closeModal()
  {
    // console.log("modal end")
    // this.modalRef.hide();
    this.endRequest.emit(true)
    window.location.reload();
    // this.router.navigateByUrl(this.router.url)
  }
}
