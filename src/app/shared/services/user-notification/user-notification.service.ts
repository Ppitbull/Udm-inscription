import { N } from '@angular/cdk/keycodes';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../entities/accounts';
import { EntityID } from '../../entities/entityid';
import { Notification } from '../../entities/notification/notification';
import { NotificationReadState } from '../../utils/enum/notification.enum';
import { EventService } from '../../utils/services/events/event.service';
import { ActionStatus, FireBaseApi } from '../../utils/services/firebase';
import { AuthService } from '../auth/auth.service';
import { UserProfilService } from '../user-profil/user-profil.service';

@Injectable({
  providedIn: 'root'
})
export class UserNotificationService {
  currentUser: User=new User();
  listNotifications: Notification[] = [];
  notifications: BehaviorSubject<Notification[]> = new BehaviorSubject<Notification[]>([])

  constructor(private authService: AuthService,
    private userProfileService:UserProfilService,
    private eventService: EventService,
    private firebaseApi: FireBaseApi) {
    this.userProfileService.currentUser.subscribe((user: User) => {
      if (!user)  return;
      this.currentUser=user;
      this.firebaseApi.getFirebaseDatabase()
        .ref(`notifications/${user.id.toString()}`)
        .orderByChild('read')
        .equalTo(NotificationReadState.UNREAD)
        .on('value', (snapshot) => this.newNotifications(snapshot.val()))
    
      this.firebaseApi.getFirebaseDatabase()
      .ref(`notifications/${user.id.toString()}`)
      .orderByChild('read')
      .equalTo(NotificationReadState.UNREAD)
        .on('child_removed', (snapshot) => this.removeNotification(snapshot.val()))
    });
  }
  newNotifications(arg0: any) {
    // throw new Error('Method not implemented.');
  }

  removeNotification(msg:Record<string, any>)
  {
    let message:Notification=new Notification();
    message.hydrate(msg);
    let pos= this.listNotifications.findIndex((m:Notification)=>m.id.toString()==message.id.toString())
    if(pos>-1)  this.listNotifications.splice(pos,1);
    this.notifications.next(this.listNotifications);
  }
  marskAskRead(message:Notification):Promise<ActionStatus>
  {
    return this.firebaseApi.updates([
      {
        link:`notifications/${message.to.toString()}/${message.id.toString()}/read`,
        data:NotificationReadState.READ
      }
    ]);
  }
  
  deleteNotification(message:Notification):Promise<ActionStatus>
  {
// console.log("Message ",message)
    return new Promise<ActionStatus>((resolve,reject)=>{
      this.firebaseApi.delete(`notifications/${message.to.toString()}/${message.id.toString()}`)
      .then((result)=>{
        this.removeNotification(message.toString())
        resolve(new ActionStatus())
      })
      .catch((error)=>resolve(new ActionStatus()))
    })
  }

  sendNotification(message: Notification): Promise<ActionStatus> {
// console.log("Message send ",message)
    return this.firebaseApi.set(`notifications/${message.to.toString()}/${message.id.toString()}`, message.toString());
  }
}
