import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoApiService } from '../services/api/todo/todo-api.service';
import { TodoStateService } from '../services/state/todo/todo-state.service';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoFacadeService {
  constructor(
    private todoApiService: TodoApiService,
    private todoStateService: TodoStateService,
  ) { }

  getTodoObservable(): Observable<Todo[]> {
    return this.todoStateService.todos$;
  }

  getLoadingTodosObservable(): Observable<boolean> {
    return this.todoStateService.loadingTodos$;
  }

  updateTodos(completed?: boolean): void {
    this.todoStateService.loadingTodos = true;
    this.todoApiService.getTodos(completed).subscribe(todos => {
      this.todoStateService.todos = todos;
      this.todoStateService.loadingTodos = false;
    });
  }
}
