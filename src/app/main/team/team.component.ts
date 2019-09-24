import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TeamsSevice } from 'src/app/services/teams.service';
import { Team } from 'src/app/models/team.model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  teamCategory: Team[] = [];

  constructor(private ts: TeamsSevice,
    private route: ActivatedRoute) { }

  ngOnInit() {
    //this.ts.getTeamsByCategory(parseInt(this.route.firstChild.snapshot.params['categoryId']));
    this.route.firstChild.params
      .subscribe(
        (params: Params) => {
          this.ts.getTeamsByCategory(parseInt(params['categoryId']))
        }
      );
    this.ts.categoryTeams.subscribe(teams => 
      this.teamCategory = teams)
  }

}
