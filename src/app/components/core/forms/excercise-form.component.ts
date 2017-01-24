import { Component, OnInit, Input, Output, EventEmitter }  from '@angular/core';
import { AuthHttp }                                from 'angular2-jwt';
import { Excercise }                               from '../../../excercise';
import { contentHeaders } from '../../../common/headers';
import { environment } from '../../../../environments/environment';
import { ExcerciseService }                        from '../../../services/excercise.service';

import { BracketsFormComponent } from './brackets/brackets-form.component';
import { ChoiceFormComponent } from './choice/choice-form.component';

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
  storageUrl = environment.API_URL;

  constructor(
    private service: ExcerciseService,
    private http: AuthHttp) {
      console.log(this.excercise);
      if (!this.excercise) {
        this.excercise = new Excercise(null, {
          attributes: {
            type: this.excerciseType ,
            data: {},
            answers: {},
            attachments: []
          }
        });
      }
  }

  cancel(): void {
    this.cancelForm.emit(true);
  }

  updateExcerciseData(): void {
    this.service.updateExcercise(this.excercise).then((result) => {
      let results = result.json();
    });
  }

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

  createExcercise(): void {
    this.service.createTestExcercise(this.testId, this.excercise).then((result) => {
      let results = result.json();
    });
  }

}
