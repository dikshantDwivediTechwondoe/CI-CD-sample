import { Injectable } from '@nestjs/common';
import { Todo } from './todo.model';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];

  create(todo: Todo): Todo {
    const newTodo: Todo = {
      id: Date.now(),
      ...todo,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  findAll(): Todo[] {
    return this.todos;
  }

  findById(id: number): Todo {
    return this.todos.find((todo) => todo.id === id);
  }

  update(id: number, todo: Todo): Todo {
    const index = this.todos.findIndex((item) => item.id === id);
    if (index >= 0) {
      this.todos[index] = {
        ...this.todos[index],
        ...todo,
      };
      return this.todos[index];
    }
    return null;
  }

  delete(id: number): Todo {
    const index = this.todos.findIndex((item) => item.id === id);
    if (index >= 0) {
      const deletedTodo = this.todos[index];
      this.todos.splice(index, 1);
      return deletedTodo;
    }
    return null;
  }

  updateCompletionStatus(id: number, completed: boolean): Todo {
    const todo = this.findById(id);
    if (todo) {
      todo.completed = completed;
    }
    return todo;
  }
}
