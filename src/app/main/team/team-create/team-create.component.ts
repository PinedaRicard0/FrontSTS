import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.css']
})
export class TeamCreateComponent implements OnInit {

  public id: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['categoryId'];
    if(this.id == null){
      this.id = "1";
    }
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params["categoryId"]
        }
      );
  }

}
