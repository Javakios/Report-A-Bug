import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth-service.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginMode: boolean = true

  loginForm: FormGroup = new FormGroup({});
  registerForm: FormGroup = new FormGroup({});

  newUserSubscription!: Subscription;
  registerSubscription!: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
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

    this.newUserSubscription = this.authService.newUser.subscribe((newUser) => {
      if (newUser) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User created successfully' });
      }
    })

  }

  login() {
    console.log(this.loginForm.value);

    let username = this.loginForm.value.name;
    let password = this.loginForm.value.password;

    let authObs: Observable<any> = this.authService.login(username, password);
    authObs.subscribe(response => {
      this.router.navigate(['home']);
    });
  }

  register() {
    console.log(this.registerForm.value);
    let username = this.registerForm.value.name;
    let email = this.registerForm.value.email;
    let password = this.registerForm.value.password;
    let password_confirmation = this.registerForm.value.password_confirmation;

    this.registerSubscription = this.authService.register(username, email, password, password_confirmation).subscribe();

  }

  switchMode() {
    this.loginMode = !this.loginMode
  }

  ngOnDestroy(): void {
    if (this.newUserSubscription) {
      this.newUserSubscription.unsubscribe();
    }
    if (this.registerSubscription) {
      this.registerSubscription.unsubscribe();
    }
  }

}
