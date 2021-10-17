import { Component, OnInit } from '@angular/core';
import { Book } from "../../models/book.model";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { AuthenticationService } from "../../services/authentication.service";
import { BookService } from "../../services/book.service";
import { PurchaseService } from "../../services/purchase.service";
import { Purchase } from "../../models/purchase.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  bookList: Array<Book> = [];
  faBook = faBook;
  successMessage: string = "";
  errorMessage: string = "";

  constructor(private authenticationService: AuthenticationService,
              private bookService: BookService,
              private purchaseService: PurchaseService) {
  }

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe(data => {
      this.bookList = data;
    });
  }

  purchase(book: Book) {
    if (!this.authenticationService.getCurrentUserValue()?.id) {
      this.errorMessage = 'You should log in to buy a book.';
      return;
    }
    const purchase = new Purchase(this.authenticationService.getCurrentUserValue().id, book.id, book.price);
    this.purchaseService.savePurchase(purchase).subscribe(data => {
      this.successMessage = 'Mission is completed.';
    }, err => {
      this.errorMessage = 'Unexpected error occurred.';
    });
  }

}
