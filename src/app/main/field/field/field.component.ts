import { Component, OnInit } from '@angular/core';

import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import { Field } from 'src/app/models/field.model';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {

  //Icons
  faNew = faPlusCircle;
  //End icons

  isEditing: boolean = false;
  fieldList: Field[] = [];

  constructor() { }

  ngOnInit() {
  }

  onAddField(){
  }

}
