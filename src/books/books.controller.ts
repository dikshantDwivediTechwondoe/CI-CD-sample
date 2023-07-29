import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

@Controller('books')
export class BooksController {
  private books: { id: number; title: string; author: string }[] = [];

  @Get()
  getAllBooks() {
    return this.books;
  }

  @Get(':id')
  getBookById(@Param('id') id: string) {
    const bookId = parseInt(id, 10);
    return this.books.find((book) => book.id === bookId);
  }

  @Post()
  createBook(@Body() book: { title: string; author: string }) {
    const newBook = {
      id: this.books.length + 1,
      ...book,
    };
    this.books.push(newBook);
    return newBook;
  }

  @Put(':id')
  updateBook(
    @Param('id') id: string,
    @Body() book: { title: string; author: string },
  ) {
    const bookId = parseInt(id, 10);
    const bookIndex = this.books.findIndex((book) => book.id === bookId);
    if (bookIndex >= 0) {
      this.books[bookIndex] = { ...this.books[bookIndex], ...book };
      return this.books[bookIndex];
    }
    return null;
  }

  @Delete(':id')
  deleteBook(@Param('id') id: string) {
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
