import {Component, Input} from "@angular/core";
import {Group} from "app/group";

const styles = require('./group-list.component.scss');
const template = require('./group-list.component.html');

@Component({
  selector: 'group-list',
  template: template,
  styles: [ styles ],
})
export class GroupListComponent {
  @Input() groups: Group[];
}
