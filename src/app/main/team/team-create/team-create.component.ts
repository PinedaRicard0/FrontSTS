import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Team } from 'src/app/models/team.model';
import { TeamsSevice } from 'src/app/services/teams.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.css']
})
export class TeamCreateComponent implements OnInit {

  public categoryId: string;
  public categories: Category[] = [];

  constructor(private route: ActivatedRoute, private teamService: TeamsSevice, private cs: CategoriesService) { }

  ngOnInit() {
    this.cs.fetchCategories();
    this.categories = this.cs.getCategories();
    this.categoryId = this.route.snapshot.params['categoryId'];
    if(this.categoryId == null){
      this.categoryId = "1";
    }
    this.route.params
      .subscribe(
        (params: Params) => {
          this.categoryId = params["categoryId"]
        }
      );
  }

  onSubmit(form: NgForm){
    let team = new Team(1,form.value.teamName,parseInt(this.categoryId),form.value.teamPool);
    this.teamService.createTeam(team);
    form.reset();
  }

}
