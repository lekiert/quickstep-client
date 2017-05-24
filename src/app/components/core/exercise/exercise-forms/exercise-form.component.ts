import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Exercise} from "app/exercise";
import {ExerciseService} from "app/services/exercise/exercise.service";
import {ExerciseFormService} from "./exercise-form.service";


const styles = require('./exercise-form.component.scss');
const template = require('./exercise-form.component.html');

@Component({
  selector: 'exercise-form',
  template: template,
  styles: [ styles ],
})
export class ExerciseFormComponent {

  @Input() exercise: Exercise;
  @Input() exerciseType;
  @Input() testId;
  @Output() exerciseUpdated = new EventEmitter();
  @Output() exerciseCreated = new EventEmitter();
  @Output() cancelForm = new EventEmitter();

  constructor(
    private service: ExerciseService,
    private componentService: ExerciseFormService) {}

  ngOnInit(): void {
    if (!this.exercise) {
      this.exercise = this.componentService.makeBlankExercise(
          this.exerciseType, this.testId
      );
    }
  }

  cancel(): void {
    this.cancelForm.emit(true);
  }

  attachFileToExercise(file): void {
    if (!this.exercise.id) return;

    this.componentService.attachFile(file, this.exercise.id).then(() => {
      this.updateExercise();
    });
  }

  deleteAttachmentFromExercise(id): void {
    this.componentService.deleteFile(+id).then(() => {
      this.updateExercise();
    });;
  }

  createExercise(): void {
    this.service.create(this.testId, this.exercise).then(() => {
      this.exerciseCreated.emit(true);
    });
  }

  updateExercise(): void {
    this.service.update(this.exercise).then(() => {
      this.exerciseUpdated.emit(true);
    });
  }
}
