import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DossierCandidature } from '../../entities/application-file';
import { EntityID } from '../../entities/entityid';
import { DbBranch } from '../../utils/enum/db-branch.enum';
import { getBanchOfCandidatureOfUser } from '../../utils/functions/db-branch.builder';
import { ActionStatus, FireBaseApi } from '../../utils/services/firebase';
import { LocalStorageService } from '../localstorage/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class EtudiantCandidatureService {
  listCandidatures: BehaviorSubject<DossierCandidature[]> = new BehaviorSubject<DossierCandidature[]>([]);
  constructor(
    private localStorageService:LocalStorageService,
    private firebaseApi:FireBaseApi
  ) {
    this.localStorageService.getSubjectByKey("dossier_candidature").subscribe((dossiers:any)=>{
      if(!dossiers) return;      
      this.listCandidatures.next(dossiers.map((dossier)=>{
        let dossierCandidature:DossierCandidature=new DossierCandidature();
        dossierCandidature.hydrate(dossier);
        return dossierCandidature;
      }))
    })
  }

  setCandidature(candidatures:DossierCandidature[])
  {
    this.localStorageService.setData("dossier_candidature",candidatures.map((candidature)=>candidature.toString()));
  }
  
  getCandidatureOfCandidate(userID:EntityID):Promise<ActionStatus>
  {
    return new Promise<ActionStatus>((resolve,reject)=>{
      let dossier=this.listCandidatures.getValue().find((dossier:DossierCandidature)=>dossier.etudiantID.toString()==userID.toString());
      let result=new ActionStatus();
      console.log("Dossier ",this.listCandidatures.getValue(),userID)      

      if(dossier){  
        result.result=dossier;
        return resolve(result);
      }
      this.firebaseApi.fetchOnce(getBanchOfCandidatureOfUser(userID))
      .then((resultAction:ActionStatus)=>{
        let candidature:DossierCandidature=new DossierCandidature();
        candidature.hydrate(resultAction.result);
        this.setCandidature([...this.listCandidatures.getValue(),candidature]);
        result.result=candidature;
        resolve(result)
      })
      .catch((error:ActionStatus)=>{
        this.firebaseApi.handleApiError(error);
        reject(error);
      })
    
    })
  }

  saveEtudiantCandidature(candidature:DossierCandidature):Promise<ActionStatus>
  {
    return new Promise<ActionStatus>((resolve,reject)=>{
      this.firebaseApi.set(getBanchOfCandidatureOfUser(candidature.etudiantID),candidature.toString())
      .then((result:ActionStatus)=>{
        this.setCandidature([candidature]);
        resolve(result);
      })
      .catch((error:ActionStatus)=>{
        this.firebaseApi.handleApiError(error);
        reject(error)
      })
    })
  }


}
