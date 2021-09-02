import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DossierCandidature } from '../../entities/application-file';
import { EntityID } from '../../entities/entityid';
import { DbBranch } from '../../utils/enum/db-branch.enum';
import { DossierCandidatureState } from '../../utils/enum/dossier-candidature.enum';
import { getBanchOfCandidature, getBranchOfCandidatures } from '../../utils/functions/db-branch.builder';
import { ActionStatus, FireBaseApi } from '../../utils/services/firebase';
import { LocalStorageService } from '../localstorage/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class EtudiantCandidatureService {
  listCandidatures: BehaviorSubject<Map<string,DossierCandidature>> = new BehaviorSubject<Map<string,DossierCandidature>>(new Map());
  constructor(
    private localStorageService:LocalStorageService,
    private firebaseApi:FireBaseApi
  ) {
    this.localStorageService.getSubjectByKey("dossier_candidature").subscribe((dossiers:any)=>{
      if(!dossiers) return;     
      let mapData:Map<string,DossierCandidature>=new Map<string,DossierCandidature>();
      dossiers.forEach(dossier => {
        let dossierCandidature:DossierCandidature=new DossierCandidature();
        dossierCandidature.hydrate(dossier);
        mapData.set(dossierCandidature.etudiantID.toString().toString(),dossierCandidature);
      });
      this.listCandidatures.next(mapData)
    })
  }

  setCandidature(candidatures:Map<string,DossierCandidature>)
  {
    // console.trace("Qui appelle setcandidature")
    this.localStorageService.setData("dossier_candidature",Array.from(candidatures.values()).map((candidature)=>candidature.toString()));
  }
  getAllCandidature():Promise<ActionStatus>
  {
    return new Promise<ActionStatus>((resolve,reject)=>{
      this.firebaseApi
      .fetchOnce(getBranchOfCandidatures())
      .then((result:ActionStatus)=>{
        let data=result.result;
        let mapData:Map<string,DossierCandidature>=new Map<string,DossierCandidature>();       
        for(let key in data)
        {
          let candidature:DossierCandidature=new DossierCandidature();
          candidature.hydrate(data[key].candidature_data);
          mapData.set(candidature.etudiantID.toString().toString(), candidature)
        } 
        this.setCandidature(mapData);
        resolve(new ActionStatus())
      })
      .catch((error:ActionStatus)=>{
        this.firebaseApi.handleApiError(error);
        reject(error);
      })
    })
  }
  getCandidatureOfCandidate(userID:EntityID):Promise<ActionStatus>
  {
    // console.trace("qui l'appelle")
    return new Promise<ActionStatus>((resolve,reject)=>{
      let result=new ActionStatus();
      // console.log("Dossier ",this.listCandidatures.getValue(),userID)      

      if(this.listCandidatures.getValue().has(userID.toString().toString())){  
        result.result=this.listCandidatures.getValue().get(userID.toString().toString());
        return resolve(result);
      }
      this.firebaseApi
      .fetchOnce(getBranchOfCandidatures())
      .then((result:ActionStatus)=>{
        let found:boolean=false;
        let data=result.result;
        let candidature:DossierCandidature=new DossierCandidature();
        for(let key in data)
        {
          candidature.hydrate(data[key].candidature_data);
          if(candidature.etudiantID.toString()==userID.toString()) {
            found=true;
            break;
          }
        } 
        // console.log("Found ",found)
        if(found)
        {
          let map=this.listCandidatures.getValue();
          map.set(candidature.etudiantID.toString().toString(),candidature);
          this.setCandidature(map);
          result.result=candidature;
          return resolve(result)
        }
        result.apiCode=ActionStatus.RESSOURCE_NOT_FOUND_ERROR;
        result.message="Candidature non trouvée"
        result.result=null;
        reject(result);
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
      this.firebaseApi.set(getBanchOfCandidature(candidature.id),candidature.toString())
      .then((result:ActionStatus)=>{
        let map=this.listCandidatures.getValue();
          map.set(candidature.etudiantID.toString().toString(),candidature);
          this.setCandidature(map);
        resolve(result);
      })
      .catch((error:ActionStatus)=>{
        this.firebaseApi.handleApiError(error);
        reject(error)
      })
    })
  }

  getCandidaturesListByType(type:DossierCandidatureState):DossierCandidature[]
  {
    return Array.from(this.listCandidatures.getValue().values()).filter((dossier:DossierCandidature)=>dossier.state==type)
  }
  getCandidaturesListByTypeByFaculte(type:DossierCandidatureState,faculte:string):DossierCandidature[]
  {
    // console.log(Array.from(this.listCandidatures.getValue().values()))
    return Array.from(this.listCandidatures.getValue().values()).filter((dossier:DossierCandidature)=> dossier.state==type && dossier.getFaculte()==faculte)
  }
  getCandidaturesListByTypeByFiliere(type:DossierCandidatureState | string,faculte:string,filiere:String):DossierCandidature[]
  {
    // console.log("list candidat ",this.listCandidatures.getValue())
    if(type=="all") return Array.from(this.listCandidatures.getValue().values()).filter((dossier:DossierCandidature)=> dossier.getFaculte()==faculte && dossier.getFiliere()==filiere)
    return Array.from(this.listCandidatures.getValue().values()).filter((dossier:DossierCandidature)=> dossier.state==type && dossier.getFaculte()==faculte && dossier.getFiliere()==filiere)
  }
  changeCandidatureState(candidatureID:EntityID, userID:EntityID,state:DossierCandidatureState):Promise<ActionStatus>
  {
    return new Promise<ActionStatus>((resolve,reject)=>{
      this.firebaseApi.updates([
        {
          link:`${getBanchOfCandidature(candidatureID)}/state`,
          data:state
        }
      ])
      .then((result:ActionStatus)=>{
        let listCandid= this.listCandidatures.getValue();
        if(listCandid.has(userID.toString().toString()))
        {
          let candid=listCandid.get(userID.toString().toString())
          candid.state=state;
          this.setCandidature(listCandid);  
        }
        resolve(result)
      })
      .catch((error)=>{
        this.firebaseApi.handleApiError(error);
        reject(error)
      })
    })
  }

}
