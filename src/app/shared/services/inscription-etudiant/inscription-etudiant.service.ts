import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
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
  uploadFileWithProgression(dir:string,files:CustomFile[]):BehaviorSubject<ActionStatus>
  {
    let result:ActionStatus=new ActionStatus();
    result.result={
      file:"",
      percent:0
    }
    let subject:BehaviorSubject<ActionStatus>=new BehaviorSubject<ActionStatus>(result)
    files.forEach((file:CustomFile)=>this.firebaseApiFile.uploadFile(dir,file).subscribe({
      next:(value)=> {
        result.apiCode=value.apiCode,
        result.result.file=file.name,
        result.result.percent=result.result,
        subject.next(result);
      },
      complete:()=>subject.complete()
    }))
    return subject;
  }
  uploadFile(dir:string,files:CustomFile[]):Promise<ActionStatus>
  {
    return new Promise<ActionStatus>((resolve,reject)=>{
      let fLink:CustomFile[]=[];
      forkJoin(files.map((file:CustomFile)=>this.firebaseApiFile.uploadFile(dir,file))).subscribe({
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
