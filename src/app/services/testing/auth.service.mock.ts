import {User} from "../../user";
import {Subject} from "rxjs/Subject";

export class AuthServiceMock {
    getUserAsObservable() {
        let user = new User(1, {
            first_name: 'Jan',
            last_name: 'Kowalski',
            role: 'STUDENT'
        });
        let sub = new Subject<User>();
        sub.next(user);

        return sub.asObservable();
    }
}