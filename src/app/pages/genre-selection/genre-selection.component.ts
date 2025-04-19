import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-genre-selection',
  standalone: true,
  imports: [],
  templateUrl: './genre-selection.component.html',
  styleUrl: './genre-selection.component.scss'
})
export class GenreSelectionComponent {
  // List of available genres
  genres = ['Fiction', 'Drama', 'Humor', 'Politics', 'Philosophy', 'History', 'Adventure'];

  constructor(private router: Router) {}

  // Navigate to book list for selected genre
  selectGenre(genre: string) {
    this.router.navigate(['/books', genre]);
  }
}
