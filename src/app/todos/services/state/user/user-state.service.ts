import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserState } from 'src/app/todos/models/user-state.model';
import { User } from 'src/app/todos/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {

  private state: UserState = {
    loading: true,
    users: [],
  };

  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(this.state.loading);
  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject(this.state.users);

  loading$: Observable<boolean> = this.loadingSubject.asObservable();
  users$: Observable<User[]> = this.usersSubject.asObservable();

  constructor() { }

  set loading(loading: boolean) {
    this.state.loading = loading;
    this.loadingSubject.next(loading);
  }

  set users(users: User[]) {
    this.state.users = users;
    this.usersSubject.next(users);
  }
}
