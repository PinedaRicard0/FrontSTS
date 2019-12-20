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

    constructor(private as : AuthService, private renderer: Renderer2){}

    ngOnInit(){
        this.userSub =  this.as.user.subscribe(user => {
            this.user = user.email;
        })
    }

    showHideLogout(){
        if(this.logout){
            if(this.logout.nativeElement.classList.contains('show')){
                this.renderer.removeClass(this.logout.nativeElement, "show");
            }
            else{
                this.renderer.addClass(this.logout.nativeElement, "show");
            }
        }
    }

    ngOnDestroy(){
        this.userSub.unsubscribe();
    }
}