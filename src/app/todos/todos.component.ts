import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { Observable } from 'rxjs';
import { Todo } from './models/todo.model';
import { UserSelection } from './models/user-selection.model';
import { User } from './models/user.model';
import { TodoApiService } from './services/api/todo/todo-api.service';
import { UserApiService } from './services/api/user/user-api.service';
import { TodoStateService } from './services/state/todo/todo-state.service';
import { UserStateService } from './services/state/user/user-state.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  loadingTodos$: Observable<boolean>;
  todos$: Observable<Todo[]>;
  loadingUsers$: Observable<boolean>;
  users$: Observable<User[]>;

  opened = true;
  selectedUser: number | undefined;
  completedOnly: boolean;

  constructor(
    private todoStateService: TodoStateService,
    private userApiService: UserApiService,
    private userStateService: UserStateService,
  ) {
    this.loadingTodos$ = this.todoStateService.loadingTodos$;
    this.todos$ = this.todoStateService.todos$;
    this.loadingUsers$ = this.userStateService.loading$;
    this.users$ = this.userStateService.users$;
  }

  ngOnInit(): void {
    this.updateUsers();
  }

  private updateUsers(): void {
    this.userStateService.loading = true;
    this.userApiService.getUsers().subscribe(users => {
      this.userStateService.users = users;
      this.userStateService.loading = false;
    });
  }
}
