import { Component, OnInit } from '@angular/core';
import { InformationService } from '../../../services/information.service';

@Component({
  selector: 'stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  public stats;

  constructor(private service: InformationService) {
  }

  ngOnInit() {
    this.service.getLatestUserActionLogs().then((logs) => {
      this.stats = logs;
      console.log(this.stats);
    });
  }

}
