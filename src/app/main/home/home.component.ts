import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category.model';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories : Category[] = [];

  constructor(private cs: CategoriesService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.cs.categories.subscribe(
      categories => {
        this.categories = categories;
        this.categories.forEach(
          c => {
            if(c.status == null || c.status == 'created'){
              this.cs.canStartCategory(c.id.toString())
              .subscribe(
                res => {
                  c.canStart = res;
                }
              )
            }
          });
      }
    );
  }

  public InitCategory(categoryId: string){
    //Validating that category exist and can be started
    var cat = this.categories.filter(c => c.canStart && c.id == Number(categoryId))[0];
    if(cat){
      this.cs.InitiateCategorie(categoryId).subscribe(
        r => {
          this.cs.updateStartedCategory(categoryId);
          this.alertify.success(`The ${cat.name} category started succesfully, now matches are available!`)
      },
      (error) => {
        this.alertify.error("Unexpected problem occurs, the category couldn't be started")
      }
      )
    }
  }
}
