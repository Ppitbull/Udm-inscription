import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-dossier',
  templateUrl: './dossier.component.html',
  styleUrls: ['./dossier.component.scss']
})
export class DossierComponent implements OnInit {

  id: string = 'JDN565dIAS';
  nom: string = 'Nom';
  prenom: string = 'Utilisateur';
  nomComplet: string = this.nom + ' ' + this.prenom;
  dateN: Date;
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
  niveau1: number;
  niveau2: number;
  niveau3: number;

  etat: string = 'invalid';
  comment: string = 'Aucune';
  midle: boolean = false;

  attente: boolean = false;
  invalid: boolean = false;
  correct: boolean = false;
  recal: boolean = false;
  admis: boolean = false;

  constructor() {
    this.getEtat();
  }

  ngOnInit(): void {
  }

  midleChange(){
    this.midle = true
  }

  getEtat() {
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
  }

  ///// Fonction pour acepter le dossier (dossier correct) = met état du dossier à correct
  // tslint:disable-next-line:typedef
  valid(){
    this.midle = false;
    //...
  }

  ///// Fonction pour marque le candidat comme réussi () met état du dossier à admis
  // tslint:disable-next-line:typedef
  win(){
  }

  ///// Fonction pour marque le candidat comme échoué () met état du dossier à recal
  // tslint:disable-next-line:typedef
  lost(){
  }
}
