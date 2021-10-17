import { Component, OnInit, ViewChild } from '@angular/core';
import { Book } from "../../models/book.model";
import { BookService } from "../../services/book.service";
import { BookComponent } from "../book/book.component";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  bookList: Array<Book> = [];
  selectedBook: Book = new Book();
  errorMessage: string = "";

  @ViewChild(BookComponent) child: BookComponent | undefined;

  constructor(private bookService: BookService) {
  }

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe(data => {
      this.bookList = data;
    });
  }

  createBookRequest() {
    this.selectedBook = new Book();
    this.child?.showBookModal();
  }

  editBookRequest(book: Book) {
    this.selectedBook = Object.assign({}, book);
    this.child?.showBookModal();
  }

  saveBookWatcher(book: Book) {
    let bookIndex = this.bookList.findIndex(b => b.id === book.id);
    if (bookIndex !== -1) {
      this.bookList[bookIndex] = book;
    } else {
      this.bookList.push(book);
    }
  }

  deleteBook(book: Book, idx: number) {
    this.bookService.deleteBook(book).subscribe(data => {
      this.bookList.splice(idx, 1);
    }, err => {
      this.errorMessage = 'Unexpected error occurred.';
    });
  }

}
