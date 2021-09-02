import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/auth/login.service';
import { NotificationsService } from 'src/app/shared/services/notification/notification.service';
import { ActionStatus } from 'src/app/shared/utils/services/firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  submitedForm: boolean = false;
  waitResponse: boolean = false;
  color: string = '';
  responseText = '';
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private note: NotificationsService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  login() {
    this.submitedForm = true;
    if (this.form.invalid) return
    this.waitResponse = true;
    this.color = 'blue'
    this.responseText = 'Veuillez patientez...'
    this.loginService.loginUser(this.form.value.email, this.form.value.password)
      .then((result: ActionStatus) => {
        this.waitResponse = false;
        this.color = 'green';
        this.responseText = 'Authentification réussi. Redirection vers l\'espace membre...';
        // this.note.showNotification('success', 'Bienvenu');
        this.router.navigateByUrl('/user/dashboard')

      })
      .catch((error: ActionStatus) => {
        this.color = 'red';
        this.responseText = error.message;
        this.waitResponse = false;
      })
  }

}
