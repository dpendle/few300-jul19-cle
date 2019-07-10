import { createAction, props } from '@ngrx/store';

export const answerProvided = createAction(
  '[math] answer provided',
  props<{ guess: number }>()
);
