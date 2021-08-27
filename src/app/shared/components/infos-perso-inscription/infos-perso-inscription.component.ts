import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { pays as paysList, ville as villeList } from '../../utils/location.const';

@Component({
  selector: 'app-infos-perso-inscription',
  templateUrl: './infos-perso-inscription.component.html',
  styleUrls: ['./infos-perso-inscription.component.scss']
})
export class InfosPersoInscriptionComponent implements OnInit {
  paysList=paysList
  villeList=villeList
  selectedImage: any = null;
  imgSrc: string="/assets/img/image_placeholder.jpg";

  @Input() form:FormGroup;
  waitSubmittedForm=false;
  submitedForm=false;
  constructor(
    private formBuilder:FormBuilder,
    private router:Router
  ) { }

  ngOnInit(): void {
  }
  submitForm()
  {

  }
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = '/assets/img/image_placeholder.jpg';
      this.selectedImage = null;
    }
  }
}
