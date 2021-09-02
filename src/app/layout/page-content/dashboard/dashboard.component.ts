import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/entities/accounts';
import { DossierCandidature } from 'src/app/shared/entities/application-file';
import { CommentNotification } from 'src/app/shared/entities/notification/commentaire';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CommentairesService } from 'src/app/shared/services/commentaires/commentaires.service';
import { EtudiantCandidatureService } from 'src/app/shared/services/etudiant-candidature/etudiant-candidature.service';
import { LoaderAdminDataService } from 'src/app/shared/services/loader-admin-data/loader-admin-data.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { UserProfilService } from 'src/app/shared/services/user-profil/user-profil.service';
import { AccountType } from 'src/app/shared/utils/enum';
import { DossierCandidatureState } from 'src/app/shared/utils/enum/dossier-candidature.enum';
import { EventService } from 'src/app/shared/utils/services/events/event.service';
import { ActionStatus } from 'src/app/shared/utils/services/firebase';

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

  user:User=new User();
  dossierCandidature:DossierCandidature=new DossierCandidature();

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

  commentaire:CommentNotification=new CommentNotification();



  hasLoadedAdminData:boolean=false;

  constructor(
    private userProfilService:UserProfilService,
    private dossierCandidatureService:EtudiantCandidatureService,
    private eventService:EventService,
    private notificationService:NotificationService,
    private commentService:CommentairesService,
    private loaderAdminDataService:LoaderAdminDataService) {
    this.getEtat();
  }

  ngOnInit(): void {
    this.eventService.loadedDataFromApi.subscribe((isLoaded)=>{
      this.hasLoadedAdminData=isLoaded;
    })
    this.userProfilService.currentUser.subscribe((user:User)=>{
      if(user)
      {
        this.user=user;
        this.isAdmin=user.isAdminAccount();
        this.email=user.email.toString();
        this.pass=user.mdp.toString();
        if(this.user.accountType==AccountType.ETUDIANT && !this.hasLoadedAdminData)
        {
          this.dossierCandidatureService.getCandidatureOfCandidate(user.id).then((result:ActionStatus)=>{
            if(!result.result) return;
            this.dossierCandidature=result.result;
            switch(this.dossierCandidature.state)
            {
              case DossierCandidatureState.WAITING:
                this.etat="attente";
                break;
              case DossierCandidatureState.INVALID:
                this.etat="invalid";
                break;
              case DossierCandidatureState.FAILD:
                this.etat="recal";
                break
              case DossierCandidatureState.ACCEPTED:
                this.etat="correct";
                break;
              case DossierCandidatureState.ADMITTED:
                this.etat="admis"
            }
            this.getEtat();
          });
        }
        this.commentService.comment.subscribe((comm)=>{
          this.commentaire=comm;
          this.comment=this.commentaire.content
        })
      }

      if(this.user.accountType==AccountType.PLATEFROM_ADMIN)
      {
        if(!this.hasLoadedAdminData)
        {
          this.loaderAdminDataService
          .loadAllData()
          .then((action:ActionStatus)=>{
            // this.notificationService.showNotification('info',"Chargement des données terminé");
            this.hasLoadedAdminData=true
            this.allAttente=this.dossierCandidatureService.getCandidaturesListByType(DossierCandidatureState.WAITING).length;
            this.allAdmis=this.dossierCandidatureService.getCandidaturesListByType(DossierCandidatureState.ADMITTED).length;
            this.allCorrect=this.dossierCandidatureService.getCandidaturesListByType(DossierCandidatureState.ACCEPTED).length;
            this.allInvalid=this.dossierCandidatureService.getCandidaturesListByType(DossierCandidatureState.INVALID).length;
            this.allRecal=this.dossierCandidatureService.getCandidaturesListByType(DossierCandidatureState.FAILD).length;
          })
          .catch((error:ActionStatus)=>{
            // this.notificationService.showNotification('danger',"Erreur de chargement des données");
            console.log(error)
          })
        }
      }
    })
    
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
