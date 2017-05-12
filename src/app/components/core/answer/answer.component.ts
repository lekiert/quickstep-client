import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {TestService} from "app/services/test.service";
import {Exercise} from "app/exercise";
import {Test} from "app/test";
import {User} from "app/user";
import {environment} from "../../../../environments/environment";
import {AnswerService} from "../../../services/answer.service";

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
         this.score = (answer.data.attributes.score.score / answer.data.attributes.score.max * 100).toFixed()

         if (answer.included) {
           for (let res of answer.included) {
              if (res.type === 'tests') {
                this.test = new Test(res.id, res.attributes);

                this.testService.getTestRelatedExercises(res.id).then((exercises) => {

                  this.exercises = exercises;
                });
              }
              if (res.type === 'users') {
                this.user = new User(res.id, res.attributes);
              }
           }
         }
       });
    });
  }

}
