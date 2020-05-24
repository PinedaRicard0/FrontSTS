import { Component, OnInit } from '@angular/core';
import { PoolService } from 'src/app/services/pool.service';
import { ActivatedRoute, Params } from '@angular/router';
import {faShieldAlt} from '@fortawesome/free-solid-svg-icons';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-pool',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.css']
})
export class PoolComponent implements OnInit {

  //Icons
  faTeam = faShieldAlt;
  categoryId : string;
  categoryPools: any;
  currentCategory: Category;

  constructor(private cs: CategoriesService, private ps: PoolService, private route: ActivatedRoute) { }

  ngOnInit() {    
    this.route.params.subscribe(
      (params: Params) => {
        this.categoryId = params['catId'];
        this.ps.getCategoryPoolsAndTeamsStatistics(this.categoryId).subscribe(
          (res : any) => {
            this.categoryPools = res;
          }
        );
        //when category changes in the url
        this.currentCategory = this.cs.getCategoryById(this.categoryId);
      });
      //When categories are load at the bigining
      this.cs.categories.
        subscribe(categories =>{
          this.currentCategory = this.cs.getCategoryById(this.categoryId);
        });
  }

}
