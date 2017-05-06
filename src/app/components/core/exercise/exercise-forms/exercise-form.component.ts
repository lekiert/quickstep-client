import {Component, Input, Output, EventEmitter} from "@angular/core";
import {AuthHttp} from "angular2-jwt";
import {Exercise} from "app/exercise";
import {contentHeaders} from "app/common/headers";
import {environment} from "environments/environment";
import {ExerciseService} from "app/services/exercise.service";

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
    private http: AuthHttp) {}

  ngOnInit(): void {
    if (!this.exercise) {
      this.exercise = new Exercise(null, {
        // attributes: {
        //   'exercise-type': this.exerciseType,
        //   data: {},
        //   answers: {},
        //   attachments: []
        // }
      });
      this.exercise.testId = this.testId;
      this.exercise.name = '';
      this.exercise.command = '';
      this.exercise.code = '';
      this.exercise.type = this.exerciseType;
      this.exercise.data = {};
      this.exercise.answers = {};
      this.exercise.attachments = [];

    } else {
      this.exerciseExists = true;
    }
  }

  cancel(): void {
    this.cancelForm.emit(true);
  }

  updateExerciseData(): void {
    this.service.updateExercise(this.exercise).then((result) => {
      let results = result.json();
      this.exerciseUpdated.emit(true);
    });
  }

  // TODO: move request to a service
  attachFileToExercise(file) {
    return this.http.post(environment.API_URL + 'exercises' + '/' + this.exercise.id + '/relationships/storage-files',
      {
        data: [
          { type: "storage-files", id: file.id }
        ]
      }, { headers: contentHeaders }
    ).toPromise().then((result) => {
      this.updateExerciseData();
    });
  }

  deleteAttachmentFromExercise(id) {
    return this.http.delete(environment.API_URL + 'storage-files/' + id, { headers: contentHeaders }
    ).toPromise().then((result) => {
      this.updateExerciseData();
    });
  }

  createExercise(): void {
    this.service.createTestExercise(this.testId, this.exercise).then((result) => {
      let results = result.json();
      this.exerciseCreated.emit(true);
    });
  }

}
