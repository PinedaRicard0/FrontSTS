import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { Router } from '@angular/router';
import { faUsersCog, faFlag, faListOl, faHandshake } from '@fortawesome/free-solid-svg-icons';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  //Icons
  faTeams = faUsersCog;
  faField = faFlag;
  faPool = faListOl;
  faMatches = faHandshake;
  //End icons
  categories: Category[] = [];
  startedCategories: Category[] = [];
  @ViewChild('teams') teamB: ElementRef;
  @ViewChild('pools') poolB: ElementRef;
  @ViewChild('matches') matchesB: ElementRef;
  constructor(private categoryService: CategoriesService, private router: Router,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.categoryService.fetchCategories();
    this.categoryService.categories.
          subscribe(categories =>{
              this.categories = categories
              this.startedCategories = this.categories.filter(c => c.status != null && c.status == 'started');
          }
        );
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
      this.closeUnselectedItems(option);
    }
    else if(option == 'pools'){
      if(this.poolB.nativeElement.classList.contains('show')){
        this.poolB.nativeElement.classList.remove('show')
      }
      else{
        this.poolB.nativeElement.classList.add('show')
      }
      this.closeUnselectedItems(option);
    }
    else if(option == 'matches'){
      if(this.startedCategories.length > 0){
        if(this.matchesB.nativeElement.classList.contains('show')){
            this.matchesB.nativeElement.classList.remove('show')
          }
        else{
          this.matchesB.nativeElement.classList.add('show')
        }
        this.closeUnselectedItems(option);
      }
      else{
        this.alertify.error("Not matches available, firts you need to start at least one category")
      }
    }
    else if(option == 'fields'){
      this.closeUnselectedItems(option);
      this.router.navigate(['/fields']);
    }
  }

  loadTeamsCategory(category: number){
    this.router.navigate([`/teams/${category}`]);
  }

  loadTeamPoolsCategory(category: number){
    this.router.navigate([`/pools/${category}`]);
  }

  loadCategoryMatches(category: number){
    this.router.navigate([`/matches/${category}`])
  }

  closeUnselectedItems(selectedMenu: string){
    switch(selectedMenu){
      case 'fields':{
        this.teamB.nativeElement.classList.remove('show')
        this.poolB.nativeElement.classList.remove('show');
        this.matchesB.nativeElement.classList.remove('show');
        break;
      }
      case 'pools':{
        this.teamB.nativeElement.classList.remove('show');
        this.matchesB.nativeElement.classList.remove('show');
        break;
      }
      case 'teams':{
        this.poolB.nativeElement.classList.remove('show');
        this.matchesB.nativeElement.classList.remove('show');
        break;
      }
      case 'matches':{
        this.poolB.nativeElement.classList.remove('show');
        this.teamB.nativeElement.classList.remove('show');
        break;
      }
    }
  }

}
