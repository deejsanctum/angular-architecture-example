import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-table',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoTableComponent implements OnInit, OnChanges {
  @Input() loading: boolean;
  @Input() todos: Todo[];

  textToFilter = '';
  filteredTodos: Todo[];
  displayedColumns: string[] = ['userId', 'id', 'title', 'completed'];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.todos) {
      this.filteredTodos = changes.todos.currentValue;
    }
  }

  ngOnInit(): void {}

  onKey(event: Event): void {
    this.filteredTodos = this.todos.filter((todo) => todo.title.includes(this.textToFilter));
  }
}
