import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { ActionStatus } from './actionstatus';
import { FireBaseConstant } from './firebase-constant'
// declare var firebase:any;

@Injectable({
  providedIn: 'root'
})
export class FirebaseDataBaseApi {

  static firebaseConfig: any = {
    apiKey: "AIzaSyAU-jW0bLBnEo0qxc8sIh7Td8LuG5QoGPs",
    authDomain: "projet-autoecole.firebaseapp.com",
    projectId: "projet-autoecole",
    storageBucket: "projet-autoecole.appspot.com",
    messagingSenderId: "868491853776",
    appId: "1:868491853776:web:3f3c85f94856e3054603d5",
    measurementId: "G-LJEZHJW211"

  };
  debug: boolean = false;
  offlineMode: boolean = false;
  db: any;

  constructor() {

    // Initialize Firebase
    firebase.initializeApp(FirebaseDataBaseApi.firebaseConfig);
    // firebase.analytics();
    this.db = firebase.database();
    this.setDebugMode();
    this.setModeApp();
  }
  setDebugMode() {
    // if(this.debug) firebase.firestore.setLogLevel('debug');

  }
  setModeApp() {
    // if(this.offlineMode) firebase.firestore().enablePersistence();
  }
  getFirebaseDatabase() {
    return this.db;
  }
  add(url: string, value: any): Promise<ActionStatus> {
    let action = new ActionStatus();
    return new Promise((resolve, reject) => {
      this.db.ref(url).push().set(value).then((doc) => {
        action.description = 'successful add new collection';
        resolve(action);
      }).catch((err) => {
        action.apiCode = err.code;
        action.code = ActionStatus.UNKNOW_ERROR;
        action.message = 'error';
        action.description = 'Description of error: ' + err;
        reject(action);
      });
    });
  }
  set(url: string, value: any): Promise<ActionStatus> {
    let action = new ActionStatus();
    return new Promise<ActionStatus>((resolve, reject) => {
      this.db.ref(url).set(value).then(() => {
        action.message = 'success';
        action.description = 'successful set new collection';
        resolve(action);
      }).catch((err) => {
        action.apiCode = err.code;
        action.code = ActionStatus.UNKNOW_ERROR;
        action.message = 'error';
        action.description = 'Description of error: ' + err;
        reject(action)
      });
    })
  }
  fetchOnce(url: string): Promise<ActionStatus> {
    let action = new ActionStatus();
    return new Promise((resolve, reject) => {
      this.db.ref(url).once('value')
        .then((doc) => {
          try {
            action.result = doc.val();
            action.description = 'Successful fetching information';
            resolve(action);
          }
          catch (err) {
            action.apiCode = err.code;
            action.code = ActionStatus.UNKNOW_ERROR;
            action.message = 'error';
            action.description = `Description of error: ${err}`;
            reject(action);
          }
        })
    });
  }


  fetch(url: string): Promise<ActionStatus> {
    let action = new ActionStatus();
    return new Promise<ActionStatus>((resolve, reject) => {
      this.db.ref(url).on('value', (doc) => {
        try {
          // let r=[];
          // doc.forEach(element => {
          //   r.push(element.val());
          // });
          action.description = 'Successful fetching information';
          action.result = doc.val();
          resolve(action);
        }
        catch (err) {
          action.apiCode = err.code;
          action.code = ActionStatus.UNKNOW_ERROR;
          action.message = 'error';
          action.description = `Description of error: ${err}`;
          reject(action);
        }
      });
    });
  }

  update(url: string, updates: any): Promise<ActionStatus> {
    let action = new ActionStatus();
    return new Promise<ActionStatus>((resolve, reject) => {
      try {
        this.db.ref(url).update(updates);
        action.description = 'Successful update information';
        resolve(action);
      }
      catch (err) {
        action.apiCode = err.code;
        action.code = ActionStatus.UNKNOW_ERROR;
        action.message = 'error';
        action.description = `Description of error: ${err}`;
        reject(action);
      }
    });
  }

  updates(updates: { link: String, data: any }[]): Promise<ActionStatus> {
    return new Promise<ActionStatus>((resolve, reject) => {
      let up = {};
      let result = new ActionStatus();
      updates.forEach((update) => up[update.link.toString()] = update.data);
      this.db.ref().update(up, (error) => {
        if (error) {
          result.apiCode = error.error;
          result.message = error.message;
          return reject(result);
        }
        resolve(result);
      })
    })

  }

  delete(url: string): Promise<ActionStatus> {
    let action = new ActionStatus();
    return new Promise<ActionStatus>((resolve, reject) => {
      try {
        this.db.ref(url).remove();
        action.description = 'Successful deleting information';
        resolve(action);
      }
      catch (err) {
        action.apiCode = err.code;
        action.code = ActionStatus.UNKNOW_ERROR;
        action.message = 'error';
        action.description = `Description of error: ${err}`;
        reject(action);
      }
    });

  }
  get user() {
    return firebase.auth().currentUser;
  }

  signInApi(email: string, password: string): Promise<ActionStatus> {
    let result: ActionStatus = new ActionStatus();
    return new Promise(async (resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          result.description = 'Authentification successful';
          result.result = userCredential;
          // console.log("Credential ",userCredential.user)
          resolve(result);
        })
        .catch((error) => {
          result.code = ActionStatus.UNKNOW_ERROR;
          result.apiCode = error.code;
          result.message = 'error';
          result.description = `Description of error: ${error}`;
          reject(result);
        })
    });
  }

  signOutApi() {
    firebase.auth().signOut();
  }

  updateUser(user:Record<string,any>):Promise<ActionStatus>
  {
    return new Promise<ActionStatus>((resolve,reject)=>{
      let r={}
      if(user.hasOwnProperty("name")) r['displayName'] = user.name;
      if(user.hasOwnProperty("photoUrl")) r['photoURL']=user.photoUrl
      this.db.currentUser.updateProfile(r)
      .then(()=>resolve(new ActionStatus()))
      .catch((error)=>{
        let result:ActionStatus = new ActionStatus();
        result.apiCode=error.error;
        result.message=error.getMessage();
      })
    })
  }

  createUserApi(email: string, password: string): Promise<ActionStatus> {
    let result: ActionStatus = new ActionStatus();
    return new Promise(async (resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          result.description = 'Account was created successful';
          result.result = userCredential.user;
          resolve(result);
        })
        .catch((error) => {
          result.code = ActionStatus.UNKNOW_ERROR;
          result.apiCode = error.code;
          result.message = `error: ${error.code}`;
          result.description = `Description of error: ${error.message}`;
          reject(result);
        });
    });
  }

  handleConnexionState(callBack) {
    firebase.database().ref('./info/connected').on('value', (snap) => {
      if (snap.val() === true) { callBack({ connected: true }); }
      else { callBack({ connected: false }); }
    })
  }

  handleApiError(result: ActionStatus) {
    switch (result.apiCode) {
      case FireBaseConstant.AUTH_WRONG_PASSWORD:
        result.message = 'Incorrect email or password';
        break;
      case FireBaseConstant.AUTH_WEAK_PASSWORD:
        result.message = 'Password must have at least 6 characters'
        break;
      case FireBaseConstant.AUTH_EMAIL_ALREADY_USE:
        result.message = 'Email already used by another user';
        break;
      case FireBaseConstant.NET_NETWORK_FAIL:
        result.message = 'Offline. Please check your network connectivity';
      case FireBaseConstant.DESACTIVED_ACCOUNT:
        result.message="Account Disabled. Contacted the administrator for a reactivation"
        break;
    };
  }
}
