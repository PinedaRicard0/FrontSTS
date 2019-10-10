import { Component, OnInit} from '@angular/core';
import {faPlusCircle, faPencilAlt, faLongArrowAltRight} from '@fortawesome/free-solid-svg-icons';
import { Player } from 'src/app/models/player.model';
import { PlayerService } from 'src/app/services/player.service';
import { ActivatedRoute } from '@angular/router';
import { TeamsSevice } from 'src/app/services/teams.service';
@Component({
  selector: 'app-team-players',
  templateUrl: './team-players.component.html',
  styleUrls: ['./team-players.component.css']
})
export class TeamPlayersComponent implements OnInit {

  //Icon
  faNew = faPlusCircle;
  faEdit = faPencilAlt;
  faGreaterThan = faLongArrowAltRight;
  //End icons

  playerList : Player[] = [];
  teamId: string;

  constructor(private ps: PlayerService, private route: ActivatedRoute) { }

  ngOnInit() {
    //this.teamId = this.route.snapshot.params['teamId'];
    this.route.params.subscribe(params => {
        this.teamId = params['teamId'];
      })
    this.ps.getPlayerByTeam(this.teamId).subscribe(
      players =>{
        this.playerList = players;
      }
    )
  }

}
