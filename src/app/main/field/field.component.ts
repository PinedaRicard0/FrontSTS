import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

import {faPlusCircle, faTimes, faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import { Field } from 'src/app/models/field.model';
import { FieldService } from 'src/app/services/fields.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit, OnDestroy {

  //Icons
  faNew = faPlusCircle;
  faClose = faTimes;
  faEdit = faPencilAlt;
  //End icons
  @ViewChild('cb') close: ElementRef<HTMLElement>
  @ViewChild('f') fieldForm: NgForm;
  isEditing: boolean = false;
  fieldList: Field[] = [];
  modalTitle: string = "Add field";
  private fieldsSub : Subscription;
  fieldToEdit : Field;

  constructor(private fs : FieldService) { }

  ngOnInit() {
    this.fs.getFields();
    this.fieldsSub = this.fs.fieldsEmmiter.subscribe(
      fields => {
        this.fieldList = fields;
        if(this.close){
          this.close.nativeElement.click();
        }
      }
    )
  }

  onAddField(){
    this.isEditing = false;
    this.modalTitle = 'Add field'
    this.fieldForm.reset();
  }

  onSubmit(form : NgForm){
    if(!this.isEditing){
      let field = new Field(form.value.fieldName, form.value.fieldAddress, form.value.fieldDecription);
      this.fs.createField(field);
    }
    else{
      this.fieldToEdit.name = form.value.fieldName;
      this.fieldToEdit.address = form.value.fieldAddress;
      this.fieldToEdit.description = (form.value.fieldDecription != null && form.value.fieldDecription != "")
                                        ? form.value.fieldDecription : "";
      this.fs.updateField(this.fieldToEdit);
    }
  }

  onEditField(fieldId : number){
    let tmpField = this.fieldList.filter(f => f.id == fieldId)[0];

    this.fieldToEdit = new Field(tmpField.name,tmpField.address, tmpField.description);
    this.fieldToEdit.id = tmpField.id;

    this.isEditing = true;
    this.modalTitle = "Edit field";
    let des = this.fieldToEdit.description ? this.fieldToEdit.description : "";
    this.fieldForm.setValue({
      fieldName : this.fieldToEdit.name,
      fieldAddress : this.fieldToEdit.address,
      fieldDecription : des
    });
  }

  ngOnDestroy(){
    this.fieldsSub.unsubscribe();
  }

}
