import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './models/todo.model';
import { TodoApiService } from './services/api/todo/todo-api.service';
import { TodoStateService } from './services/state/todo/todo-state.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  loading$: Observable<boolean>;
  todos$: Observable<Todo[]>;

  constructor(
    private todoApiService: TodoApiService,
    private todoStateService: TodoStateService
  ) {
    this.loading$ = this.todoStateService.loadingTodos$;
    this.todos$ = this.todoStateService.todos$;
  }

  ngOnInit(): void {
    this.updateTodos();
  }

  filterTodosByCompleted(completed?: boolean): void {
    this.updateTodos(completed);
  }

  updateTodos(completed?: boolean): void {
    this.todoStateService.loadingTodos = true;
    this.todoApiService.getTodos(completed).subscribe(todos => {
      this.todoStateService.todos = todos;
      this.todoStateService.loadingTodos = false;
    });
  }
}
