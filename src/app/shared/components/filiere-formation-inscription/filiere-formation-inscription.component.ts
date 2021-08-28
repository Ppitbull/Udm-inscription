import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { formations as formationsList, niveau as niveauList} from '../../utils/constante/formation.const';

@Component({
  selector: 'app-filiere-formation-inscription',
  templateUrl: './filiere-formation-inscription.component.html',
  styleUrls: ['./filiere-formation-inscription.component.scss']
})
export class FiliereFormationInscriptionComponent implements OnInit {
  @Input() form:FormGroup;
  @Input() submitedForm:boolean=false;
  @ViewChildren("cycleSelected") listSelectCycle:QueryList<MatSelect>;
  listFormation=formationsList;
  listNiveau=niveauList;
  afaculteList=[];
  afiliereList=[];

  bfaculteList=[];
  bfiliereList=[];

  cfaculteList=[];
  cfiliereList=[];
  
  displayColums =["choix","cycle","faculte","filiere","niveau"];
  dataSource = new MatTableDataSource([
    {
      choix:"1er",
      cycle:"" || {cycle:""},
      faculte:"" || {ab:""},
      filiere:"",
      niveau:""
    },
    {
      choix:"2e",
      cycle:"" || {cycle:""},
      faculte:"" || {ab:""},
      filiere:"",
      niveau:""
    },
    {
      choix:"3e",
      cycle:"" || {cycle:""},
      faculte:"" || {ab:""},
      filiere:"",
      niveau:""
    }
  ])
  constructor() { }
  
  ngOnInit(): void {
  }
  changeFaculteData(event)
  {
    // this.listSelectCycle.forEach((matSelect)=>matSelect.)
    switch(event.source.id)
    {
      case "1er":
        this.afaculteList=event.value.etab;
        break;
      case "2e":
        this.bfaculteList=event.value.etab;
        break;
      case "3e":
        this.cfaculteList=event.value.etab;
        break;
    }
  }
  changeFiliereData(event)
  {
    // event.value.filiereList=event.value.filiere;
    switch(event.source.id)
    {
      case "1er":
        this.afiliereList=event.value.filiere;
        break;
      case "2e":
        this.bfiliereList=event.value.filiere;
        break;
      case "3e":
        this.cfiliereList=event.value.filiere;
        break;
    }
  }
  getData()
  {
    return this.dataSource.data;
  }

}
