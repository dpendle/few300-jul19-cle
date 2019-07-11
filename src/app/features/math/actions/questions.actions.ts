import { createAction, props } from '@ngrx/store';

export const answerProvided = createAction(
  '[math] answer provided',
  props<{ guess: number }>()
);

export const playAgain = createAction(
  '[math] play Again'
);
