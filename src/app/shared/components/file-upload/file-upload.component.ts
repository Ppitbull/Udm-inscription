import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent 
// implements OnInit 
{
  // fileForm: FormGroup;
  // selectedPdf: any = null;
  // constructor(
  //   private storage: AngularFireStorage,) {

  // }
  // ngOnInit(): void {
  //   this.fileForm = new FormGroup({
  //     pdfUrl: new FormControl('', Validators.required),
  //   });
  // }

  // // tslint:disable-next-line:typedef
  // get formControls() {
  //   return this.fileForm.controls;
  // }

  // onSubmit(event: any, fileForm) {
  //   this.selectedPdf = event.target.files[0];
  //   if (this.fileForm.valid) {
  //     var filePath = `${this.selectedPdf.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
  //     const fileRef = this.storage.ref(filePath);
  //     console.log(filePath);
  //     this.storage.upload(filePath, this.selectedPdf).snapshotChanges().pipe(
  //       finalize(() => {
  //         fileRef.getDownloadURL().subscribe((url) => {
  //           formValue['pdfUrl'] = url;
  //           this.fileForm.value.pdfUrl = url;
  //           console.log('form: ', this.fileForm);
  //           this.save(this.fileForm.value);
  //           console.log('lien pdf: ', formValue.pdfUrl);
  //           this.service.insertImageDetails(formValue);
  //           this.resetForm();
  //         });
  //       })
  //     ).subscribe();
  //   }
  // }
}
