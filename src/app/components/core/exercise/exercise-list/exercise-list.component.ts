import {Component, OnInit} from "@angular/core";
import {ExerciseService} from "app/services/exercise/exercise.service";
import {Exercise} from "app/exercise";

const styles = require('./exercise-list.component.scss');
const template = require('./exercise-list.component.html');

@Component({
  selector: 'exercise-list',
  template: template,
  styles: [ styles ],
})
export class ExerciseListComponent implements OnInit {
  constructor(private service: ExerciseService) {}

  exercises: Exercise[];

  ngOnInit(): void {
    this.service.getExercises().then(exercises => this.exercises = exercises);
  }
}
