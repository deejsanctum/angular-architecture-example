import { Todo } from './todo.model';

export interface TodoState {
  loading: boolean;
  todos: Todo[];
}
