import {Component} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {User} from "../../../user";

var MD5 = require("crypto-js/md5");
const styles = require('./edit-user.component.scss');
const template = require('./edit-user.component.html');

@Component({
  selector: 'edit-user',
  template: template,
  styles: [ styles ],
})
export class EditUserComponent {

  changePasswordError: string = '';
  successMessage: string;
  password_repeat = '';
  password_field_type = 'password';
  delete_confirmation = '';
  user: User;
  result = null;
  private sub: any;

  roles = [
    { name: 'Uczeń', value: 'STUDENT' },
    { name: 'Nauczyciel', value: 'TEACHER' },
    { name: 'Kierownik', value: 'SUPERVISOR' },
    { name: 'Administrator', value: 'ADMIN' },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: UserService) {
      this.changePasswordError = '';
      this.successMessage = '';
      this.sub = this.route.params.subscribe(params => {
        let id = +params['id'];
        this.service.getUser(id).then((user) => {
          this.user = user;
        });
      });
    }

  changePassword() {
    try {
      this.changePasswordError = '';
      this.successMessage = '';

      if (this.user.password.length === 0) {
        throw new Error('Musisz podać nowe hasło.')
      }
      if (this.password_repeat.length === 0) {
        throw new Error('Musisz powtórzyć nowe hasło.')
      }
      if (this.user.password !== this.password_repeat) {
        throw new Error('Musisz powtórzyć takie samo hasło.')
      }

    } catch (e) {
      this.changePasswordError = e.message;

      return false;
    }

    this.submitPasswordChange(this.password_repeat);

    return true;
  }

  generatePassword(): void {
    let password = MD5(new Date().getMilliseconds().toString()).toString().substr(0, 6);
    this.user.password = this.password_repeat = password;
  }

  togglePasswordFields(): void {
    this.password_field_type = (this.password_field_type === 'password')
                               ? 'text'
                               : 'password';
  }

  clearGeneratedPassword(): void {
    this.user.password = this.password_repeat = '';
  }

  saveUser(): void {
    this.service.updateUser(this.user).then(() => {
      this.result = true;
    }).catch(() => {
      this.result = false;
    });
  }

  deleteUser(): void {
    this.service.deleteUser(this.user.id).then(() => {
      this.router.navigate(['/users/all']);
    });
  }

  private submitPasswordChange(newPassword) {
    this.service.changeUserPassword(this.user.id, newPassword)
    .then(() => {
        this.successMessage = 'Hasło zostało zmienione.';
    })
    .catch((error) => {
        this.changePasswordError = 'Nieprawidłowy format hasła. Hasło powinno mieć przynajmniej 6 znaków.';
    });
  }

}
