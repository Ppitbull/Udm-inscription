import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/entities/accounts';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UserProfilService } from 'src/app/shared/services/user-profil/user-profil.service';

@Component({
  selector: 'app-b-navbar',
  templateUrl: './b-navbar.component.html',
  styleUrls: ['./b-navbar.component.scss']
})
export class BNavbarComponent implements OnInit {
  user:User=new User();
  constructor(
    private authService: AuthService,
    private userProfil:UserProfilService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.userProfil.currentUser.subscribe((user:User)=>{
      if(user) this.user=user
    });
  }

  logOut(){
    this.authService.logOut();
    this.router.navigate(['login'])
  }

}
