export class Course {

  constructor(public id: number, private attributes) {}

  get name(): string {
    return this.attributes['name'] || '';
  }

  get level(): string {
    return this.attributes['level'] || '';
  }

  get description(): string {
    return this.attributes['description'] || '';
  }
}
