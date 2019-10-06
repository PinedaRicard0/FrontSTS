import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
    private route: ActivatedRoute,
    private router: Router) { }
    

  ngOnInit() {
    this.route.firstChild.params
      .subscribe(
        (params: Params) => {
          this.ts.getTeamsByCategory(parseInt(params['categoryId']))
        }
      );
    this.ts.categoryTeams.subscribe(teams => {
      this.teamCategory = teams;
      //Se redirige la app a los elementos de la categoría del equipo recién creado
      if(this.teamCategory.length > 0)
      {
        this.router.navigate(['/teams/' + this.teamCategory[0].category]);
      }
    }) 
  }

  onEditTeam(id:string){
    this.ts.startedEditingTeam.next(id);
  }

}
