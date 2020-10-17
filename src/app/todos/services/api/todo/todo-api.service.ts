import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/todos/shared/models/todos/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {

  constructor(private http: HttpClient) { }

  getTodos(completed?: boolean): Observable<Todo[]> {
    let url = 'https://jsonplaceholder.typicode.com/todos';
    if (completed) {
      url += `?completed=${completed}`;
    }
    return this.http.get<Todo[]>(url);
  }
}
