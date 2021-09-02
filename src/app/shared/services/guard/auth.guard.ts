import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { EventService } from '../../utils/services/events/event.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private eventService:EventService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean | UrlTree> | Promise<boolean> | boolean {
      return  new Promise((resolve,reject)=>{
        this.eventService.loadedDataFromLocalStorage.subscribe((value)=>{
          if(value)
          {
            if(this.authService.isLoggedIn.getValue()) resolve(true);
            else {
              resolve(this.router.parseUrl('/login'))
            }
          }
          
        })
      })
  }
}
