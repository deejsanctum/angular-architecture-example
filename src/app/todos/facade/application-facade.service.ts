import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostApiService } from '../services/api/post/post-api.service';
import { TodoApiService } from '../services/api/todo/todo-api.service';
import { PostStateService } from '../services/state/post/post-state.service';
import { TodoStateService } from '../services/state/todo/todo-state.service';
import { Post } from '../shared/models/posts/post.model';
import { Todo } from '../shared/models/todos/todo.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationFacadeService {
  constructor(
    private postApiService: PostApiService,
    private todoApiService: TodoApiService,
    private postStateService: PostStateService,
    private todoStateService: TodoStateService,
  ) { }

  getPostObservable(): Observable<Post[]> {
    return this.postStateService.posts$;
  }

  updatePosts(): void {
    this.postApiService.getPosts().subscribe(posts => this.postStateService.posts = posts);
  }

  filterPostsByUser(user: string | null): void {
    this.postStateService.filterPostsByUserId(user);
  }

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
