import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {faPlusCircle, faPencilAlt, faLongArrowAltRight, faTimes} from '@fortawesome/free-solid-svg-icons';
import { Player } from 'src/app/models/player.model';
import { PlayerService } from 'src/app/services/player.service';
import { NgForm } from '@angular/forms';

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
  faX = faTimes;
  //End icons
  @ViewChild('cb') close: ElementRef<HTMLElement>
  @ViewChild('ap') add: ElementRef<HTMLElement>
  @ViewChild('f') playerForm: NgForm;
  playerList : Player[] = [];
  teamId: string;
  display: string = 'none';
  isEditing :boolean = false;
  modalTitle: string = 'New Player'
  playerToEdit: Player;

  constructor(private ps: PlayerService, private route: ActivatedRoute) { }

  ngOnInit() {
    //this.teamId = this.route.snapshot.params['teamId'];
    this.route.params.subscribe(params => {
        this.teamId = params['teamId'];
      })
      this.loadPlayers();
  }

  onSubmit(form: NgForm){
    if(!this.isEditing){
      let player = new Player(form.value.playerName, this.teamId, form.value.playerNickname);
      this.ps.createPlayer(player)
        .subscribe(
          res => {
            form.reset();
            this.loadPlayers();
            this.close.nativeElement.click();
          }
      );
    }
    else{
      let player = new Player(form.value.playerName, this.teamId, form.value.playerNickname);
      player.firebaseId = this.playerToEdit.firebaseId;
      this.ps.updatePlayer(player)
        .subscribe(
          rPlayer => {
            form.reset();
            this.loadPlayers();
            this.close.nativeElement.click();
          }
        );
    }
  }

  onAddPlayer(){
    this.isEditing = false;
    this.modalTitle = 'New Player'
    this.playerForm.reset();
  }

  onEditPlayer(id: string){
    this.playerToEdit = this.ps.getMemPlayerById(id);
    this.isEditing = true;
    this.modalTitle = 'Edit Player'
    let nn = this.playerToEdit.nickName ?  this.playerToEdit.nickName : "";
    this.playerForm.setValue({
      playerName: this.playerToEdit.name,
      playerNickname: nn
    })
  }

  loadPlayers(){
    this.ps.getPlayerByTeam(this.teamId).subscribe(
      players =>{
        this.playerList = players;
        this.ps.players = players;
      }
    );
  }
}
