import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Etudiant } from '../../entities/accounts/etudiant';
import { DossierCandidature } from '../../entities/application-file';
import { CustomFile } from '../../entities/custom-file';
import { ActionStatus } from '../../utils/services/firebase';
import { FirebaseFile } from '../../utils/services/firebase/FirebaseFile.service';
import { AuthService } from '../auth/auth.service';
import { EtudiantCandidatureService } from '../etudiant-candidature/etudiant-candidature.service';
import { EtudiantsService } from '../etudiant/etudiants.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class InscriptionEtudiantService {

  constructor(
    private authService:AuthService,
    private userService:UserService,
    private firebaseApiFile:FirebaseFile,
    private candidatureService:EtudiantCandidatureService
  ) { }

  createEtudiantAccount(etudiant:Etudiant):Promise<ActionStatus>
  {
    return this.authService.createAccount(etudiant)
  }

  saveEtudiantAccount(etudiant:Etudiant):Promise<ActionStatus>
  {
    return this.userService.addUser(etudiant)
  }

  saveEtudiantCandidature(candidature:DossierCandidature):Promise<ActionStatus>
  {
    return this.candidatureService.saveEtudiantCandidature(candidature);
  }

  uploadFile(files:CustomFile[]):Promise<ActionStatus>
  {
    return new Promise<ActionStatus>((resolve,reject)=>{
      let fLink:CustomFile[]=[];
      forkJoin(files.map((file:CustomFile)=>this.firebaseApiFile.uploadFile(file))).subscribe({
        next:(value)=> fLink=value.map((result:ActionStatus)=>result.result),
        complete:()=>{
          let result:ActionStatus=new ActionStatus();
          result.result=fLink;
          resolve(result)
        },
        error:(error)=>reject(error)
      })
    })
  }
  
}
