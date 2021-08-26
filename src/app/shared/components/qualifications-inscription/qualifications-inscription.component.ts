import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { annees as anneesList, mentions as mentionsList } from '../../utils/diplome.const';

@Component({
  selector: 'app-qualifications-inscription',
  templateUrl: './qualifications-inscription.component.html',
  styleUrls: ['./qualifications-inscription.component.scss']
})
export class QualificationsInscriptionComponent implements OnInit {
  @Input() form:FormGroup;
  listAnnee=anneesList;
  listMension=mentionsList;
  displayColums =["diplome","annee","filiere","mention"];
  dataSource = new MatTableDataSource([
    {
      diplome:"Baccalauréat/GCE Al",
      annee:"",
      filiere:"",
      mention:""
    },
    {
      diplome:"BTS/DUT",
      annee:"",
      filiere:"",
      mention:""
    },
    {
      diplome:"License",
      annee:"",
      filiere:"",
      mention:""
    },
    {
      diplome:"Autre (préciser)",
      annee:"",
      filiere:"",
      mention:""
    }
  ])
  constructor() { }

  ngOnInit(): void {
  }

  getData()
  {
    return this.dataSource.data;
  }
  submitForm()
  {

  }

}
