import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from './features/users/components/add-user/add-user.component';
import { map, Observable } from 'rxjs';
import { User } from './features/users/state/user.model';
import { UserQuery } from './features/users/state/user-query.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'for-create';
  
  users$: Observable<User[]> = this.userQuery.allUsers$;
  allUsersActive$: Observable<boolean> = this.users$.pipe(
    map(users => users.length >= 5 || !users.every(user => user.active))
  );
  constructor(private dialog: MatDialog, private userQuery: UserQuery) {}

  openAddUserDialog(): void {
    this.dialog.open(AddUserComponent, {
      width: '600px'
    });
  }
}
