import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Patch,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiProperty,
} from '@nestjs/swagger';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

@ApiTags('todos')
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiResponse({ status: 201, description: 'Created', type: Todo })
  create(@Body() todo: Todo): Todo {
    return this.todoService.create(todo);
  }

  @Get()
  @ApiOperation({ summary: 'Get all todos' })
  @ApiResponse({ status: 200, description: 'Success', type: [Todo] })
  findAll(): Todo[] {
    return this.todoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a todo by ID' })
  @ApiResponse({ status: 200, description: 'Success', type: Todo })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  findById(@Param('id') id: number): Todo {
    return this.todoService.findById(Number(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a todo by ID' })
  @ApiResponse({ status: 200, description: 'Success', type: Todo })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  update(@Param('id') id: number, @Body() todo: Todo): Todo {
    return this.todoService.update(Number(id), todo);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a todo by ID' })
  @ApiResponse({ status: 200, description: 'Success', type: Todo })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  delete(@Param('id') id: number): Todo {
    return this.todoService.delete(Number(id));
  }

  @Patch(':id/completed')
  @ApiOperation({ summary: 'Update the completion status of a todo' })
  @ApiResponse({ status: 200, description: 'Success', type: Todo })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  updateCompletionStatus(
    @Param('id') id: number,
    @Body('completed') completed: boolean,
  ): Todo {
    return this.todoService.updateCompletionStatus(id, completed);
  }
}
