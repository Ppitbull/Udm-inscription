import { Component, Input, OnInit } from '@angular/core';
import { Etudiant } from '../../entities/accounts/etudiant';
import { DossierCandidature } from '../../entities/application-file';

@Component({
  selector: 'app-modal-candidature',
  templateUrl: './modal-candidature.component.html',
  styleUrls: ['./modal-candidature.component.scss']
})
export class ModalCandidatureComponent implements OnInit {

  @Input() candidat:Etudiant=new Etudiant();
  @Input() candidature:DossierCandidature=new DossierCandidature();
  constructor() { }

  ngOnInit(): void {
  }

}
