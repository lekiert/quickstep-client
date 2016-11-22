export class User {

  constructor(public id: number, private attributes) {}

  get first_name(): string {
    return this.attributes['first-name'];
  }

  get last_name(): string {
    return this.attributes['last-name'];
  }

  get email(): string {
    return this.attributes['email'];
  }

  get role(): string {
    return this.attributes['role'];
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
