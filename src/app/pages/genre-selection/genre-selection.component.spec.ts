import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreSelectionComponent } from './genre-selection.component';

describe('GenreSelectionComponent', () => {
  let component: GenreSelectionComponent;
  let fixture: ComponentFixture<GenreSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenreSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenreSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
