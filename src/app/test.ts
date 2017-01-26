export class Test {

  constructor(public id: number, private attributes) {}

  get name(): string {
    return this.attributes['name'] || '';
  }

  get description(): string {
    return this.attributes['description'] || '';
  }

  get code(): string {
    return this.attributes['code'] || '';
  }

  set name(n) {
    this.attributes['name'] = n;
  }

  set code(n) {
    this.attributes['code'] = n;
  }

  set description(d) {
    this.attributes['description'] = d;
  }
}
