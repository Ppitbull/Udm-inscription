import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/entities/accounts';
import { UserProfilService } from 'src/app/shared/services/user-profil/user-profil.service';

@Component({
  selector: 'app-b-navbar',
  templateUrl: './b-navbar.component.html',
  styleUrls: ['./b-navbar.component.scss']
})
export class BNavbarComponent implements OnInit {
  user:User=new User();
  constructor(
    private userProfil:UserProfilService
  ) { }

  ngOnInit(): void {
    this.userProfil.currentUser.subscribe((user:User)=>{
      if(user) this.user=user
    });
  }

}
