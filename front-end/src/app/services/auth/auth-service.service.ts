import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, reduce, take, tap } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = new Subject<boolean>();
  cast = this.loggedIn.asObservable();
  user = new BehaviorSubject<User | null>(null);

  private _passowrdConfirmed = new BehaviorSubject<any>('');

  get passwordConfirmed() {
    return this._passowrdConfirmed.asObservable();
  }

  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  error = new Subject<any>();
  castError = this.error.asObservable();

  sendError(err: any) {
    this.error.next(err);
  }

  sendLoggedIn(flag: boolean) {
    this.loggedIn.next(flag);
  }

  isAuth: boolean = false;
  isAdmin: boolean = false;
  setAuthentication(value: boolean) {
    this.isAuth = value;
  }
  getAuthentication(): boolean {
    return this.isAuth;
  }
  setAdmin(value: boolean) {
    this.isAdmin = value;
  }
  getAdmin(): boolean {
    return this.isAdmin;
  }

  caughtError(err: any): Observable<any> {
    // console.log(err);
    this.sendError(err);

    return throwError(err);
  }

  login(username: string, password: string) {
    console.log(username);
    console.log(password)
    return this.http.post(
      environment.apiLink + '/auth/login',
      {
        name: username,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError((err: any) => { return this.caughtError(err); }), tap(resData => {

      console.log(resData)

      if (resData.admin == false) {


        localStorage.setItem("username", resData.user.name);
        this.setAdmin(false);
      }
      else {
        localStorage.setItem("username", "Admin")
        this.setAdmin(true);

      }
      const user = resData.user;
      this.handleAuthentication(user.name, user.id, resData.token, 600, user.admin, user.email);
      // this.handleAuthentication(resData.username,resData.id,resData.token,600,resData.address,this.getAdmin());


    })
    );
  }

  logout() {

    this.user.next(null);
    // console.log("hello");
    console.log(JSON.parse(localStorage.getItem('userData') || '{}'));


    localStorage.removeItem('userData');
    localStorage.removeItem('username');

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    window.location.reload();


  }

  autoLogin() {


    const userData: {
      id: number;
      name: string;
      email: string;
      admin: boolean;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData') || '{}');
    if (!userData) {
      return;
    } else {
      let expiresIn = 600;
      const expirationDate = new Date(new Date().getTime() + expiresIn * 1000 * 6);
      console.log(expirationDate);

      const user = new User(userData.id, userData.name, userData.email, userData.admin, userData._token, expirationDate);
      this.user.next(user);
      // this.autoLogout(expiresIn * 1000);
      localStorage.setItem('userData', JSON.stringify(user));
    }

    const loadedUser = new User(userData.id, userData.name, userData.email, userData.admin, userData._token, new Date(userData._tokenExpirationDate));

    console.log(new Date().getTime());


    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      console.log(expirationDuration);


      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    console.log(expirationDuration / 6000);
    console.log(JSON.parse(localStorage.getItem('userData') || '{}'));
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'username_EXISTS':
        errorMessage = 'This username already exists.';
        break;
      case 'username_NOT_FOUND':
        errorMessage = 'This username does not exists.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }


  public confirmPassword(pass: string) {
    return this.http.post<{ message: string, confirm: boolean }>
      (environment.apiLink + '/auth/confirmPassword', {
        password: pass
      })
      .pipe(
        take(1),
        tap(response => {
          this._passowrdConfirmed.next(response)
        })
      )
  }


  private handleAuthentication(username: string, userId: number, token: string, expiresIn: number, isAdmin: boolean, email: string) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000 * 6);
    console.log(expirationDate);
    const user = new User(userId, username, email, isAdmin, token, expirationDate);
    this.user.next(user);
    console.log(user)
    // this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));


    this.autoLogin();

  }
  private _newUser = new BehaviorSubject<any>({});

  get newUser() {
    return this._newUser.asObservable();
  }

  register(username:string,email:string,password:string,password_confirmation:string){
    return this.http.post<{message:string,user:User}>(environment.apiLink + '/users',{
      name:username,
      email:email,
      password:password,
      password_confirmation:password_confirmation
    }).pipe(
      take(1),
      tap(response=>{
        console.log(response);
        this._newUser.next(response.user);
      })
    )
  }

}
