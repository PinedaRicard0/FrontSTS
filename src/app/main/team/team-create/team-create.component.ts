import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Team } from 'src/app/models/team.model';
import { TeamsSevice } from 'src/app/services/teams.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category.model';
import { Pool } from 'src/app/models/pool.model';

@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.css']
})
export class TeamCreateComponent implements OnInit, OnDestroy {

  public categoryId: string;
  public categories: Category[] = [];
  poolsCategory: Pool[] = [];
  teamEditSubs : Subscription;
  public isEditing : boolean = false;
  teamToEdit : Team;
  @ViewChild('f') teamForm : NgForm;

  constructor(private route: ActivatedRoute, private teamService: TeamsSevice,
              private cs: CategoriesService) { }

  ngOnInit() {
    //Se obtiene todas las categorías de la BD y se almacenan en categories
    this.cs.fetchCategories();
    this.cs.categories.subscribe(categories => {
      this.categories = categories;
      //Se obtiene el parámetro de navegación de URL
      this.categoryId = this.route.snapshot.params['categoryId'];
      if (this.categoryId == null) {
        this.categoryId = "1";
      }
      this.route.params
        .subscribe(
          (params: Params) => {
            this.categoryId = params["categoryId"]
          }
        );
    }
    )

    this.cs.categoryPools.subscribe(pools => {
      this.poolsCategory = pools;
    })
    
    //Cuando se selecciona editar un equipo se dispara el subject startedEditingTeam
    this.teamEditSubs =  this.teamService.startedEditingTeam
        .subscribe(
          (editItemId: string) => {
            this.teamService.getTeamById(editItemId)
              .subscribe(
                (team: Team) => {
                  const stringCategory = team.category.toString();
                  this.isEditing = true;
                  this.teamToEdit = team;
                  this.teamToEdit.category = stringCategory;
                  let pp = this.poolsCategory.filter(pc =>pc.id == team.poolId);
                  this.teamForm.setValue({
                    teamName: this.teamToEdit.name,
                    teamPool: pp[0].id,
                    category: stringCategory
                  })
                }
              );
          }
        );
  }

  onSubmit(form: NgForm) {
    if(!this.isEditing){
      let team = new Team(1, form.value.teamName, form.value.category, Number(form.value.teamPool));
      this.teamService.createTeam(team);
    }
    else{
      this.teamToEdit.category = form.value.category;
      this.teamToEdit.name = form.value.teamName;
      this.teamToEdit.poolId = Number(form.value.teamPool);
      this.teamService.updateTeam(this.teamToEdit)
        .subscribe(resp => {
          if(resp == "updated"){
            this.teamService.getTeamsByCategory(this.categoryId)
          }
        });
      this.isEditing = false;
    }
    form.reset();
  }

  onCancelEdit(){
    this.isEditing = false;
    this.teamForm.reset();
  }

  onCategoryChanged(id: number){
    this.cs.getPoolsByCategory(id);
  }

  ngOnDestroy(){
    this.teamEditSubs.unsubscribe();
  }

}
