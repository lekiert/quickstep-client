import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { InformationService } from "app/services/information/information.service";
import { ActivatedRoute } from "@angular/router";
import { AnswerService } from "app/services/answer/answer.service";
import { UserAction } from "app/user-action";
import { Answer } from "app/answer";
import {UserService} from "app/services/user/user.service";
import {User} from "app/user";
import {AuthService} from "../../../../services/auth/auth.service";


@Component({
  selector: 'stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  public stats: Array<UserAction>;
  public answers: Array<Answer>;
  public finished: boolean = false;
  private sub: any;
  private id;
  public lineChartData: Array<any> = [{ data: [] }];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          callback: label => `${label}%`,
          max: 100
        }
      }]
    }
  };
  public lineChartColors:Array<any> = [
    {
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = false;
  public lineChartType:string = 'line';
  public currentPage = 1;
  public pagination:any = {
    first: null,
    last: null,
    prev: null,
    next: null
  }
  public user: User;
  public student: User;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private answerService: AnswerService,
    private userService: UserService,
    private authService: AuthService,
    private service: InformationService) {
    this.authService.getAuthenticatedUser().then((user) => this.user = user);
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id'];
      this.id = id;
      if (id) {
        this.userService.getUser(id).then(user => {
          this.student = user
        })
      }
      this.getUserActionLogs(this.currentPage);
      this.answerService.getAnswerStats(this.id).then((answers) => {
        this.setAnswerChartData(answers);
      });
    });
  }

  public getUserActionLogs(page?: number) {
    let id = this.id;
    let pageNumber = page || 1;
    this.stats = null;
    this.pagination = {
      first: null,
      last: null,
      prev: null,
      next: null
    }

    this.service.getLatestUserActionLogs(id, +pageNumber).then((logs) => {
      this.currentPage = page;
      this.stats = logs.actions;
      this.setPageNumbers(logs.meta)
    });
  }

  private setPageNumbers(stats): void {
    let links = stats;
    let pageNumberRegex = /page%5Bnumber%5D=(\d+)/;

    for (let type of Object.keys(this.pagination)) {
      if (links[type]) {
        let number = pageNumberRegex.exec(links[type]);
        this.pagination[type] = number[1];
      } else {
        this.pagination[type] = null;
      }
    }
  }

  private setAnswerChartData(answers: Array<Answer>): void {
    this.answers = answers;
    let chartData = answers.map((e) => Math.round(e.score * 100));
    this.lineChartData[0].data = chartData;

    for (let index in answers) {
      this.lineChartLabels.push(answers[index].testName)
    }

    this.finished = true;
  }

  public chartClicked(e:any) {
    let i = e.active[0]._index
    this.router.navigate(['/answer', this.answers[i].id]);
  }

  public chartHovered(e:any):void {

  }

}
