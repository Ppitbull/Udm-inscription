import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Etudiant } from '../../entities/accounts/etudiant';
import { EntityID } from '../../entities/entityid';
import { AccountType } from '../../utils/enum';
import { ActionStatus } from '../../utils/services/firebase';
import { LocalStorageService } from '../localstorage/localstorage.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class EtudiantsService {
  etudiants:BehaviorSubject<EntityID[]>=new BehaviorSubject<EntityID[]>([])
  constructor(
    private userService:UserService,
    private localStorageService:LocalStorageService)
  {
    this.localStorageService.getSubjectByKey("etudiant_list")
    .subscribe((data)=>{
      if(!data) return;
      let etuds=data.map((etudId)=>{
        let id:EntityID=new EntityID();
        id.setId(etudId)
        return id
      });
      this.etudiants.next(etuds);
    })
  }

  setData(entities:EntityID[])
  {
    this.localStorageService.setData("etudiant_list",entities.map((entity)=>entity.toString()));
  }

  addUserAsEtudiant(etudiant:Etudiant)
  {
    this.setData([...this.etudiants.getValue(),etudiant.id]);
  }

  loadEtudiantsData():Promise<ActionStatus>
  {
    return new Promise<ActionStatus>((resolve,reject)=>{
      this.userService.findUsersByKey("accountType",AccountType.ETUDIANT)
      .then((result:ActionStatus)=>{        
        this.setData(result.result.map((etud)=>etud.id));
        resolve(new ActionStatus())
      })
      .catch((error:ActionStatus)=>reject(error))
    })
  } 
}
