import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationFacadeService } from './facade/application-facade.service';
import { Post } from './shared/models/posts/post.model';
import { Todo } from './shared/models/todos/todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  posts$: Observable<Post[]>;

  loading = true;
  todos: Todo[] = [];

  constructor(private applicationFacadeService: ApplicationFacadeService) {
    this.posts$ = this.applicationFacadeService.getPostObservable();

    this.applicationFacadeService.getTodoObservable().subscribe(todos => this.todos = todos);
    this.applicationFacadeService.getLoadingTodosObservable().subscribe(loading => this.loading = loading);
  }

  ngOnInit(): void {
    this.applicationFacadeService.updateTodos();
  }

  setUserFilterOnPosts(event: Event): void {
    const value: string | null = (event as InputEvent).data;
    this.applicationFacadeService.filterPostsByUser(value);
  }

  filterTodosByCompleted(completed?: boolean): void {
    this.applicationFacadeService.updateTodos(completed);
  }

}
