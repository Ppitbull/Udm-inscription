import { Injectable } from '@angular/core';
import { ActionStatus } from '.';

@Injectable({
  providedIn: 'root'
})
export class GestionFichierService {

  constructor() { }
  uploadFile():Promise<ActionStatus>
  {
    return new Promise<ActionStatus>((resolve,reject)=>{

    })
  }
  downLoadFile():Promise<ActionStatus>
  {
    return new Promise<ActionStatus>((resolve,reject)=>{

    })
  }
}
