export class Answer {

    constructor(public id: number, private attributes) {}

    get score(): number {
        let score = this.attributes['score'];
        if (this.isValid) {
            return (+score.score / +score.max);
        }

        return 0;
    }

    get isValid(): boolean {
        return this.attributes['score'].max > 0;
    }

    get data(): any {
        return this.attributes;
    }

    get testName(): any {
        return this.attributes['test-name'];
    }
}
