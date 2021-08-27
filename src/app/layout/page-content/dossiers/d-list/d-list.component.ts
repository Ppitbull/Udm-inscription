import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-d-list',
  templateUrl: './d-list.component.html',
  styleUrls: ['./d-list.component.scss']
})
export class DListComponent implements OnInit {
  
  @ViewChild('largeModal') public largeModal: ModalDirective;

  constructor() { }

  ngOnInit(): void {
  }

}
