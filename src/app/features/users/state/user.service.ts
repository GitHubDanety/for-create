import { Injectable } from '@angular/core';
import { UserStore } from './user.store';
import { User } from './user.model';
import { UserQuery } from './user-query.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private userStore: UserStore, private userQuery: UserQuery) {}

  addUser(user: User) {
    const newUser: User = {
      id: UserStore.generateUserId(this.userQuery),
      name: user.name ?? '',
      active: user.active ?? false,
    };
    this.userStore.add(newUser);
  }

  updateUser(id: number, user: Partial<User>) {
    this.userStore.update(id, user);
  }

  deleteUser(id: number) {
    this.userStore.remove(id);
  }
  activateUser(id: number) {
    this.userStore.update(id, { active: true });
  }

  setUsers(users: Partial<User>[]) {
    const usersWithIds: User[] = users.map(user => ({
      id: user.id ?? UserStore.generateUserId(this.userQuery),
      name: user.name ?? '',
      active: user.active ?? false
    }));

    this.userStore.set(usersWithIds);
  }
}
