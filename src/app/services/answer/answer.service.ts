import {Injectable} from '@angular/core';
import {BaseService} from '../base.service';
import {Response, URLSearchParams} from "@angular/http";
import {contentHeaders} from '../../common/headers';
import {Answer} from 'app/answer';
import {User} from "../../user";
import {Test} from "../../test";

@Injectable()
export class AnswerService extends BaseService {

    private page = 1;
    private size = 15;

    private getQueryParams(): URLSearchParams {
        let params: URLSearchParams = new URLSearchParams();
        params.set('sort', 'id');
        params.set('page[number]', '' + this.page);
        params.set('page[size]', '' + this.size);

        return params;
    }

    getAnswerStats(userId?: any, page?: number): Promise<any> {
        let url = this.answersUrl;
        let params = this.getQueryParams();
        params.set('sort', '-id');
        if (userId) {
            url = `${this.usersUrl}/${userId}/answers/`;
        }

        if (page) {
            params.set('page[number]', '' + page);
        }

        return this.get(url, {}, params).then(this.createAnswerListFromResponse);
    }

    public getUserAnswers(userId): Promise<Answer[]> {
        let url = this.usersUrl + '/' + userId + '/answers' + '?sort=-id'
        return this.get(url).then(this.createAnswerListFromResponse);
    }

    public getAnswer(answersId): Promise<Answer> {
        let url = `${this.answersUrl}/${answersId}?include=test,user`;
        return this.get(url).then((response) => {
            let data = response.json();
            let answer: Answer;

            answer = this.createAnswerFromResponse(response);

            for (let res of data.included) {
                if (res.type === 'tests') {
                    answer.test = new Test(res.id, res.attributes);
                }
                if (res.type === 'users') {
                    answer.user = new User(res.id, res.attributes);
                }
            }

            return answer;
        });
    }

    private createAnswerListFromResponse(logs: any): Array<Answer> {
        try {
            let data = logs.json().data;

            if (data) {
                return data.reverse().map((log) => {
                    return new Answer(log.id, log.attributes);
                });
            }
        } catch (e) {
            console.log('Failed to parse user answers');
        }

        return [];
    }

    private createAnswerFromResponse(response: Response): Answer {
        try {
            let id = response.json().data.id;
            let data = response.json().data.attributes;
            let answer = new Answer(id, data);

            return answer;
        } catch (e) {

        }
    }
}
