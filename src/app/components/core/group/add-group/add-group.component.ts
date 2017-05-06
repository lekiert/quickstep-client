import {Component} from "@angular/core";
import {GroupService} from "app/services/group.service";

const styles = require('./add-group.component.scss');
const template = require('./add-group.component.html');

@Component({
  selector: 'add-group',
  template: template,
  styles: [ styles ],
})
export class AddGroupComponent {

  group = {
    name: '',
    description: '',
  };

  result = null;

  constructor(
    private service: GroupService) {}

  ngOnInit(): void {
    this.group = this.createStub();
  }

  saveGroup(): void {
    this.service.createGroup(this.group).then(() => {
      this.result = true;
    }).catch(() => {
      this.result = false;
    });
  }

  createStub() {
    return {
      name: '',
      description: '',
    }
  }

}
