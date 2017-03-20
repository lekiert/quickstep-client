import {Component, OnInit} from "@angular/core";
import {InformationService} from "../../../services/information.service";
import {UserService} from "../../../services/user.service";
import {Router, ActivatedRoute} from "@angular/router";

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
    private router: Router,
    private route: ActivatedRoute,
    private service: InformationService, 
    private userService: UserService) {
      this.sub = this.route.params.subscribe(params => {
        let id = +params['id'];
        this.id = id;
      });
  }

  ngOnInit() {
    this.service.getLatestUserActionLogs(this.id).then((logs) => {
      this.stats = logs;
    });
  }

}
