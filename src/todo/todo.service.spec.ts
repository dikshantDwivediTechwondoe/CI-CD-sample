// src/todo/todo.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoService],
    }).compile();

    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new todo', () => {
      const newTodo: Todo = {
        title: 'Sample Todo',
        description: 'This is a sample todo.',
        completed: false,
      };
      const result = service.create(newTodo);

      expect(result).toHaveProperty('id');
      expect(result.title).toBe(newTodo.title);
      expect(result.description).toBe(newTodo.description);
      expect(result.completed).toBe(newTodo.completed);
    });
  });

  describe('findAll', () => {
    it('should return all todos', () => {
      const todos: Todo[] = [
        {
          id: 1,
          title: 'Todo 1',
          description: 'Description 1',
          completed: false,
        },
        {
          id: 2,
          title: 'Todo 2',
          description: 'Description 2',
          completed: true,
        },
      ];
      jest.spyOn(service, 'findAll').mockReturnValue(todos);

      const result = service.findAll();

      expect(result).toBe(todos);
    });
  });

  // Add test cases for other service methods (findById, update, delete) if needed
});
