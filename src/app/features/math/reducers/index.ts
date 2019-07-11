import * as fromQuestions from './questions.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QuestionModel } from '../models';

export const featureName = 'mathFeature';

export interface MathState {
  questions: fromQuestions.MathQuestionsState;
}

export const reducers = {
  questions: fromQuestions.reducer
};

// 1. Create feature selector ( that knows how to find the feature in the state)
const selectMathFeature = createFeatureSelector<MathState>(featureName);

// 2. Create a selector for each "branch" of the MathState (e.g., questions)
const selectQuestionsBranch = createSelector(selectMathFeature, m => m.questions);

// 3. Selectors that are "helpers" to get the data you need for step 4
const selectCurrentQuestionId = createSelector(selectQuestionsBranch, q => q.currentQuestionId);
const {
  selectTotal: totalNumberOfQuestions,
  selectEntities: selectQuestionEntities } = fromQuestions.adapter.getSelectors(selectQuestionsBranch);

// 4. Create a selector for each component model
const selectSelectedQuestion = createSelector(
  selectQuestionEntities,
  selectCurrentQuestionId,
  (entities, current) => entities[current]
);

export const selectQuestionModel = createSelector(
  totalNumberOfQuestions,
  selectSelectedQuestion,
  selectCurrentQuestionId,
  (total, selected, currentId) => {
    if (currentId > total) { return null; }
    return {
      num: selected.id,
      of: total,
      question: selected.question
    } as QuestionModel;
  }
);

export const selectAtEndOfQuestion = createSelector(
  totalNumberOfQuestions,
  selectCurrentQuestionId,
  (total, current) => total === current
);

export const selectGameOverMan = createSelector(
  selectQuestionsBranch,
  q => q.missedQuestions.length === 3
);
