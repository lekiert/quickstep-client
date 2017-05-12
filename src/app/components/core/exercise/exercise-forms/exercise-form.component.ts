import {Component, Input, Output, EventEmitter, ComponentFactoryResolver, ViewContainerRef} from "@angular/core";
import {Exercise} from "app/exercise";
import {contentHeaders} from "app/common/headers";
import {environment} from "environments/environment";
import {ExerciseService} from "app/services/exercise.service";
import {ExerciseFormService} from "./exercise-form.service";
import {BracketsFormComponent} from "./brackets/brackets-form.component";


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

  exerciseExists:boolean = false;
  storageUrl = environment.API_URL;

  constructor(
    private service: ExerciseService,
    private componentService: ExerciseFormService,

    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef) {}

  ngOnInit(): void {
    if (!this.exercise) {
      this.exercise = this.componentService.makeBlankExercise(
          this.exerciseType, this.testId
      );
    } else {
      this.exerciseExists = true;
    }
    console.log('test');
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
