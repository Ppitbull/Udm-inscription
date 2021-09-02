import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { listFiliere } from '../../utils/constante/formation.const';
import { formations } from '../../utils/formation.const';

@Component({
  selector: 'app-left-formation-list',
  templateUrl: './left-formation-list.component.html',
  styleUrls: ['./left-formation-list.component.scss']
})
export class LeftFormationListComponent implements OnInit {
  @Output() selectedFiliere:EventEmitter<{etab:string,faculte:string,filiere:string}>=new EventEmitter();

  constructor(
    private host:ElementRef
  ) { }
  mapListFormation=listFiliere

  ngOnInit(): void {
  }
  clickForFiliere(e,etab,faculte,filiere)
  {
    this.host.nativeElement.querySelectorAll('a.active').forEach(element => {
      element.classList.remove('active')
    });
    e.currentTarget.classList.add('active')
    this.selectedFiliere.emit({
      etab,
      filiere:filiere.filiere,
      faculte
    })
  }

}
