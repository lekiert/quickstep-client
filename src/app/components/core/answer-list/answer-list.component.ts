import { Component, OnInit } from '@angular/core';
import { User }              from '../../../user';
import { CourseService }     from '../../../services/course.service';
import { TestService }     from '../../../services/test.service';
import { UserService }       from '../../../services/user.service';
import { Router, ActivatedRoute, Params }          from '@angular/router';

@Component({
  selector: 'answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.scss']
})
export class AnswerListComponent implements OnInit {
  user: User;
  sub: any;
  answers: any;

  constructor(private router: Router,
      private route: ActivatedRoute,
      private testService: TestService,
      private userService: UserService) {
        this.sub = this.route.params.subscribe(params => {
          let id = +params['id'];
          this.userService.getUser(id).then((user) => {
            this.user = user;
          });
          this.testService.getUserAnswers(id).then((answers) => {
            this.answers = answers;
          });
        });
      }

  ngOnInit() {

  }

  getScore(max, score) {
    let result = (+score / +max * 100).toFixed().toString()

    if (result !== 'NaN') {
      return result + '%';
    }

    return '';
  }

}
