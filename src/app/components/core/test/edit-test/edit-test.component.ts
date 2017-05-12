import {Component} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {TestService} from "app/services/test.service";
import {UserService} from "app/services/user.service";
import {ExerciseService} from "app/services/exercise.service";
import {Test} from "app/test";
import {User} from "app/user";
import {Exercise} from "app/exercise";

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
  exercises: Exercise[];
  private sub: any;
  delete_confirmation = '';
  selectedExercise:string = '';
  showEditExerciseId:number = null;
  showAddExerciseFlag:boolean = false;

  // messages
  success:string = '';
  updateSuccess:string = '';
  exerciseSuccess:string = '';

  successMessage:string = '';
  errorMessage:string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: TestService,
    private exerciseService: ExerciseService,
    private userService: UserService) {
    this.reload();
  }

  reload():void {
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id'];
      this.getTest(id);
      this.getExercises(id);
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

  getExercises(id): void {
    this.service.getTestRelatedExercises(id).then((exercises) => {
      this.exercises = exercises;
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

  addExerciseToTest(exercise): void {
    this.selectedExercise = '';
    this.exerciseService.create(exercise.testId, exercise).then((result) => {
      let results = result.json();
    });
  }

  deleteExerciseFromTest(exerciseId): void {
    this.exerciseService.delete(exerciseId).then((result) => {
      let results = result.json();
      this.getTest(this.test.id);
      this.getExercises(this.test.id);
    });
  }

  updateExercise(exercise): void {
    this.exerciseService.update(exercise).then((result) => {
      let results = result.json();
      this.getTest(this.test.id);
      this.getExercises(this.test.id);
      this.showEditExerciseId = null;
    });
  }

  showEditExercise(id): void {
    this.showEditExerciseId = id;
  }

  showAddExercise(): void {
    this.showAddExerciseFlag = true;
  }

  hideAddExercise(): void {
    this.showAddExerciseFlag = false;
  }

  handleUpdate(evt): void {
    if (evt === true) {
      this.successMessage = 'Zaktualizowano ćwiczenie';
      this.showEditExerciseId = null;
      this.reload();
    }
  }

  handleCreate(evt): void {
    if (evt === true) {
      this.successMessage = 'Dodano ćwiczenie';
      this.selectedExercise = '';
      this.showAddExerciseFlag = false;
      this.reload();
    }
  }

  cancelForm(): void {
    this.selectedExercise = '';
    this.showEditExerciseId = null;
    this.showAddExerciseFlag = false;
  }
}
