import {Component} from "@angular/core";
import {UserService} from "app/services/user/user.service";

var MD5 = require("crypto-js/md5");
const styles = require('./add-user.component.scss');
const template = require('./add-user.component.html');

@Component({
  selector: 'add-user',
  template: template,
  styles: [ styles ],
})
export class AddUserComponent {

  user = {
    first_name: '',
    last_name: '',
    email: '',
    role: 'STUDENT',
    password: '',
    password_repeat: '',
  };

  generated_password = '';
  password_field_type = 'password';
  result = null;

  roles = [
    { name: 'Uczeń', value: 'STUDENT' },
    { name: 'Nauczyciel', value: 'TEACHER' },
    { name: 'Kierownik', value: 'SUPERVISOR' },
    { name: 'Administrator', value: 'ADMIN' },
  ];

  constructor(
    private service: UserService) {}

  ngOnInit(): void {
    this.user = this.createStub();
  }

  generatePassword(): void {
    let password = MD5(new Date().getMilliseconds().toString()).toString().substr(0, 6);
    this.user.password = this.user.password_repeat = this.generated_password = password;
  }

  togglePasswordFields(): void {
    this.password_field_type = (this.password_field_type === 'password')
                               ? 'text'
                               : 'password';
  }

  clearGeneratedPassword(): void {
    this.generated_password = '';
  }

  saveUser(): void {
    this.service.createUser(this.user).then(() => {
      this.result = true;
    }).catch(() => {
      this.result = false;
    });
  }

  createStub() {
    return {
      first_name: '',
      last_name: '',
      email: '',
      role: 'STUDENT',
      password: '',
      password_repeat: '',
    }
  }

}
