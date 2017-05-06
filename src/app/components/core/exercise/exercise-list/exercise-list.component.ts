import {Component} from "@angular/core";
import {ExerciseService} from "app/services/exercise.service";
import {Exercise} from "app/exercise";

const styles = require('./exercise-list.component.scss');
const template = require('./exercise-list.component.html');

@Component({
  selector: 'exercise-list',
  template: template,
  styles: [ styles ],
})
export class ExerciseListComponent {
  constructor(private service: ExerciseService) {

  }

  exercises: Exercise[];

  getExercises(): void {
    this.service.getExercises()
                .then((exercises) => {
                  this.exercises = exercises;
                });
  }

  ngOnInit(): void {
    this.getExercises();
  }
}
