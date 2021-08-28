import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class AdminerGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private notif: NotificationService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean | UrlTree> | Promise<boolean> | boolean {
    return new Promise<UrlTree | boolean>((resolve, reject) => {
      // this.authService.currentUserSubject.subscribe((user) => {
      //   if (this.authService.isAdminer) {
      //     return resolve(true);
      //   }
      //   // this.notif.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry !\</b>\<br> You are not administrator');
      //   resolve(this.router.parseUrl('/user/dashboard'));
      // });
    });
  }
}
