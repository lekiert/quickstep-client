import {Exercise} from "./exercise";
export class Test {

  exercises: Exercise[];

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

  get score() {
    try {
      let max = this.attributes['last-score'].max;
      let score = this.attributes['last-score'].score;
      if (max && score) {
        return (+score / +max * 100).toFixed().toString();
      }
    } catch (e) {
      return '';
    }

    return '';
  }
}
