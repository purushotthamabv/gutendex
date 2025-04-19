import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule, InfiniteScrollDirective],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})

export class BookListComponent {
  genre = '';
  books: any[] = [];
  searchQuery = '';
  nextUrl: string | null = null;
  formats: any;
  apiRequest: any;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Get genre from route
    this.genre = this.route.snapshot.paramMap.get('genre') || '';
    this.fetchBooks();
  }

  onSearch() {  
    this.books = [];
    this.nextUrl = null;
    this.fetchBooks();
  }

  // Fetch books by genre or search query, supports pagination
  fetchBooks(pageUrl?: string) {
    if (!pageUrl) this.isLoading = true;
  
    const input = this.searchQuery.trim();
    const idListRegex = /^(\d+\s*,\s*)*\d+$/;
    const langListRegex = /^([a-z]{2}\s*,\s*)*[a-z]{2}$/i;
    const mimeRegex = /^(text|application|image|audio)\/[a-z0-9.+-]*$/i;
  
    // Decide which request to send based on input
    if (idListRegex.test(input)) {
      const ids = input.split(',').map(id => parseInt(id.trim(), 10));
      this.apiRequest = this.bookService.getBooksByIds(ids, pageUrl);
  
    } else if (langListRegex.test(input)) {
      const langs = input.split(',').map(lang => lang.trim().toLowerCase());
      this.apiRequest = this.bookService.getBooksByLanguages(langs, pageUrl);
  
    } else if (mimeRegex.test(input)) {
      const mimeType = input.toLowerCase();
      this.apiRequest = this.bookService.getBooksByMimeType(mimeType, pageUrl);
  
    } else if (input) {
      this.apiRequest = this.bookService.searchBooks(input, pageUrl);
  
    } else {
      this.apiRequest = this.bookService.getBooks(this.genre, pageUrl);
    }
  
    this.apiRequest.subscribe(
      (res: any) => {
        this.books = pageUrl ? [...this.books, ...res.results] : res.results;
        this.nextUrl = res.next;
        this.isLoading = false;
      },
      (err:any) => {
        console.error('API Error:', err);
        this.isLoading = false;
      }
    );
  }

  // Clear search input
  clearSearch() {
    this.searchQuery = '';
    this.books = [];
    this.nextUrl = null;
    this.fetchBooks();
  }

  // Load next page of books
  loadMore() {
    if (this.nextUrl) {
      this.fetchBooks(this.nextUrl);
    }
  }

  // Open book in browser by format priority: HTML > PDF > TXT
  openBook(book: any) {
    this.formats = book.formats;
    const html = this.formats['text/html'];
    const pdf = this.formats['application/pdf'];
    const txt = this.formats['text/plain'];
    const url = html || pdf || txt;

    if (url && !url.endsWith('.zip')) {
      window.open(url, '_blank');
    } else {
      alert('No viewable version available');
    }
  }

  // Navigate back to genre page
  goHome() {
    this.router.navigate(['/']);
  }
}