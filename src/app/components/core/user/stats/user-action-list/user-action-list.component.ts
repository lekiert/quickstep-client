import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'user-action-list',
  templateUrl: './user-action-list.component.html',
  styleUrls: ['./user-action-list.component.scss']
})
export class UserActionListComponent {
  @Input() actions;
}
