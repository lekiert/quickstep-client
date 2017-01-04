import { Component, OnInit, Input, Output, EventEmitter }  from '@angular/core';
import { AuthHttp }                                from 'angular2-jwt';
import { ExcerciseService }                        from '../../../services/excercise.service';
import { Excercise }                               from '../../../excercise';

import { AddBracketsComponent } from './brackets/add-brackets.component';

const styles = require('./add-excercise.component.scss');
const template = require('./add-excercise.component.html');

@Component({
  selector: 'add-excercise',
  template: template,
  styles: [ styles ],
})
export class AddExcerciseComponent {

  @Input() excerciseType;
  @Output() addExcercise = new EventEmitter();

  excercise = {
    name: '',
    description: '',
  };

  constructor(
    private service: ExcerciseService) {}

  ngOnInit(): void {

  }

  addExcerciseToTest(excercise) {
    this.addExcercise.emit(excercise);
  }

}
