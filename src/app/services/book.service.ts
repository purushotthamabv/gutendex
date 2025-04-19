import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private BASE_URL = `${environment.gutendexApiBaseUrl}/books`;

  constructor(private http: HttpClient) {}

   // Get books by genre (with images), supports pagination
   getBooks(genre: string, pageUrl?: string): Observable<any> {
    const url = pageUrl
      ? pageUrl
      : `${this.BASE_URL}?topic=${encodeURIComponent(genre)}`;
    return this.http.get<any>(url);
  }

  // Search books by genre and query (with images), supports pagination
  searchBooks(query: string, pageUrl?: string): Observable<any> {
    const url = pageUrl
      ? pageUrl
      : `${this.BASE_URL}?search=${encodeURIComponent(query)}`;
    return this.http.get<any>(url);
  }

  // Search books by ID
  getBooksByIds(ids: number[], pageUrl?: string): Observable<any> {
    const idString = ids.join(',');
    const url = pageUrl
      ? `${this.BASE_URL}?ids=${idString}`
      : `${this.BASE_URL}?ids=${idString}`;

    return this.http.get<any>(url);
  }
  
// Get books by Languages
  getBooksByLanguages(languages: string[], pageUrl?: string): Observable<any> {
    const langString = languages.map(l => l.trim()).join(',');
    const url = pageUrl
      ? pageUrl
      : `${this.BASE_URL}?languages=${langString}`;
  
    return this.http.get<any>(url);
  }

  // Get books by MIME type (supports partial match like "text/")
  getBooksByMimeType(mimeType: string, pageUrl?: string): Observable<any> {
    const encodedMime = encodeURIComponent(mimeType);
    const url = pageUrl
      ? pageUrl
      : `${this.BASE_URL}?mime_type=${encodedMime}`;

    return this.http.get<any>(url);
  }
}