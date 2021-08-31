import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import * as db_branch_builder from "./../../utils/functions/db-branch.builder"
import { UserProfilService } from '../user-profil/user-profil.service';
import { EtudiantsService } from '../etudiant/etudiants.service';
import { EntityID } from '../../entities/entityid';
import { FireBaseApi, ActionStatus } from '../../utils/services/firebase';
import { User } from '../../entities/accounts';
import { AccountType } from '../../utils/enum';
import { EtudiantCandidatureService } from '../etudiant-candidature/etudiant-candidature.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private authService:AuthService,
    private firebaseApi:FireBaseApi,
    private userProfil:UserProfilService,
    private etudiantService:EtudiantsService,
    private dossierCandidatureService:EtudiantCandidatureService
  ) { }

  loginUser(email:string,password:string):Promise<ActionStatus>
  {
    return new Promise<ActionStatus>((resolve,reject)=>{
      let currentUserID:EntityID;
      this.authService.authLogin(email,password)
      .then((result:ActionStatus)=>{
        currentUserID=result.result;
        return this.userProfil.getCurrentUserProfil(currentUserID);
      })
      .then((result:ActionStatus)=>{
        let user:User=result.result;
        console.log(user)
        //chargement des commentaires associé a une candidature
        if(user.accountType==AccountType.ETUDIANT) return this.dossierCandidatureService.getCandidatureOfCandidate(currentUserID);
        else return Promise.resolve(new ActionStatus())     
      })
      .then((result:ActionStatus)=>resolve(new ActionStatus()))
      .catch((error:ActionStatus)=>reject(error))
    })
  }
}
