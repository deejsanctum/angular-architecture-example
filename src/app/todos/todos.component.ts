import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoFacadeService } from './facade/todo-facade.service';
import { Todo } from './models/todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  loading$: Observable<boolean>;
  todos$: Observable<Todo[]>;

  constructor(private todoFacade: TodoFacadeService) {
    this.loading$ = this.todoFacade.getLoadingTodosObservable();
    this.todos$ = this.todoFacade.getTodoObservable();
  }

  ngOnInit(): void {
    this.todoFacade.updateTodos();
  }

  filterTodosByCompleted(completed?: boolean): void {
    this.todoFacade.updateTodos(completed);
  }
}
