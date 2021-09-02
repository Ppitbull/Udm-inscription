import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EtudiantCandidatureService } from 'src/app/shared/services/etudiant-candidature/etudiant-candidature.service';
import { DossierCandidatureState } from 'src/app/shared/utils/enum/dossier-candidature.enum';

@Component({
  selector: 'app-list-candidature',
  templateUrl: './list-candidature.component.html',
  styleUrls: ['./list-candidature.component.scss']
})
export class ListCandidatureComponent implements OnInit {
  title:string=""
  type:DossierCandidatureState;
  labelSelectedFiliere:String="";
  hasSelectedElement:boolean=false;
  dataFiliere=[];

  constructor(
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private candidateDossierService:EtudiantCandidatureService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data)=>{
      this.title=data.title;
      this.type=data.docType;
    })
  } 
  showDataBySelectedFiliere(value)
  {
    this.labelSelectedFiliere=value.filiere;
    this.dataFiliere=this.candidateDossierService.getCandidaturesListByTypeByFiliere(this.type,value.faculte,value.filiere)
    this.hasSelectedElement=true;
  }
}
