import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookinsComponent } from './bookins.component';

describe('BookinsComponent', () => {
  let component: BookinsComponent;
  let fixture: ComponentFixture<BookinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookinsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
