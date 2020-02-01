import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

    user: string;
    private userSub : Subscription;
    @ViewChild('logout') logout : ElementRef;
    isLogoutActive : boolean = false;

    constructor(private as : AuthService, private renderer: Renderer2){}

    ngOnInit(){
        this.userSub =  this.as.user.subscribe(user => {
            if (user != null) {
                this.user = user.email;
            }
        })
    }

    showHideLogout(){
        if(this.logout){
            if(this.logout.nativeElement.classList.contains('show')){
                this.renderer.removeClass(this.logout.nativeElement, "show");
                this.isLogoutActive = false;
            }
            else{
                this.renderer.addClass(this.logout.nativeElement, "show");
                this.isLogoutActive = true;
            }
        }
    }

    hideLogout(){
        if(this.logout){
            if(this.logout.nativeElement.classList.contains('show')){
                this.renderer.removeClass(this.logout.nativeElement, "show");
                this.isLogoutActive = false;
            }
        }
    }

    onLogout(){
        this.as.logout();
    }

    ngOnDestroy(){
        this.userSub.unsubscribe();
    }
}