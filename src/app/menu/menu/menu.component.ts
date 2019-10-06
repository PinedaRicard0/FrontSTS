import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { Router } from '@angular/router';
import { faUsersCog } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  //Icons
  faTeams = faUsersCog;
  //End icons
  categories: Category[] = [];
  @ViewChild('teams') teamB: ElementRef;
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
  }

  loadTeamsCategory(category: number){
    this.router.navigate(['/teams/' + category]);
  }
}
