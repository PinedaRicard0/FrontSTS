import { Component, OnInit } from '@angular/core';
import {faUser, faLock, faAt} from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //Icons
  faUser = faUser;
  faLock = faLock;
  faAt = faAt;
  //End icons
  isLogin = true;
  isLoading = false;
  error = null;
  registered = null;


  constructor(private as : AuthService, private router : Router) { }

  ngOnInit() {
  }

  onSubmit(form : NgForm){
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const pass = form.value.password;
    const name = form.value.name;
    // let authObs : Observable<AuthResponseData>;
    let authObs : Observable<any>;
    this.isLoading = true;
    if(!this.isLogin){
      const cPass = form.value.cPassword;
      if(cPass == pass){
        authObs = this.as.singUp(name, email, pass);
      }
      else{
        this.error = 'Password and confirmation must be equals';
        setTimeout(() => {this.error = null;}, 5000);
        this.isLoading = false;
      }
    }
    else{
      authObs = this.as.login(email, pass);
    }
    
    authObs.subscribe(
      resData => {
        this.isLoading = false;
        //When user is signing up
        if (resData == null){
          this.registered = "Sign Up successful";
          setTimeout(() => {
            this.registered = null;
            this.isLogin = true;
          }, 3000);
        }
        //When user is loging in
        else{
          this.router.navigate(['/home']);
        }
      }, errorMessage =>{
        this.error = errorMessage;
        setTimeout(() => {this.error = null;}, 5000);
        this.isLoading = false;
      }
    );

    form.reset();
  }



}
