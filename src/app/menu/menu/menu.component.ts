import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { Router } from '@angular/router';
import { faUsersCog, faFlag, faListOl } from '@fortawesome/free-solid-svg-icons';

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
  //End icons
  categories: Category[] = [];
  @ViewChild('teams') teamB: ElementRef;
  @ViewChild('pools') poolB: ElementRef;
  constructor(private categoryService: CategoriesService, private router: Router) { }

  ngOnInit() {
    this.categoryService.fetchCategories();
    this.categoryService.categories.
          subscribe(categories =>
        this.categories = categories
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
    }
    else if(option == 'pools'){
      if(this.poolB.nativeElement.classList.contains('show')){
        this.poolB.nativeElement.classList.remove('show')
      }
      else{
        this.poolB.nativeElement.classList.add('show')
      }
    }
    else if(option == 'fields'){
      this.router.navigate(['/fields']);
    }
  }

  loadTeamsCategory(category: number){
    this.router.navigate(['/teams/' + category]);
  }

  loadTeamPoolsCategory(category: number){
    this.router.navigate(['/pools/' + category]);
  }
}
