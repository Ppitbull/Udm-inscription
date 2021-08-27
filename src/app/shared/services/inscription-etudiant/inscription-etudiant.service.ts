import { Injectable } from '@angular/core';
import { Etudiant } from '../../entities/accounts/etudiant';
import { DossierCandidature } from '../../entities/application-file';
import { CustomFile } from '../../entities/custom-file';
import { ActionStatus } from '../../utils/services/firebase';
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

  uploadFile(file:CustomFile[]):Promise<ActionStatus>
  {
    return new Promise<ActionStatus>((resolve,reject)=>{
      
    })
  }
  
}
