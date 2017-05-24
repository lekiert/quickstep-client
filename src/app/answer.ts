import {User} from "./user";
import {Test} from "./test";
export class Answer {

    public test: Test;
    public user: User;

    constructor(
        public id: number,
        private attributes
    ) {}

    get score(): number {
        try {
            let score = this.attributes['score'];
            if (this.isValid) {
                return (+score.score / +score.max);
            }

            return 0;
        } catch (e) {
            return 0;
        }
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
