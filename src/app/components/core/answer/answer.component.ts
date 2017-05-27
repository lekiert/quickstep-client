import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {TestService} from "app/services/test/test.service";
import {Exercise} from "app/exercise";
import {Test} from "app/test";
import {User} from "app/user";
import {environment} from "../../../../environments/environment";
import {AnswerService} from "../../../services/answer/answer.service";

@Component({
    selector: 'app-answer',
    templateUrl: './answer.component.html',
    styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {

    error: string = '';
    sub: any;
    id: any;
    test: Test;
    user: User;
    exercises: Exercise[];
    answers: {};
    score: any;
    storageUrl = environment.API_URL;

    constructor(private route: ActivatedRoute,
                private answerService: AnswerService,
                private testService: TestService) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];

            this.answerService.getAnswer(this.id).then((answer) => {
                try {
                    this.answers = answer.data.answers;
                    this.score = (answer.score * 100).toFixed();

                    if (answer.test) {
                        this.test = answer.test;
                        this.testService.getTestRelatedExercises(this.test.id).then((exercises) => {
                            this.exercises = exercises;
                            this.test.exercises = exercises;
                            this.setExerciseResults(answer.data.results);
                        });
                    }

                    if (answer.user) {
                        this.user = answer.user;
                    }
                } catch (e) {
                    console.log(e);
                }
            }).catch((e)  => {
                this.error = 'Nie odnaleziono odpowiedzi lub nie posiadasz odpowiednich uprawnień.'
            });
        });
    }


    setExerciseResults(results): void {
        for (let i in results) {
            for (let j in this.exercises) {
                if (+i === +this.exercises[j].id) {
                    let _results = {}
                    Object.keys(results[i]).forEach((r) => {
                        _results[r] = results[i][r].results
                    });
                    console.log(_results);
                    this.exercises[j].checkResults = _results;
                }
            }
        }
    }

}
