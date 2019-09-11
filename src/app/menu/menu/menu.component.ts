import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @ViewChild('teams') teamB: ElementRef;
  @ViewChild('fields') fieldB: ElementRef;
  constructor() { }

  ngOnInit() {
  }

  onMenuButtonClick(option: string){
    if(option == 'teams')
    {
      if(this.teamB.nativeElement.classList.contains('show')){
        this.teamB.nativeElement.classList.remove('show')
      }
      else{
        this.teamB.nativeElement.classList.add('show')
      }
    }
    else if(option == 'fields'){
      if(this.fieldB.nativeElement.classList.contains('show')){
        this.fieldB.nativeElement.classList.remove('show')
      }
      else{
        this.fieldB.nativeElement.classList.add('show')
      }
    }
  }

}
