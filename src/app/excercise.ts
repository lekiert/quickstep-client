export class Excercise {

  answers = {};

  constructor(public id: number, private attributes) {}

  get name(): string {
    return this.attributes['name'] || '';
  }

  get code(): string {
    return this.attributes['code'] || '';
  }

  get command(): string {
    return this.attributes['command'] || '';
  }

  get data() {
    return this.attributes['data'] || '';
  }

  set name(name) {
    this.attributes['name'] = name;
  }

  set code(code) {
    this.attributes['code'] = code;
  }

  set command(command) {
    this.attributes['command'] = command;
  }

  set data(data) {
    this.attributes['data'] = data;
  }
}
