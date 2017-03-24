import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {TestService} from "app/services/test.service";
import {Excercise} from "app/excercise";
import {Test} from "app/test";
import {User} from "app/user";
import {environment} from "../../../../environments/environment";

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
  excercises: Excercise[];
  answers: {};
  score: any;
  storageUrl = environment.API_URL;

  constructor(
    private route: ActivatedRoute,
    private service: TestService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id'];

       this.service.getAnswer(this.id).then((answer) => {
         this.answers = answer.data.attributes.answers;
         this.score = (answer.data.attributes.score.score / answer.data.attributes.score.max * 100).toFixed()

         if (answer.included) {
           for (let res of answer.included) {
              if (res.type === 'tests') {
                this.test = new Test(res.id, res.attributes);

                this.service.getTestRelatedExcercises(res.id).then((excercises) => {

                  this.excercises = excercises;
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
