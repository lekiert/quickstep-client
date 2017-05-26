export class User {

  constructor(public id: number, private attributes) {}

  set password(pw) {
    this.attributes['password'] = pw;
  }

  get password(): string {
    return this.attributes['password'];
  }

  get first_name(): string {
    return this.attributes['first-name'];
  }

  set first_name(fn) {
    this.attributes['first-name'] = fn;
  }

  get last_name(): string {
    return this.attributes['last-name'];
  }

  set last_name(ln) {
    this.attributes['last-name'] = ln;
  }

  get email(): string {
    return this.attributes['email'];
  }

  set email(email) {
    this.attributes['email'] == email;
  }

  get role(): string {
    return this.attributes['role'];
  }

  set role(role) {
    this.attributes['role'] = role;
  }

  get role_name(): string {
    let role = 'Nieokreślony';

    switch (this.attributes['role']) {
      case 'ADMIN': role = 'Administrator'; break;
      case 'SUPERVISOR': role = 'Kierownik'; break;
      case 'TEACHER': role = 'Nauczyciel'; break;
      case 'STUDENT': role = 'Uczeń'; break;
    }

    return role;
  }

  get created(): string {
    return this.attributes['created-at'];
  }

  get overallScore(): string {
    return this.attributes['overall-score'] || '0';
  }

  isStudent(): boolean {
    return this.attributes['role'] === 'STUDENT';
  }

  isAdmin(): boolean {
    return this.attributes['role'] === 'ADMIN';
  }

  isTeacher(): boolean {
    return this.attributes['role'] === 'TEACHER';
  }

  isSupervisor(): boolean {
    return this.attributes['role'] === 'SUPERVISOR';
  }
}
