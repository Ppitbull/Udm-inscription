import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dossier',
  templateUrl: './dossier.component.html',
  styleUrls: ['./dossier.component.scss']
})
export class DossierComponent implements OnInit {
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

  constructor() { }

  ngOnInit(): void {
  }

}
