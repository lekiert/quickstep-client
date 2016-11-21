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
}
