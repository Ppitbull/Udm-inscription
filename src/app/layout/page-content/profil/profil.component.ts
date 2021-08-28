import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/entities/accounts';
import { DossierCandidature } from 'src/app/shared/entities/application-file';
import { EtudiantCandidatureService } from 'src/app/shared/services/etudiant-candidature/etudiant-candidature.service';
import { UserProfilService } from 'src/app/shared/services/user-profil/user-profil.service';
import { ActionStatus } from 'src/app/shared/utils/services/firebase';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
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

  user:User=new User();
  candidatureEtudiant:DossierCandidature=new DossierCandidature();

  constructor(
    private userProfileService:UserProfilService,
    private candidatureEtudiantService:EtudiantCandidatureService
  ) { }

  ngOnInit(): void {
    this.userProfileService.currentUser.subscribe((user:User)=>{
      if(user) this.user=user;
      this.candidatureEtudiantService.getCandidatureOfCandidate(user.id).then((result:ActionStatus)=>
      {
        console.log("Result ",result.result)
        this.candidatureEtudiant=result.result
      });
    })
  }

}
