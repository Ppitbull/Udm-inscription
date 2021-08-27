import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-d-accept',
  templateUrl: './d-accept.component.html',
  styleUrls: ['./d-accept.component.scss']
})
export class DAcceptComponent implements OnInit {
  @ViewChild('largeModal') public largeModal: ModalDirective;

  constructor() { }

  ngOnInit(): void {
  }

}
