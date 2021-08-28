import { Injectable, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../../entities/accounts';
import { EntityID } from '../../entities/entityid';
import { EventService } from '../../utils/services/events/event.service';
import { FireBaseApi, ActionStatus } from '../../utils/services/firebase';
import { LocalStorageService } from '../localstorage/localstorage.service';
// import { UserLocalStorageData, UserlocalstorageService } from '../localstorage/userlocalstorage.service';
import { UserLocalStorageData, UserlocalstorageService } from '../localstorage/userlocalstorage.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isAdminer: boolean = false;
  currentUser: User = new User();
  currentUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>(this.currentUser);

  constructor(
    private router: Router,
    // private api: ApiService,
    // private toastr: ToastrService,
    // private user: UserService,
    private localStorageService: LocalStorageService,
    private firebaseApi: FireBaseApi,
    private eventService: EventService
  ) {
    this.localStorageService.dataUser.subscribe((userData: UserLocalStorageData) => {
      // console.log("userData ",userData)
      this.isLoggedIn.next(userData.isLoggedIn);
      this.currentUser = userData.user;
      this.ifAdminer(this.currentUser.email);
      this.emitUserData();
    });

    // this.registResult = false;
    // this.loginResult = false;

  }

  // tslint:disable-next-line:typedef
  ifAdminer(email: String) {
    if (email == 'admin@gmail.com') {
      this.isAdminer = true;
    }
  }

  // tslint:disable-next-line:typedef
  emitUserData() {
    this.currentUserSubject.next(this.currentUser);
  }

  /*
   * logOut function is used to sign out .
   */
  // tslint:disable-next-line:typedef
  logOut() {
    // this.localStorageService.clearData();
    // this.toastr.success('You have been successfully logged out!');
    this.router.navigate(['login']);
    localStorage.clear();
  }

  /**
   *  Create an account on the drupal platform
   *
   */
  createAccount(user: User): Promise<ActionStatus> {

    return new Promise((resolve, reject) => {
      this.firebaseApi.createUserApi(user.email.toString(), user.mdp.toString())
        .then((result: ActionStatus) => {
          user.dateCreation = (new Date()).toISOString();
          user.id = result.result.uid;
          result.result = user;
          resolve(result);
        })
        .catch(e => {
          this.firebaseApi.handleApiError(e);
          reject(e);
        })
    });

  }


  // Login into your account
  authLogin(email?: string, password?: string): Promise<ActionStatus> {

    return new Promise((resolve, reject) => {
      this.firebaseApi.signInApi(email, password)
        .then((result: ActionStatus) => {
          if (email == "admin@gmail.com") {
            localStorage.setItem('isAdmin', 'true');
            this.isAdminer = true;
          }
          let userID: EntityID = new EntityID();
          userID.setId(result.result.user.uid)
          result.result = userID;
          resolve(result);
        })
        .catch((error: ActionStatus) => {
          this.firebaseApi.handleApiError(error);
          reject(error);
        })
    });
  }
}
