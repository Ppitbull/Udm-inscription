import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlateFormAdmin } from 'src/app/shared/entities/accounts';
import { UserService } from 'src/app/shared/services/user/user.service';
import { AccountType } from 'src/app/shared/utils/enum';
import { EventService } from 'src/app/shared/utils/services/events/event.service';
import { ActionStatus } from 'src/app/shared/utils/services/firebase';

@Component({
  selector: 'app-manage-admin',
  templateUrl: './manage-admin.component.html',
  styleUrls: ['./manage-admin.component.scss']
})
export class ManageAdminComponent implements OnInit {
  form:FormGroup
  submitedForm:boolean=false;
  waitResponse:boolean=false;
  dataLoaded:boolean=false;
  adminList:PlateFormAdmin[]=[];
  constructor(
    private userService:UserService,
    private eventService:EventService
  )
  {}

  ngOnInit(): void {
    this.form=new FormGroup({
      nom:new FormControl("",[Validators.required,Validators.minLength(2)]),
      prenom:new FormControl("",[Validators.required,Validators.minLength(2)]),
      email: new FormControl("",[Validators.required,Validators.pattern('^[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z0-9]{2,6}')]),
      tel: new FormControl("",[Validators.required, Validators.minLength(5)]),
      mdp:new FormControl("",[Validators.required,Validators.minLength(8)]),
    })

    this.eventService.loadedDataFromLocalStorage.subscribe((value)=>{
      if(!value) return;
      this.dataLoaded=true;
      this.adminList=this.userService.getObservableUsersByType(AccountType.PLATEFROM_ADMIN);
    })
  }

  addAccount()
  {
    this.submitedForm=true;
    if(this.form.invalid) return;
    this.waitResponse=true;
    let admin:PlateFormAdmin=new PlateFormAdmin();
    admin.hydrate(this.form.value);
    admin.tel=this.form.value.tel.internationalNumber;
    this.userService.createNewAccount(admin)
    .then((result:ActionStatus)=>{
      this.waitResponse=false;
      this.submitedForm=false;
      //notification de success
      this.form.reset();
    })
    .catch((error:ActionStatus)=>{
      this.waitResponse=false;
      this.submitedForm=false;
      //notification de l'erreur
      console.log(error);
    })

  }

}
