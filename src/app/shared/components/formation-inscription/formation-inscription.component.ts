import { Component, OnInit } from '@angular/core';
interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-formation-inscription',
  templateUrl: './formation-inscription.component.html',
  styleUrls: ['./formation-inscription.component.scss']
})
export class FormationInscriptionComponent implements OnInit {
  
  
  constructor() { }

  ngOnInit(): void {
  }

}
