import { Component, OnInit } from "@angular/core";
import { InformationService } from "../../../services/information.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  public stats;
  private sub: any;
  private id;

  constructor(
    private route: ActivatedRoute,
    private service: InformationService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id'];
      this.id = id;

      this.service.getLatestUserActionLogs(this.id).then((logs) => {
        this.stats = logs;
      });
    });
  }

}
