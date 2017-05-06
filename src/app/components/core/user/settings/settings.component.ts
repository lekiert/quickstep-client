import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "app/services/user.service";
import {User} from "app/user";

const styles = require('./settings.component.scss');
const template = require('./settings.component.html');

@Component({
  selector: 'user-settings',
  template: template,
  styles: [ styles ],
})
export class SettingsComponent {

  changePasswordError: string;
  oldPassword: string;
  newPassword: string;
  newPasswordRepeat: string;
  successMessage: string;
  user: User;

  constructor(
    private route: ActivatedRoute,
    private service: UserService) {}

  ngOnInit() {
      this.changePasswordError = '';
      this.oldPassword = '';
      this.newPassword = '';
      this.newPasswordRepeat = '';
      this.successMessage = '';
      this.service.fetchUserFromAPI();
      this.service.getAuthenticatedUserObject().then(user => this.user = user)
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
        this.submitPasswordChange(this.oldPassword, this.newPassword);
      }
    }

  }

  private submitPasswordChange(oldPassword, newPassword) {
    this.service.changePassword(this.oldPassword, this.newPassword)
                               .then((response) => {
                                 this.successMessage = 'Hasło zostało zmienione.';
                               })
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
