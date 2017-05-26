import {environment} from "../../../../environments/environment";
import {animate, Component, state, style, transition, trigger} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {TestService} from "app/services/test/test.service";
import {UserService} from "../../../services/user/user.service";
import {Test} from "app/test";
import {User} from "app/user";
import {Exercise} from "app/exercise";
import {AuthService} from "../../../services/auth/auth.service";

const styles = require('./test.component.scss');
const template = require('./test.component.html');

@Component({
  selector: 'test',
  template: template,
  styles: [ styles ]
})
export class TestComponent {

  storageUrl = environment.API_URL;
  id: number;
  error: string = '';
  test: Test;
  user: User;
  exercises: Exercise[];
  results = [];
  answers = {};

  private sub: any;
  private hasResults:boolean = false;
  private score:string = '0';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private service: TestService) {
      this.authService.getAuthenticatedUser().then(user => this.user = user);
    }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id'];

       this.service.getTest(this.id).then((test) => {
         this.test = test;
       });

       this.service.getTestRelatedExercises(this.id).then((exercises) => {
         this.exercises = exercises;
         for (let exercise of this.exercises) {
           this.answers[exercise.id] = {};
         }
       });
    });
  }

  submitAnswers() {
    this.service.submitAnswers(this.id, this.user.id, this.answers).then(results => {
      let data = results.json().data.attributes;
      this.score = (+data.score.score / +data.score.max * 100).toFixed();

      this.setExerciseResults(data.results);
    }).catch(error => {
      this.error = "Przekroczyłeś/aś limit 2 rozwiązań jednego testu.";
    });
  }

  setExerciseResults(results): void {
    for (let i in results) {
      for (let j in this.exercises) {
        if (+i === +this.exercises[j].id) {
          let _results = {}
          Object.keys(results[i]).forEach((r) => {
            _results[r] = results[i][r].results
          });
          this.exercises[j].checkResults = _results;
        }
      }
    }

    this.hasResults = true;
  }

  closeModal(): void {
    let modal = document.getElementById('result-modal');
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    modal.style.opacity = '0';
    setTimeout(() => {
      modal.style.display = 'none';
    }, 600)
  }
}
