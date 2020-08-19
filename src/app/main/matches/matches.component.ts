import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MatchesService } from 'src/app/services/matches.service';
import { Match } from 'src/app/models/match.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  
  categoryId: string;
  categoryMatches: Match[] = [];
  currentCategory: Category;

  constructor(private Router: ActivatedRoute, private ms: MatchesService, private cs: CategoriesService) { }

  ngOnInit() {
    this.Router.params.subscribe((params: Params) => {
      this.categoryId = params['catId'];
      this.ms.getCategoryMatches(this.categoryId).subscribe(matches => {
        this.categoryMatches = matches;
        //when category changes in the url
        this.currentCategory = this.cs.getCategoryById(this.categoryId);
      });

      this.cs.categories.
        subscribe(categories =>{
          this.currentCategory = this.cs.getCategoryById(this.categoryId);
        });
    })
  }

}
