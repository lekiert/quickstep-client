import {Component} from "@angular/core";
import {ExcerciseService} from "../../../services/excercise.service";
import {Excercise} from "../../../excercise";

const styles = require('./excercise-list.component.scss');
const template = require('./excercise-list.component.html');

@Component({
  selector: 'excercise-list',
  template: template,
  styles: [ styles ],
})
export class ExcerciseListComponent {
  constructor(private service: ExcerciseService) {

  }

  excercises: Excercise[];

  getExcercises(): void {
    this.service.getExcercises()
                .then((excercises) => {
                  this.excercises = excercises;
                });
  }

  ngOnInit(): void {
    this.getExcercises();
  }
}
