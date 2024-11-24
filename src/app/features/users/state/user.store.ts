import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { User } from './user.model';
import { UserQuery } from './user-query.service';

export interface UserState extends EntityState<User> {}

@StoreConfig({ name: 'users' })
@Injectable({ providedIn: 'root' })
export class UserStore extends EntityStore<UserState, User> {
    private static currentUId = 1;
     constructor() {
        super();
    }
    static generateUserId(userQuery: UserQuery): number {
        let newId = this.currentUId;
        while (userQuery.getAll().some(user => user.id === newId)) {
          newId++;
        }
        this.currentUId = newId + 1;
        return newId;
    }
}