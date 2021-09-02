import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EventService } from '../../utils/services/events/event.service';
import { ActionStatus } from '../../utils/services/firebase';
import { EtudiantCandidatureService } from '../etudiant-candidature/etudiant-candidature.service';
import { EtudiantsService } from '../etudiant/etudiants.service';
import { LocalStorageService } from '../localstorage/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderAdminDataService {
  haveLoadedData:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  constructor(
    private etudiantService:EtudiantsService,
    private candidatureService:EtudiantCandidatureService,
    private eventService:EventService,
    private localStorageService:LocalStorageService
    ) { 
      this.localStorageService.getSubjectByKey('haveLoadedData').subscribe((value)=>{
        console.log("Charge ",value)
        if(value) this.haveLoadedData.next(value.hasLoadedData);
      })
    }

  setIsLoadedData(isLoaded)
  {
    console.log("has setData")
    this.localStorageService.setData('haveLoadedData',{hasLoadedData:isLoaded})
  }
  loadAllData():Promise<ActionStatus>
  {
    return new Promise<ActionStatus>((resolve,reject)=>{
      console.log("charge? ",this.eventService.loadedDataFromLocalStorage.getValue(),this.haveLoadedData.getValue())
      // if(this.eventService.loadedDataFromLocalStorage.getValue() && this.haveLoadedData.getValue()) return resolve(new ActionStatus())
      Promise.all([this.etudiantService.loadEtudiantsData(),this.candidatureService.getAllCandidature()])
      .then((result:ActionStatus[])=>{
        this.setIsLoadedData(true);
        resolve(new ActionStatus())
      })
      .catch((error)=>reject(error))
    })
  }
}
