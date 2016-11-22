export class Excercise {

  constructor(public id: number, private attributes) {}

  get name(): string {
    return this.attributes['name'];
  }

  get code(): string {
    return this.attributes['code'];
  }

  get command(): string {
    return this.attributes['command'];
  }
}
