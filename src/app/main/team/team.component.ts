import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TeamsSevice } from 'src/app/services/teams.service';
import { Team } from 'src/app/models/team.model';

import { faPencilAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  //Icons
  faEdit = faPencilAlt;
  faAddUser = faUserPlus;
  // End icons

  teamCategory: Team[] = [];
  categoryId : string;
  currentCategory : Category;

  constructor(private ts: TeamsSevice, private cs : CategoriesService,
    private route: ActivatedRoute, private router : Router) { }
    

  ngOnInit() {
    this.route.firstChild.params
      .subscribe(
        (params: Params) => {
          this.categoryId = params['categoryId'];
          this.ts.getTeamsByCategory(params['categoryId']);
          
        }
      );
    this.ts.categoryTeams.subscribe(teams => {
      this.teamCategory = teams;
      this.currentCategory = this.cs.getCategoryById(this.categoryId);
      this.cs.getPoolsByCategory(Number(this.categoryId));
    });
  }

  onEditTeam(id:string){
    this.ts.startedEditingTeam.next(id);
  }

  onAddUser(teamId : string){
    this.router.navigate(['/team/players/' + teamId]);
  }

}
