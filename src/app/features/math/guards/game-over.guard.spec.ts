import { TestBed, async, inject } from '@angular/core/testing';

import { GameOverGuard } from './game-over.guard';

describe('GameOverGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameOverGuard]
    });
  });

  it('should ...', inject([GameOverGuard], (guard: GameOverGuard) => {
    expect(guard).toBeTruthy();
  }));
});
