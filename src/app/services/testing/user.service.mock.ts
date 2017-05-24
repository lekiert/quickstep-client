import {Observable} from "rxjs/Observable";
import {User} from "../../user";
import {Subject} from "rxjs/Subject";

export class UserServiceMock {
    getUserAsObservable() {
        return true;
    }

    getAuthenticatedUser(): Observable<User> {
        let user = new User(1, {
            attributes: {
                first_name: 'Jan',
                last_name: 'Kowalski'
            }
        });
        let sub = new Subject<User>();
        sub.next(user);

        return sub.asObservable();
    }

    getUser() {
        return new Promise((resolve) => resolve(
            new User(1, {
                attributes: {
                    first_name: 'Jan',
                    last_name: 'Kowalski'
                }
            })
        ))
    }
}