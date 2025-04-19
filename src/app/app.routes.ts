import { Routes } from '@angular/router';
import { BookListComponent } from './pages/book-list/book-list.component';
import { GenreSelectionComponent } from './pages/genre-selection/genre-selection.component';

export const routes: Routes = [
    { path: '', component: GenreSelectionComponent },
    { path: 'books/:genre', component: BookListComponent },
    { path: '**', redirectTo: '' }
];

