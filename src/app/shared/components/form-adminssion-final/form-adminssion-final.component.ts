import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Etudiant } from '../../entities/accounts/etudiant';
import { DossierCandidature } from '../../entities/application-file';
import { Cycle, Niveau } from '../../utils/enum/etablissement.enum';
import { DocsFormsComponent } from '../docs-form/docs-forms/docs-forms.component';

@Component({
  selector: 'app-form-adminssion-final',
  templateUrl: './form-adminssion-final.component.html',
  styleUrls: ['./form-adminssion-final.component.scss']
})
export class FormAdminssionFinalComponent implements OnInit, OnChanges {
  @Input() form:FormGroup;
  @Input() etudiant:Etudiant=new Etudiant();
  @Input() dossier:DossierCandidature=new DossierCandidature();
  @Input() submitedForm:boolean=false;
  formStructure:{
    id:string,
    label:string,
    required:boolean,
    errorMessage:string,
    col:string
  }[][]=[];

  @ViewChild(DocsFormsComponent) docsFormComponent:DocsFormsComponent;

  constructor() { }
  
  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.etudiant) this.createFileForm();
  }
  getData()
  {
    return this.docsFormComponent.getDocumentsList();
  }

  createFileForm()
  {
    if(this.dossier.formations.premierChoix.niveau==Niveau.NIVEAU_1)
    {
      if(this.dossier.formations.premierChoix.cycle==Cycle.LICENCE)
      {
        this.formStructure=[
          [
            {
              id:"premierAnneeBulletin",
              label:"Photocopies des bulletins de notes des classes de Terminale et de Première",
              required:true,
              errorMessage:"Les photocopies de bulletins de notes sont requis",
              col:"col-10 col-md-6"
            },
            {
              id:"premierAnneeRecusFraisEtudeDossier",
              label:"Reçu du versement de 15 000 FCFA de frais d’étude de dossier",
              required:true,
              errorMessage:"Le reçu du versement de 15 000 FCFA est requis",
              col:"col-10 col-md-6"
            }
          ],
          [
            {
              id:"premierAnneeRecuChoixAdditionnel",
              label:"Le Reçu du versement de 5 000 FCFA pour un choix additionnel à l’intérieur du même Etablissement que le premier choix",
              required:false,
              errorMessage:"",
              col:"col-10 col-md-6"
            },
          ]
        ]
      }
      else if(this.dossier.formations.premierChoix.cycle==Cycle.MASTER)
      {
        this.formStructure=[
          [
            {
              id:"relectevNoteLicence",
              label:"Relevés de notes du cycle de Licence",
              required:true,
              errorMessage:"Les relevés de notes du cycle de Licence sont requis",
              col:"col-10 col-md-6"
            },
            {
              id:"photocopiDiplomeLicence",
              label:"Photocopie du diplôme Bac +3 (Licence)",
              required:false,
              errorMessage:"La photocopie du diplôme Bac +3 est requise",
              col:"col-10 col-md-6"
            }
          ],
          [
            {
              id:"premierAnneeRecusFraisEtudeDossier",
              label:"Reçu du versement de 15 000 FCFA de frais d’étude de dossier",
              required:true,
              errorMessage:"Le reçu du versement de 15 000 FCFA est requis",
              col:"col-10 col-md-6"
            },
            {
              id:"premierAnneeRecuChoixAdditionnel",
              label:"Le Reçu du versement de 5 000 FCFA pour un choix additionnel à l’intérieur du même Etablissement que le premier choix",
              required:false,
              errorMessage:"",
              col:"col-10 col-md-6"
            },
          ]
        ]
      }
    }
    else if(this.dossier.formations.premierChoix.niveau==Niveau.NIVEAU_2)
    {
      this.formStructure=[
        [
          {
            id:"releveBack",
            label:"Relevé(s) de notes du baccalauréat ou du GCE/AL",
            required:true,
            errorMessage:"Le relevé de note du baccalauréat ou du GCE/AL est requis",
            col:"col-10 col-md-6"
          },
          {
            id:"releveNote",
            label:"Relevé(s) de notes de toutes les années d’études post-baccalauréat",
            required:false,
            errorMessage:"Les relevés de notes de toutes les années d'études post-baccalauréat sont requis",
            col:"col-10 col-md-6"
          }
        ],
        [
          {
            id:"photocopieDiplomeBac",
            label:"Photocopie du diplôme Bac +2 ou Bac +3",
            required:true,
            errorMessage:"La Photocopie du diplôme Bac +2 ou Bac +3 est requise",
            col:"col-10 col-md-6"
          },
          {
            id:"programmeDetaille",
            label:"Programme détaillé des enseignements post-baccalauréat validé par l’Institution d’origine",
            required:true,
            errorMessage:"Le programme détaillé des enseignements est requis",
            col:"col-10 col-md-6"
          }
        ],
        [
          {
            id:"premierAnneeRecusFraisEtudeDossier",
            label:"Reçu du versement de 15 000 FCFA de frais d’étude de dossier",
            required:true,
            errorMessage:"Le reçu du versement de 15 000 FCFA est requis",
            col:"col-10 col-md-6"
          },
          {
            id:"premierAnneeRecuChoixAdditionnel",
            label:"Le Reçu du versement de 5 000 FCFA pour un choix additionnel à l’intérieur du même Etablissement que le premier choix",
            required:false,
            errorMessage:"",
            col:"col-10 col-md-6"
          },
        ]
      ]
    }
    else if(this.dossier.formations.premierChoix.niveau==Niveau.NIVEAU_3)
    {
      this.formStructure=[
        [
          {
            id:"releveNote",
            label:"Relevé(s) de notes de toutes les années d’études post-baccalauréat",
            required:false,
            errorMessage:"Les relevés de notes de toutes les années d'études post-baccalauréat sont requis",
            col:"col-10 col-md-6"
          },
          {
            id:"photocopieDiplomeBac",
            label:"Photocopie du diplôme Bac +2 ou Bac +3",
            required:true,
            errorMessage:"La Photocopie du diplôme Bac +2 ou Bac +3 est requise",
            col:"col-10 col-md-6"
          }          
        ],
        [         
          {
            id:"programmeDetaille",
            label:"Programme détaillé des enseignements post-baccalauréat validé par l’Institution d’origine",
            required:true,
            errorMessage:"Le programme détaillé des enseignements est requis",
            col:"col-10 col-md-6"
          },
          {
            id:"premierAnneeRecusFraisEtudeDossier",
            label:"Reçu du versement de 15 000 FCFA de frais d’étude de dossier",
            required:true,
            errorMessage:"Le reçu du versement de 15 000 FCFA est requis",
            col:"col-10 col-md-6"
          },
        ],
        [          
          {
            id:"premierAnneeRecuChoixAdditionnel",
            label:"Le Reçu du versement de 5 000 FCFA pour un choix additionnel à l’intérieur du même Etablissement que le premier choix",
            required:false,
            errorMessage:"",
            col:"col-10 col-md-8"
          },
        ]
      ]
    }
  }


}
