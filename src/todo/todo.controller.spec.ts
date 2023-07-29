// src/todo/todo.controller.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';

describe('TodoController', () => {
  let controller: TodoController;
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [TodoService],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new todo', () => {
    const newTodo: Todo = {
      title: 'Sample Todo',
      description: 'This is a sample todo.',
      completed: false,
    };
    jest.spyOn(service, 'create').mockReturnValue(newTodo);

    const result = controller.create(newTodo);

    expect(result).toBe(newTodo);
  });

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

    const result = controller.findAll();

    expect(result).toBe(todos);
  });

  describe('updateCompletionStatus', () => {
    it('should update the completion status of a Todo item', () => {
      const existingTodo: Todo = {
        id: 1,
        title: 'Todo 1',
        description: 'Description 1',
        completed: false,
      };
      const updatedTodo: Todo = {
        ...existingTodo,
        completed: true,
      };

      jest.spyOn(service, 'findById').mockReturnValue(existingTodo);
      jest
        .spyOn(service, 'updateCompletionStatus')
        .mockReturnValue(updatedTodo);

      const result = controller.updateCompletionStatus(1, true);

      expect(result).toBe(updatedTodo);
    });

    it('should return null if the Todo item with the given ID is not found', () => {
      jest.spyOn(service, 'findById').mockReturnValue(null);

      const result = controller.updateCompletionStatus(1, true);

      expect(result).toBe(null);
    });
  });
});
