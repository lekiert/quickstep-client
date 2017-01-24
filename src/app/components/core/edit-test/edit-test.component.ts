import { Component, OnInit }                       from '@angular/core';
import { Router, ActivatedRoute }                  from '@angular/router';
import { AuthHttp }                                from 'angular2-jwt';
import { SearchFieldComponent }                    from '../../util/search-field/search-field.component';
import { TestService }                             from '../../../services/test.service';
import { UserService }                             from '../../../services/user.service';
import { ExcerciseService }                        from '../../../services/excercise.service';
import { Test }                                    from '../../../test';
import { User }                                    from '../../../user';
import { Excercise }                               from '../../../excercise';
import { AddExcerciseComponent }                   from '../add-excercise/add-excercise.component';
import { ExcerciseFormComponent }                   from '../forms/excercise-form.component';

const styles = require('./edit-test.component.scss');
const template = require('./edit-test.component.html');

@Component({
  selector: 'edit-test',
  template: template,
  styles: [ styles ]
})
export class EditTestComponent {
  test: Test;
  user: User;
  excercises: Excercise[];
  private sub: any;
  delete_confirmation = '';
  selectedExcercise:string = '';
  showEditExcerciseId:number = null;
  showAddExcerciseFlag:boolean = false;

  // messages
  success:string = '';
  updateSuccess:string = '';
  excerciseSuccess:string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: TestService,
    private excerciseService: ExcerciseService,
    private userService: UserService) {
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id'];
      this.getTest(id);
      this.getExcercises(id);
    });
  }

  types = [
    { name: 'Rodzaj ćwiczenia', value: '' },
    { name: 'Luki', value: 'BRACKETS' },
    { name: 'Wybór', value: 'CHOICE' },
  ];

  getTest(id): void {
    this.service.getTest(id).then((test) => {
      this.test = test;
    });
  }

  getExcercises(id): void {
    this.service.getTestRelatedExcercises(id).then((excercises) => {
      this.excercises = excercises;
    });
  }

  updateTest(): void {
    this.service.updateTest(this.test).then(() => {
      this.updateSuccess = 'Zaktualizowano dane testu';
    });
  }

  deleteTest(): void {
    this.service.deleteTest(this.test.id).then(() => {
      this.router.navigate(['/tests']);
    });
  }

  addExcerciseToTest(excercise): void {
    this.selectedExcercise = '';
    this.excerciseService.createTestExcercise(excercise.testId, excercise).then((result) => {
      let results = result.json();
    });
  }

  deleteExcerciseFromTest(excerciseId): void {
    this.excerciseService.deleteExcercise(excerciseId).then((result) => {
      let results = result.json();
      this.getTest(this.test.id);
      this.getExcercises(this.test.id);
    });
  }

  updateExcercise(excercise): void {
    this.excerciseService.updateExcercise(excercise).then((result) => {
      let results = result.json();
      this.getTest(this.test.id);
      this.getExcercises(this.test.id);
      this.showEditExcerciseId = null;
    });
  }

  showEditExcercise(id): void {
    this.showEditExcerciseId = id;
  }

  showAddExcercise(): void {
    this.showAddExcerciseFlag = true;
  }

  hideAddExcercise(): void {
    this.showAddExcerciseFlag = false;
  }

  cancelForm(): void {
    this.selectedExcercise = '';
    this.showEditExcerciseId = null;
    this.showAddExcerciseFlag = false;
  }
}
