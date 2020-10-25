import { Component, Input, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { UserSelection } from '../../models/user-selection.model';
import { User } from '../../models/user.model';
import { TodoApiService } from '../../services/api/todo/todo-api.service';
import { TodoStateService } from '../../services/state/todo/todo-state.service';

@Component({
  selector: 'app-filter-options',
  templateUrl: './filter-options.component.html',
  styleUrls: ['./filter-options.component.css']
})
export class FilterOptionsComponent implements OnInit {
  @Input() loadingUsers: boolean;
  @Input() users: User[];

  selectedUser: number | undefined;
  completedOnly: boolean;

  constructor(
    private todoApiService: TodoApiService,
    private todoStateService: TodoStateService,
  ) { }

  ngOnInit(): void {
  }

  filterTodosByCompleted(completed?: boolean): void {
    this.updateTodos({ completed, userId: this.selectedUser });
  }

  onUserChanged(event: MatRadioChange): void {
    this.updateTodos({ completed: this.completedOnly, userId: event.value });
  }

  private updateTodos(userSelection: UserSelection): void {
    this.todoStateService.loadingTodos = true;
    this.todoApiService.getTodos(userSelection).subscribe(todos => {
      this.todoStateService.todos = todos;
      this.todoStateService.loadingTodos = false;
    });
  }
}
