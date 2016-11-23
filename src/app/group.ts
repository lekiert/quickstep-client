export class Group {

  constructor(public id: number, private attributes) {}

  get name(): string {
    return this.attributes['name'] || '';
  }

  set name(n) {
    this.attributes['name'] = n;
  }

  get description(): string {
    return this.attributes['description'] || '';
  }

  set description(d) {
    this.attributes['description'] = d;
  }

  get user_count(): string {
    return this.attributes['user-count'] || '';
  }
}
