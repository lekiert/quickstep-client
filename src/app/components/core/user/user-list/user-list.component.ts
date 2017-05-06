import {Component} from "@angular/core";
import {UserService} from "app/services/user.service";
import {User} from "app/user";
import {ActivatedRoute} from "@angular/router";

const styles = require('./user-list.component.scss');
const template = require('./user-list.component.html');

@Component({
    selector: 'user-list',
    template: template,
    styles: [styles],
})
export class UserListComponent {

    user: User;
    users: User[];
    filters = [
        {name: 'Wszyscy', value: 'ALL'},
        {name: 'Uczeń', value: 'STUDENT'},
        {name: 'Nauczyciel', value: 'TEACHER'},
        {name: 'Kierownik', value: 'SUPERVISOR'},
        {name: 'Administrator', value: 'ADMIN'},
    ];
    filter = 'ALL';
    private sub: any;
    private routeFilter: any;

    constructor(private route: ActivatedRoute,
                private service: UserService) {
    }

    getUsers(type?: string): void {
        this.users = [];
        if (type && type === 'TEACHER') {
            this.service.getTeachers()
                .then((users) => {
                    this.users = users;
                });
        }

        this.service.getUsers(this.filter)
            .then((users) => {
                this.users = users;
            });
    }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            this.routeFilter = params['type'];
            this.service.getAuthenticatedUserObject().then(
                user => {
                    this.user = user
                    if (user.isSupervisor()) {
                        switch (this.routeFilter) {
                            case 'students':
                                this.filter = 'STUDENT';
                                break;
                            case 'supervisors':
                                this.filter = 'SUPERVISOR';
                                break;
                            default:
                                this.filter = 'TEACHER';
                                break;
                        }
                    }
                    this.getUsers();
                }
            )
        });

    }
}
