import {Component, Input} from '@angular/core';
import {UserAction} from "../../../../../user-action";

@Component({
  selector: 'user-action-list',
  templateUrl: './user-action-list.component.html',
  styleUrls: ['./user-action-list.component.scss']
})
export class UserActionListComponent {
  @Input() actions: UserAction[];
}
