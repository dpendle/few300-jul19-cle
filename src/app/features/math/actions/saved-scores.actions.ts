import { createAction, props } from '@ngrx/store';
import { SavedScoreModel } from '../reducers/saved-scores.reducer';

export const loadSavedScores = createAction(
  '[math] load saved scores'
);

export const loadSavedScoresSucceeded = createAction(
  '[math] load saved scores succeeded',
  props<{ scores: SavedScoreModel[] }>()
);

let currentId = 50_000;
export const saveScore = createAction(
  '[math] save score',
  (right: number, wrong: number) => {
    const newScore: SavedScoreModel = {
      right,
      wrong,
      who: 'Jill',
      when: new Date().toISOString(),
      id: currentId++
    };
    return { payload: newScore };
  }
);

export const saveScoreSucceeded = createAction(
  '[math] save score succeeded',
  props<{ oldId: number, newScore: SavedScoreModel }>()
);

export const saveScoreFailed = createAction(
  '[math] save scored failed',
  props<{ id: number, reason: string }>()
);
