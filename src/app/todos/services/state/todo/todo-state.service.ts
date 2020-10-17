import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TodoState } from 'src/app/todos/models/todo-state.model';
import { Todo } from 'src/app/todos/models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoStateService {
  private state: TodoState = {
    todos: [],
    loading: false,
  };

  private todosSubject: BehaviorSubject<Todo[]> = new BehaviorSubject(this.state.todos);
  private loadingTodosSubject: BehaviorSubject<boolean> = new BehaviorSubject(this.state.loading);

  todos$: Observable<Todo[]> = this.todosSubject.asObservable();
  loadingTodos$: Observable<boolean> = this.loadingTodosSubject.asObservable();

  constructor() { }

  set todos(todos: Todo[]) {
    this.state.todos = todos;
    this.todosSubject.next(todos);
  }

  set loadingTodos(loading: boolean) {
    this.state.loading = loading;
    this.loadingTodosSubject.next(loading);
  }
}
