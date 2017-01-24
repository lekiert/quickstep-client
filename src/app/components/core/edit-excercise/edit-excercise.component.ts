import { Component, OnInit, Input, Output, EventEmitter }  from '@angular/core';
import { AuthHttp }                                from 'angular2-jwt';
import { ExcerciseService }                        from '../../../services/excercise.service';
import { Excercise }                               from '../../../excercise';
import { contentHeaders } from '../../../common/headers';
import { environment } from '../../../../environments/environment';

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
  storageUrl = environment.API_URL;

  constructor(
    private service: ExcerciseService,
    private http: AuthHttp) {}

  ngOnInit(): void {

  }

  updateExcerciseData(excercise) {
    this.updateExcercise.emit(excercise);
  }

  attachFileToExcercise(file) {
    console.log('test');
    return this.http.post(environment.API_URL + 'excercises' + '/' + this.excercise.id + '/relationships/storage-files',
      {
        data: [
          { type: "storage-files", id: file.id }
        ]
      }, { headers: contentHeaders }
    ).toPromise().then((result) => {
      this.updateExcerciseData(this.excercise);
    });
  }

}
