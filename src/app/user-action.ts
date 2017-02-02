import { User } from "./user"

export class UserAction {

  private user: User;

  constructor(public id: number, private attributes) {
    // this.user = new User(this.attributes.relationships.)
  }

  get userId(): string {
    return this.attributes['user-id'] || '';
  }

  get code(): string {
    return this.attributes['action-code'] || '';
  }

  get meta() {
    return this.attributes['additional-data'] || '';
  }

  get when(): string {
    return this.attributes['created-at'] || '';
  }

  get userName(): string {
    return this.attributes['user-name'] || '';
  }

  get description(): string {
    switch (this.attributes['action-code']) {
      case 'USER_HAS_BEEN_CREATED':
        return 'Utworzono nowego użytkownika';
      case 'USER_HAS_BEEN_DELETED':
        return 'Usunięto użytkownika: ' +
               this.attributes['additional-data'].first_name +
               ' ' + this.attributes['additional-data'].last_name;
      case 'USER_HAS_BEEN_UPDATED':
        return 'Zaktualizowano dane użytkownika: ' +
               this.attributes['additional-data'].first_name +
               ' ' + this.attributes['additional-data'].last_name;
      case 'USER_HAS_LOGGED_IN':
        return 'Użytkownik zalogował się do aplikacji.';

      case 'USER_HAS_SUBMITTED_ANSWER':
        return 'Użytkownik rozwiązał test.';
    }

    return this.attributes['action-code'];
  }

  get answerId(): string {
    return this.attributes['additional-data'].answer_id;
  }
}
