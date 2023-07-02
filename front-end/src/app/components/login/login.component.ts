import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginMode: boolean = true

  loginForm: FormGroup = new FormGroup({});
  registerForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      name: [null],
      password: [null]
    })

    this.registerForm = this.formBuilder.group({
      name: [null],
      email: [null],
      password: [null],
      password_confirmation: [null]
    });

  }

  login() {
    console.log(this.loginForm.value);
  }

  register() {
    console.log(this.registerForm.value);
  }

  switchMode() {
    this.loginMode = !this.loginMode
  }

}
