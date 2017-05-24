import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "app/services/user/user.service";
import {User} from "app/user";
import {AuthService} from "../../../../services/auth/auth.service";

const styles = require('./settings.component.scss');
const template = require('./settings.component.html');

@Component({
  selector: 'user-settings',
  template: template,
  styles: [ styles ],
})
export class SettingsComponent {

  constructor(
      private userService: UserService,
      private authService: AuthService) {}

  changePasswordError: string;
  oldPassword: string;
  newPassword: string;
  newPasswordRepeat: string;
  successMessage: string;
  user: User;

  ngOnInit() {
      this.changePasswordError = '';
      this.oldPassword = '';
      this.newPassword = '';
      this.newPasswordRepeat = '';
      this.successMessage = '';
      this.authService.getAuthenticatedUser().then(user => this.user = user)
  }

  changePassword() {
    try {
      this.changePasswordError = '';
      this.successMessage = '';

      if (this.oldPassword.length === 0) {
        throw new Error('Musisz podać stare hasło.')
      }
      if (this.newPassword.length === 0) {
        throw new Error('Musisz podać nowe hasło.')
      }
      if (this.newPasswordRepeat.length === 0) {
        throw new Error('Musisz podać powtórzyć nowe hasło.')
      }
      if (this.newPassword !== this.newPasswordRepeat) {
        throw new Error('Musisz powtórzyć takie samo hasło.')
      }

      return true;
    } catch (e) {
      this.changePasswordError = e.message;

      return false;
    } finally {
      if (this.changePasswordError.length === 0) {
        this.submitPasswordChange();
      }
    }

  }

  private submitPasswordChange() {
    this.userService.changePassword(this.oldPassword, this.newPassword)
    .then(() => this.successMessage = 'Hasło zostało zmienione.')
    .catch((error) => {
     switch (error.json().data.attributes.result) {
       case 'WRONG_PASSWORD':
        this.changePasswordError = 'Nieprawidłowe obecne hasło użytkownika.';
       break;
       case 'VALIDATION_FAILED':
        this.changePasswordError = 'Nieprawidłowy format hasła. Hasło powinno mieć przynajmniej 6 znaków.';
       break;
     }
    });
  }

}
