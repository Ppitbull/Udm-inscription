import { Component } from '@angular/core';
import { LocalStorageService } from './shared/services/localstorage/localstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent 
{
  constructor(private localStorageService:LocalStorageService){}
  title = 'udm-inscription';
}
