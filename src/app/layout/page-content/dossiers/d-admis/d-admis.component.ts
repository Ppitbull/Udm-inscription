import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-d-admis',
  templateUrl: './d-admis.component.html',
  styleUrls: ['./d-admis.component.scss']
})
export class DAdmisComponent implements OnInit {
  @ViewChild('largeModal') public largeModal: ModalDirective;

  constructor() { }

  ngOnInit(): void {
  }

}
