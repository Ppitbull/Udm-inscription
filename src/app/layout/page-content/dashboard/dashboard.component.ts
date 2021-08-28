import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isAdmin: boolean = false;

  ////// User
  etat: string = 'attente'; // Cette variable recois l'etat du dossier venant du service.
  comment: string = 'Aucune'; // Cette variable le commantaire (motif de l'erreur dans le dossier) venant du service service.

  attente: boolean = false;
  invalid: boolean = false;
  correct: boolean = false;
  recal: boolean = false;
  admis: boolean = false;

  email: string = 'user@gmail.com';
  pass: string = 'YaN47NS5UHJAN';

  ////// Admin
  allAttente: number = 0;
  allInvalid: number = 0;
  allCorrect: number = 0;
  allRecal: number = 0;
  allAdmis: number = 0;


  constructor(private authService: AuthService) {
    this.isAdmin = authService.isAdmin;
    this.getEtat();
  }

  ngOnInit(): void {
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
}
