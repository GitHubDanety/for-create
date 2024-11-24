import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { UserStore, UserState } from './user.store';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class UserQuery extends QueryEntity<UserState, User> {
  allUsers$ = this.selectAll();

  constructor(protected override store: UserStore) {
    super(store);
  }
}