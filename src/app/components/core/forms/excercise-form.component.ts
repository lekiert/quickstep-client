import {Component, Input, Output, EventEmitter} from "@angular/core";
import {AuthHttp} from "angular2-jwt";
import {Excercise} from "app/excercise";
import {contentHeaders} from "app/common/headers";
import {environment} from "environments/environment";
import {ExcerciseService} from "app/services/excercise.service";

const styles = require('./excercise-form.component.scss');
const template = require('./excercise-form.component.html');

@Component({
  selector: 'excercise-form',
  template: template,
  styles: [ styles ],
})
export class ExcerciseFormComponent {

  @Input() excercise: Excercise;
  @Input() excerciseType;
  @Input() testId;
  @Output() excerciseUpdated = new EventEmitter();
  @Output() excerciseCreated = new EventEmitter();
  @Output() cancelForm = new EventEmitter();

  excerciseExists:boolean = false;
  storageUrl = environment.API_URL;

  constructor(
    private service: ExcerciseService,
    private http: AuthHttp) {}

  ngOnInit(): void {
    if (!this.excercise) {
      this.excercise = new Excercise(null, {
        // attributes: {
        //   'excercise-type': this.excerciseType,
        //   data: {},
        //   answers: {},
        //   attachments: []
        // }
      });
      this.excercise.testId = this.testId;
      this.excercise.name = '';
      this.excercise.command = '';
      this.excercise.code = '';
      this.excercise.type = this.excerciseType;
      this.excercise.data = {};
      this.excercise.answers = {};
      this.excercise.attachments = [];

    } else {
      this.excerciseExists = true;
    }
  }

  cancel(): void {
    this.cancelForm.emit(true);
  }

  updateExcerciseData(): void {
    this.service.updateExcercise(this.excercise).then((result) => {
      let results = result.json();
      this.excerciseUpdated.emit(true);
    });
  }

  // TODO: move request to a service
  attachFileToExcercise(file) {
    return this.http.post(environment.API_URL + 'excercises' + '/' + this.excercise.id + '/relationships/storage-files',
      {
        data: [
          { type: "storage-files", id: file.id }
        ]
      }, { headers: contentHeaders }
    ).toPromise().then((result) => {
      this.updateExcerciseData();
    });
  }

  deleteAttachmentFromExcercise(id) {
    return this.http.delete(environment.API_URL + 'storage-files/' + id, { headers: contentHeaders }
    ).toPromise().then((result) => {
      this.updateExcerciseData();
    });
  }

  createExcercise(): void {
    this.service.createTestExcercise(this.testId, this.excercise).then((result) => {
      let results = result.json();
      this.excerciseCreated.emit(true);
    });
  }

}
