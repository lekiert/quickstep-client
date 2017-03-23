import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { InformationService } from "app/services/information.service";
import { ActivatedRoute } from "@angular/router";
import { AnswerService } from "../../../services/answer.service";
import { UserAction } from "../../../user-action";
import { Answer } from "app/answer";


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

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private answerService: AnswerService,
    private service: InformationService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id'];
      this.id = id;

      this.service.getLatestUserActionLogs(this.id).then((logs) => {
        this.stats = logs;
      });

      this.answerService.getAnswerStats(this.id).then((answers) => {
        this.answers = answers;
        let chartData = this.answers.map((e) => Math.round(e.score * 100));
        this.lineChartData[0].data = chartData;

        for (let index in answers) {
          this.lineChartLabels.push(answers[index].testName)
        }

        this.finished = true;
      });
    });
  }


  public lineChartData:Array<any> = [{ data: [] }];
  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          callback: label => `${label}%`
        }
      }]
    }
  };
  public lineChartColors:Array<any> = [
    { // grey
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

  // events
  public chartClicked(e:any) {
    let i = e.active[0]._index
    this.router.navigate(['/answer', this.answers[i].id]);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
