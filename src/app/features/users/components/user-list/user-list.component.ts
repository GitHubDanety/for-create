import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserQuery } from '../../state/user-query.service';
import { User } from '../../state/user.model';
import { UserService } from '../../state/user.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]> = this.userQuery.allUsers$;

  constructor(private userQuery: UserQuery, private userService: UserService) {}

  ngOnInit() {
    this.userService.setUsers([
      { name: 'Danko'},
      { name: 'Anna'},
    ]);
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id);
  }
  activateUser(id: number) {
    this.userService.activateUser(id);
  }
}
