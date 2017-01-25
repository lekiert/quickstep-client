export class Excercise {

  checkResults = {};

  constructor(public id: number, private attributes) {}

  get hasResults(): boolean {
    return Object.keys(this.checkResults).length > 0;
  }

  get name(): string {
    return this.attributes['name'] || '';
  }

  get code(): string {
    return this.attributes['code'] || '';
  }

  get type(): string {
    return this.attributes['excercise-type'] || '';
  }

  get command(): string {
    return this.attributes['command'] || '';
  }

  get data() {
    return this.attributes['data'] || '';
  }

  get answers() {
    return this.attributes['answers'] || '';
  }

  get testId() {
    return this.attributes['test-id'] || '';
  }

  get attachments() {
    return this.attributes['attachments'] || [];
  }

  set testId(id) {
    this.attributes['test-id'] = id;
  }

  set name(name) {
    this.attributes['name'] = name;
  }

  set type(name) {
    this.attributes['excercise-type'] = name;
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

  set answers(answers) {
    this.attributes['answers'] = answers;
  }

  set attachments(attachments) {
    this.attributes['attachments'] = attachments;
  }
}
