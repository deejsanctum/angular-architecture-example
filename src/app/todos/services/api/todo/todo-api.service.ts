import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/todos/models/todo.model';
import { UserSelection } from 'src/app/todos/models/user-selection.model';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {

  constructor(private http: HttpClient) { }

  getTodos(userSelection: UserSelection): Observable<Todo[]> {
    const url = `https://jsonplaceholder.typicode.com/todos${this.processUserSelectionParams(userSelection)}`;
    return this.http.get<Todo[]>(url);
  }

  processUserSelectionParams(userSelection: UserSelection): string {
    const params: string[] = [];
    if (userSelection.completed) {
      params.push(`completed=${userSelection.completed}`);
    }
    if (userSelection.userId) {
      params.push(`userId=${userSelection.userId}`);
    }
    if (!params) {
      return '';
    }
    return params.length ? `?${params.join('&')}` : '';
  }
}
