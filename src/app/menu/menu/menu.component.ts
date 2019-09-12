import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  teamCategorySelected: string = 'Male'
  categories: Category[] = [
    new Category('Male', 'Permite únicamente jugar personas del género masculino'),
    new Category('Female', 'Permite únicamente jugar personas del género femenimo'),
    new Category('Mixed', 'Permite jugar personas de cualquier género')
  ];
  @ViewChild('teams') teamB: ElementRef;
  @ViewChild('fields') fieldB: ElementRef;
  constructor() { }

  ngOnInit() {
  }

  onTeamCategorySelected(category: string)
  {
    this.teamCategorySelected = category;
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
