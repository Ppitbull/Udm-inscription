import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/entities/accounts';
import { Etudiant } from 'src/app/shared/entities/accounts/etudiant';
import { DossierCandidature } from 'src/app/shared/entities/application-file';
import { EtudiantCandidatureService } from 'src/app/shared/services/etudiant-candidature/etudiant-candidature.service';
import { UserProfilService } from 'src/app/shared/services/user-profil/user-profil.service';
import { DossierCandidatureState } from 'src/app/shared/utils/enum/dossier-candidature.enum';
import { ActionStatus } from 'src/app/shared/utils/services/firebase';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  isAdmin: boolean = false;
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
  dossierInvalid: boolean = false;
  user:any=new User();
  candidatureEtudiant:DossierCandidature=new DossierCandidature();
  textStatuDossier="Dossier en attente de traitement";
  color="orange"

  constructor(
    private userProfileService:UserProfilService,
    private candidatureEtudiantService:EtudiantCandidatureService
  ) { }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        let formData:FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        let headers = new Headers();
        /** In Angular 5, including the header Content-Type can invalidate your request */
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
    }
}
  ngOnInit(): void {
    this.isAdmin=this.user.isAdminAccount();
    console.log("is admin1: ", this.isAdmin);
    this.userProfileService.currentUser.subscribe((user)=>{
      if(user) this.user=user;
      this.candidatureEtudiantService.getCandidatureOfCandidate(user.id).then((result:ActionStatus)=>
      {
        this.candidatureEtudiant=result.result
        console.log(this.candidatureEtudiant)
        switch(this.candidatureEtudiant.state)
          {
            case DossierCandidatureState.WAITING:
              this.textStatuDossier="Dossier en attente de traitement";
              this.color="rgb(14, 80, 161) !important";
              break;
            case DossierCandidatureState.INVALID:
              this.textStatuDossier="Dossier invalide";
              this.color="orange";
              this.dossierInvalid = true;
              break;
            case DossierCandidatureState.FAILD:
              this.textStatuDossier="Dossier rejecté";
              this.color="red";
              break
            case DossierCandidatureState.ACCEPTED:
              this.textStatuDossier="Dossier accepté";
              this.color="orange";
              break;
            case DossierCandidatureState.ADMITTED:
              this.textStatuDossier="Etudiant admis"
              this.color="green";
          }
      });
    })
  }

}
