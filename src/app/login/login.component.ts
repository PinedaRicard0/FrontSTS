import { Component, OnInit } from '@angular/core';
import {faUser, faLock} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //Icons
  faUser = faUser;
  faLock = faLock;
  //End icons
  constructor() { }

  ngOnInit() {
  }

}
