import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/shared/services/notification/notification.service';

@Component({
  selector: 'app-guest-welcome',
  templateUrl: './guest-welcome.component.html',
  styleUrls: ['./guest-welcome.component.scss']
})
export class GuestWelcomeComponent implements OnInit {

  constructor(private note: NotificationsService) { }

  ngOnInit(): void {
  }

  showNotification(){
    this.note.showNotification('success', 'teste de message', 5000);
  }

}
