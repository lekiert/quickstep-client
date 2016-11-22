export class Test {

  constructor(public id: number, private attributes) {}

  get name(): string {
    return this.attributes['name'] || '';
  }

  get description(): string {
    return this.attributes['description'] || '';
  }
}
