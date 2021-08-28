import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomFile } from '../../entities/custom-file';
import { pays as paysList, ville as villeList } from '../../utils/constante/location.const';

@Component({
  selector: 'app-infos-perso-inscription',
  templateUrl: './infos-perso-inscription.component.html',
  styleUrls: ['./infos-perso-inscription.component.scss']
})
export class InfosPersoInscriptionComponent implements OnInit {
  paysList=paysList
  villeList=villeList
  selectedImage: CustomFile = new CustomFile();
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
      let file=event.target.files[0];
      this.selectedImage .name = file.name;
      this.selectedImage .lastModified = file.lastModified;
      this.selectedImage .size = file.size;
      this.selectedImage .type = file.type;
      this.selectedImage .data = file;
    } else {
      this.imgSrc = '/assets/img/image_placeholder.jpg';
      this.selectedImage = null;
    }
  }
}
