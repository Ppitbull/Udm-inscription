import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DossierCandidature } from '../../entities/application-file';
import { EntityID } from '../../entities/entityid';
import { CommentNotification } from '../../entities/notification/commentaire';
import { getBranchCommentaireCandidatures, getBranchOfCandidatures } from '../../utils/functions/db-branch.builder';
import { ActionStatus } from '../../utils/services/firebase';
import { FirebaseDataBaseApi } from '../../utils/services/firebase/FirebaseDatabaseApi';
import { LocalStorageService } from '../localstorage/localstorage.service';
import { UserProfilService } from '../user-profil/user-profil.service';

@Injectable({
  providedIn: 'root'
})
export class CommentairesService {
  comment:BehaviorSubject<CommentNotification>=new BehaviorSubject<CommentNotification>(new CommentNotification())
  constructor(
    private firebaseApi:FirebaseDataBaseApi,
    private userProfilServce:UserProfilService,
    private localStorageService:LocalStorageService
  ) { 
    this.localStorageService.getSubjectByKey("dossier_comment").subscribe((comment:any)=>{
      if(!comment) return;
      let commentN:CommentNotification=new CommentNotification();
      commentN.hydrate(comment);
      this.comment.next(commentN)
    })
  }
  setComment(comment:CommentNotification)
  {
    // console.trace("Qui appelle setcandidature")
    this.localStorageService.setData("dossier_comment",comment.toString());
  }
  getComment():Promise<ActionStatus>
  {
    return new Promise<ActionStatus>((resolve,reject)=>{
      let result=new ActionStatus();
      
      this.firebaseApi
      .fetchOnce(getBranchOfCandidatures())
      .then((result:ActionStatus)=>{
        let found:boolean=false;
        let data=result.result;
        let candidature:DossierCandidature=new DossierCandidature();
        for(let key in data)
        {
          candidature.hydrate(data[key].candidature_data);
          if(candidature.etudiantID.toString()==this.userProfilServce.currentUser.getValue().id.toString()) {
            found=true;
            let commentN=new CommentNotification();
            commentN.hydrate(data[key].candidature_comment)
            this.setComment(commentN);
            break;
          }
        } 
        // console.log("Found ",found)
        if(found) return resolve(result)
        result.apiCode=ActionStatus.RESSOURCE_NOT_FOUND_ERROR;
        result.message="Comment non trouvée"
        result.result=null;
        reject(result);
      })
      .catch((error:ActionStatus)=>{
        this.firebaseApi.handleApiError(error);
        reject(error);
      })
    
    })
  }
  addComment(comment:CommentNotification,candidatureID:EntityID):Promise<ActionStatus>
  {
    return new Promise<ActionStatus>((resolve,reject)=>{
      this.firebaseApi.updates([
        {
        link:`${getBranchCommentaireCandidatures(candidatureID)}`,
        data:comment.toString()
      }])
      .then((result:ActionStatus)=>resolve(new ActionStatus()))
      .catch((error:ActionStatus)=>{
        this.firebaseApi.handleApiError(error);
        reject(error)
      })
    })
  }
}
