import { Component, OnInit }                       from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute, Params }          from '@angular/router';
import { AuthHttp }                                from 'angular2-jwt';
import { UserService }                             from '../../../services/user.service';
import { User }                                    from '../../../user';

var MD5 = require("crypto-js/md5");
const styles = require('./edit-user.component.scss');
const template = require('./edit-user.component.html');

@Component({
  selector: 'edit-user',
  template: template,
  styles: [ styles ],
})
export class EditUserComponent {

  changePasswordError: string;
  oldPassword: string;
  newPassword: string;
  newPasswordRepeat: string;
  successMessage: string;
  password_repeat = '';
  password_field_type = 'password';
  delete_confirmation = '';
  user: User;
  result = null;
  private sub: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: UserService) {
      this.changePasswordError = '';
      this.oldPassword = '';
      this.newPassword = '';
      this.newPasswordRepeat = '';
      this.successMessage = '';
      this.sub = this.route.params.subscribe(params => {
        let id = +params['id'];
        this.service.getUser(id).then((user) => {
          this.user = user;
        });
      });
    }

  roles = [
    { name: 'Uczeń', value: 'STUDENT' },
    { name: 'Nauczyciel', value: 'TEACHER' },
    { name: 'Kierownik', value: 'SUPERVISOR' },
    { name: 'Administrator', value: 'ADMIN' },
  ];

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
    } catch (e) {
      this.changePasswordError = e.message;
    } finally {
      if (this.changePasswordError.length === 0) {
        this.submitPasswordChange(this.oldPassword, this.newPassword);
      }
    }

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
