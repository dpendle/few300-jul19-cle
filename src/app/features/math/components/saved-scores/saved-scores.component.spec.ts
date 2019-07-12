import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedScoresComponent } from './saved-scores.component';

describe('SavedScoresComponent', () => {
  let component: SavedScoresComponent;
  let fixture: ComponentFixture<SavedScoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedScoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
