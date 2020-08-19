import { Component, OnInit, Input } from '@angular/core';
import { Match } from 'src/app/models/match.model';
import { faFlag, faListOl, faClock, faPencilAlt, faPlayCircle, faSave, faBan} from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-match-card',
  templateUrl: './match-card.component.html',
  styleUrls: ['./match-card.component.css']
})
export class MatchCardComponent implements OnInit {

  //Icons
  faDate = faClock;
  faField = faFlag;
  faPool = faListOl;
  faEdit = faPencilAlt;
  faPlay = faPlayCircle;
  faSave = faSave;
  faCancel = faBan;
  //End icons
  @Input() match: Match;
  isEditing: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  OnEdit(){
    this.isEditing = true;
  }

  onSubmit(form : NgForm){
    debugger;
    let x = 33;
  }

}
