import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  constructor(private as: AuthService){}

  private userSub: Subscription;

  title = 'FrontSTS';
  userLogin : boolean = false;

  ngOnInit(){
    this.userSub = this.as.user.subscribe(user => {
      this.userLogin = !!user;
    });
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
