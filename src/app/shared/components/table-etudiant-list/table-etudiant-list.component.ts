import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Etudiant } from '../../entities/accounts/etudiant';
import { DossierCandidature } from '../../entities/application-file';
import { EtudiantCandidatureService } from '../../services/etudiant-candidature/etudiant-candidature.service';
import { EtudiantsService } from '../../services/etudiant/etudiants.service';
import { UserService } from '../../services/user/user.service';
import { DossierCandidatureState } from '../../utils/enum/dossier-candidature.enum';
import { ActionStatus } from '../../utils/services/firebase';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalCandidatureComponent } from '../modal-candidature/modal-candidature.component';

@Component({
  selector: 'app-table-etudiant-list',
  templateUrl: './table-etudiant-list.component.html',
  styleUrls: ['./table-etudiant-list.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class TableEtudiantListComponent implements OnInit,OnChanges {

  @Input() textFiliere=""
  @Input() data:DossierCandidature[]=[]; 
  @Output() choiceEventCandidat:EventEmitter<any>=new EventEmitter<any>()
  @ViewChild("largeModal") modalRef
  selectedData:{candidature:DossierCandidature,candidat:Etudiant}={candidature:new DossierCandidature(),candidat:new Etudiant()};

  dataHasLoaded:boolean=false;
  candidatsInfosList:{candidature:DossierCandidature,candidat:Etudiant}[]=[];
  constructor(
    private userService:UserService,
    private modalService:BsModalService
  ) { }  

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes)
    if(changes.data) this.loadData()
  }
  loadData()
  {
    this.candidatsInfosList=[]
    this.dataHasLoaded=this.data.length==0;
    for(let i=0;i<this.data.length; i++)
    {
      let candidature=this.data[i];
      this.userService.getUserById(candidature.etudiantID)
      .then((result:ActionStatus)=>{
        this.candidatsInfosList.push({
          candidature,
          candidat:result.result
        })
        if(i==this.data.length-1) this.dataHasLoaded=true;
      })
    }
  }

  getBackgroundState(state)
  {
    switch(state)
    {
      case DossierCandidatureState.ACCEPTED:
        return "bg-secondary";
      case DossierCandidatureState.WAITING:
        return "bg-info";
      case DossierCandidatureState.INVALID:
        return "bg-warning";
      case DossierCandidatureState.ADMITTED:
        return "bg-success"
      case DossierCandidatureState.FAILD:
        return "bg-danger"
    }
  }
  getSignificantTextOfState(state)
  {
    switch(state)
    {
      case DossierCandidatureState.ACCEPTED:
        return "Accepté";
      case DossierCandidatureState.WAITING:
        return "En attente";
      case DossierCandidatureState.INVALID:
        return "Invalid";
      case DossierCandidatureState.ADMITTED:
        return "Admis"
      case DossierCandidatureState.FAILD:
        return "Rejecté"
    }
  }

  choiceCandidat(can)
  {
    this.selectedData=can;
    this.modalRef.show()
  }
  endRequest()
  {
    this.modalRef.hide();
  }
}
