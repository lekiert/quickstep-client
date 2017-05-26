import {Component} from "@angular/core";
import {UserService} from "app/services/user/user.service";
import {User} from "app/user";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../../services/auth/auth.service";

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
                private service: UserService,
                private authService: AuthService) {
    }

    getUsers(type?: string): void {
        // this.users = [];
        if (type && type === 'TEACHER') {
            this.service.getTeachers().then(users => this.users = users);
        } else {
            this.service.getUsers(this.filter).then(users => this.users = users);
        }
    }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            this.routeFilter = params['type'];
            this.authService.getAuthenticatedUser().then(
                user => {
                    this.user = user
                    if (user.isSupervisor() || user.isAdmin()) {
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
