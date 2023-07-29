import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';

describe('BooksController', () => {
  let controller: BooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
    }).compile();

    controller = module.get<BooksController>(BooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all books', () => {
    const allBooks = controller.getAllBooks();
    expect(allBooks).toEqual([]);
  });

  it('should create a new book', () => {
    const newBook = {
      title: 'Sample Book',
      author: 'Sample Author',
    };
    const createdBook = controller.createBook(newBook);
    expect(createdBook.title).toBe(newBook.title);
    expect(createdBook.author).toBe(newBook.author);
  });

  it('should get a book by ID', () => {
    const newBook = {
      title: 'Sample Book',
      author: 'Sample Author',
    };
    const createdBook = controller.createBook(newBook);
    const foundBook = controller.getBookById(createdBook.id.toString());
    expect(foundBook).toEqual(createdBook);
  });

  it('should update a book', () => {
    const newBook = {
      title: 'Sample Book',
      author: 'Sample Author',
    };
    const createdBook = controller.createBook(newBook);
    const updatedBook = controller.updateBook(createdBook.id.toString(), {
      title: 'Updated Sample Book',
      author: 'Updated Sample Author',
    });
    expect(updatedBook.title).toBe('Updated Sample Book');
    expect(updatedBook.author).toBe('Updated Sample Author');
  });

  it('should delete a book', () => {
    const newBook = {
      title: 'Sample Book',
      author: 'Sample Author',
    };
    const createdBook = controller.createBook(newBook);
    const deletedBook = controller.deleteBook(createdBook.id.toString());
    expect(deletedBook).toEqual(createdBook);
  });
});
