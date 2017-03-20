import {Component, Output, Input, EventEmitter} from "@angular/core";
import {URLSearchParams} from "@angular/http";
import {AuthHttp} from "angular2-jwt";
import {contentHeaders} from "../../../common/headers";
import {User} from "../../../user";
import {environment} from "../../../../environments/environment";

const styles   = require('./search-field.component.scss');
const template = require('./search-field.component.html');

@Component({
  selector: 'search-field',
  template: template,
  styles: [ styles ]
})
export class SearchFieldComponent {
  constructor(private http: AuthHttp) {}

  @Input() entity: string;
  users = [];
  query:string = '';
  @Output() userSelection = new EventEmitter();
  @Output() userSelectionUnset = new EventEmitter();

  private url;

  ngOnInit() {
    this.url =  environment.API_URL + this.entity + 's'
  }

  querySearch() {
    this.userSelection.emit(false);
    if (this.query.length < 3) {
      this.users = []
      return;
    }
    let filter = new URLSearchParams();
    filter.set('filter[search]', this.query);

    this.http.get(this.url, { search: filter, headers: contentHeaders }).toPromise().then((response) => {
      let data = response.json().data;

      this.users = data.map((item) => {
        return new User(item.id, item.attributes);
      })
    });
  }

  selectUser(user: User) {
    this.query = user.first_name + ' ' + user.last_name;
    this.userSelection.emit(user);
  }
}
