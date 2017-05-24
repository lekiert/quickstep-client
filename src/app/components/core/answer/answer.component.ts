import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {TestService} from "app/services/test/test.service";
import {Exercise} from "app/exercise";
import {Test} from "app/test";
import {User} from "app/user";
import {environment} from "../../../../environments/environment";
import {AnswerService} from "../../../services/answer/answer.service";

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {

  sub: any;
  id: any;
  test: Test;
  user: User;
  exercises: Exercise[];
  answers: {};
  score: any;
  storageUrl = environment.API_URL;

  constructor(
    private route: ActivatedRoute,
    private answerService: AnswerService,
    private testService: TestService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id'];

       this.answerService.getAnswer(this.id).then((answer) => {
         this.answers = answer.data.attributes.answers;
         this.score = (answer.score * 100).toFixed();

         if (answer.test) {
             this.test = answer.test;
             this.testService.getTestRelatedExercises(this.test.id).then((exercises) => {
                 this.exercises = exercises;
                 this.test.exercises = exercises;
             });
         }

         if (answer.user) {
             this.user = answer.user;
         }
       });
    });
  }

}
