import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/entities/accounts';
import { UserProfilService } from 'src/app/shared/services/user-profil/user-profil.service';

@Component({
  selector: 'app-b-sidebar',
  templateUrl: './b-sidebar.component.html',
  styleUrls: ['./b-sidebar.component.scss']
})
export class BSidebarComponent implements OnInit {

  user:User=new User();
  constructor(
    private userProfilService:UserProfilService
  ) { }

  ngOnInit(): void {
    this.userProfilService.currentUser.subscribe((user:User)=>{
      if(user) this.user=user;
    })
  }

}
