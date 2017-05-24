import {Answer} from "../../answer";
export class AnswerServiceMock {
    getUserAnswers() {
        let answers = [
            new Answer(1, {}),
            new Answer(2, {}),
        ];

        return new Promise(r => r(answers));
    }

    getAnswer() {
        let answer = new Answer(1, {
            attributes: {
                answers: {},
                score: {
                    max: 1,
                    score: 1
                }
            }
        });

        return new Promise(r => r(answer));
    }
}