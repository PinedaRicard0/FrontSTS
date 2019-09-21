import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  teamCategorySelected: string = 'Male'
  categories: Category[] = [];
  @ViewChild('teams') teamB: ElementRef;
  constructor(private categoryService: CategoriesService) { }

  ngOnInit() {
    this.categoryService.fetchCategories();
  }

  onTeamCategorySelected(category: string)
  {
    this.teamCategorySelected = category;
  }

  onMenuButtonClick(option: string){
    this.categories = this.categoryService.getCategories();
    this.categoryService.getCategoryById(1);
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
}
