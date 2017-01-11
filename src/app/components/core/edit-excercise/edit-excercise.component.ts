import { Component, OnInit, Input, Output, EventEmitter }  from '@angular/core';
import { AuthHttp }                                from 'angular2-jwt';
import { ExcerciseService }                        from '../../../services/excercise.service';
import { Excercise }                               from '../../../excercise';

import { EditBracketsComponent } from './brackets/edit-brackets.component';
import { EditChoiceComponent } from './choice/edit-choice.component';

const styles = require('./edit-excercise.component.scss');
const template = require('./edit-excercise.component.html');

@Component({
  selector: 'edit-excercise',
  template: template,
  styles: [ styles ],
})
export class EditExcerciseComponent {

  @Input() excercise: Excercise;
  @Output() updateExcercise = new EventEmitter();


  constructor(
    private service: ExcerciseService) {}

  ngOnInit(): void {

  }

  updateExcerciseData(excercise) {
    this.updateExcercise.emit(excercise);
  }

}
