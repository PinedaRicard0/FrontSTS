import { Component, OnInit } from '@angular/core';
import { PoolService } from 'src/app/services/pool.service';
import { ActivatedRoute, Params } from '@angular/router';
import {faShieldAlt} from '@fortawesome/free-solid-svg-icons';

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

  constructor(private ps: PoolService, private route: ActivatedRoute) { }

  ngOnInit() {    
    this.route.params.subscribe(
      (params: Params) => {
        this.categoryId = params['catId'];
        this.ps.getCategoryPoolsAndTeamsStatistics(this.categoryId).subscribe(
          (res : any) => {
            this.categoryPools = res;
          }
        );
      });
  }

}
