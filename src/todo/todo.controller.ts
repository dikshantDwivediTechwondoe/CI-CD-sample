// src/todo/todo.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() todo: Todo): Todo {
    return this.todoService.create(todo);
  }

  @Get()
  findAll(): Todo[] {
    return this.todoService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number): Todo {
    return this.todoService.findById(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() todo: Todo): Todo {
    return this.todoService.update(Number(id), todo);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Todo {
    return this.todoService.delete(Number(id));
  }
}
