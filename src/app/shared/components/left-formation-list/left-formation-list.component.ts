import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EtudiantCandidatureService } from '../../services/etudiant-candidature/etudiant-candidature.service';
import { listFiliere } from '../../utils/constante/formation.const';
import { DossierCandidatureState } from '../../utils/enum/dossier-candidature.enum';
import { formations } from '../../utils/formation.const';

@Component({
  selector: 'app-left-formation-list',
  templateUrl: './left-formation-list.component.html',
  styleUrls: ['./left-formation-list.component.scss']
})
export class LeftFormationListComponent implements OnInit {
  @Output() selectedFiliere:EventEmitter<{etab:string,faculte:string,filiere:string}>=new EventEmitter();
  @Input() type:DossierCandidatureState=DossierCandidatureState.WAITING;
  constructor(
    private host:ElementRef,
    private candidatureService:EtudiantCandidatureService
  ) { }
  mapListFormation=listFiliere

  ngOnInit(): void {
  }
  clickForFiliere(e,etab,faculte,filiere)
  {
    this.host.nativeElement.querySelectorAll('a.active').forEach(element => {
      element.classList.remove('active')
    });
    e.currentTarget.classList.add('active')
    this.selectedFiliere.emit({
      etab,
      filiere:filiere.filiere,
      faculte
    })
  }
  getNumberOfCandidatureByStateByFaculte(faculte)
  {
    return this.candidatureService.getCandidaturesListByTypeByFaculte(this.type,faculte).length;
  }
  getNumberOfCandidatureByStateByFiliere(faculte,filiere)
  {
    console.log(faculte,filiere)
    return this.candidatureService.getCandidaturesListByTypeByFiliere(this.type,faculte,filiere).length;
  }

}
