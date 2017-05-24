import {Component} from "@angular/core";
import {User} from "app/user";
import {UserService} from "app/services/user/user.service";
import {ActivatedRoute} from "@angular/router";
import {AnswerService} from "app/services/answer/answer.service";

@Component({
  selector: 'answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.scss']
})
export class AnswerListComponent {
  user: User;
  sub: any;
  answers: any;

  constructor(private route: ActivatedRoute,
              private answerService: AnswerService,
              private userService: UserService) {
        this.sub = this.route.params.subscribe(params => {
          let id = +params['id'];
          this.userService.getUser(id).then((user) => {
            this.user = user;
          });
          this.answerService.getUserAnswers(id).then((answers) => {
            this.answers = answers;
          });
        });
      }

  getScore(max, score) {
    let result = (+score / +max * 100).toFixed().toString()

    if (result !== 'NaN') {
      return result + '%';
    }

    return '';
  }

}
