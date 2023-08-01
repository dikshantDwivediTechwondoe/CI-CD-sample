import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiProperty,
} from '@nestjs/swagger';

// Define a model interface for the book
export class Book {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  author: string;
}

@ApiTags('books')
@Controller('books')
export class BooksController {
  private books: Book[] = [];

  @Get()
  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({ status: 200, description: 'Success', type: [Book] })
  getAllBooks(): Book[] {
    return this.books;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a book by ID' })
  @ApiResponse({ status: 200, description: 'Success', type: Book })
  @ApiResponse({ status: 404, description: 'Book not found' })
  getBookById(@Param('id') id: string): Book {
    const bookId = parseInt(id, 10);
    return this.books.find((book) => book.id === bookId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  @ApiResponse({ status: 201, description: 'Created', type: Book })
  createBook(@Body() book: { title: string; author: string }): Book {
    const newBook: Book = {
      id: this.books.length + 1,
      ...book,
    };
    this.books.push(newBook);
    return newBook;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a book by ID' })
  @ApiResponse({ status: 200, description: 'Success', type: Book })
  @ApiResponse({ status: 404, description: 'Book not found' })
  updateBook(
    @Param('id') id: string,
    @Body() book: { title: string; author: string },
  ): Book {
    const bookId = parseInt(id, 10);
    const bookIndex = this.books.findIndex((book) => book.id === bookId);
    if (bookIndex >= 0) {
      this.books[bookIndex] = { ...this.books[bookIndex], ...book };
      return this.books[bookIndex];
    }
    return null;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book by ID' })
  @ApiResponse({ status: 200, description: 'Success', type: Book })
  @ApiResponse({ status: 404, description: 'Book not found' })
  deleteBook(@Param('id') id: string): Book {
    const bookId = parseInt(id, 10);
    const bookIndex = this.books.findIndex((book) => book.id === bookId);
    if (bookIndex >= 0) {
      const deletedBook = this.books[bookIndex];
      this.books.splice(bookIndex, 1);
      return deletedBook;
    }
    return null;
  }
}
