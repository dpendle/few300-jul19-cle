import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import * as questionActions from '../actions/questions.actions';
import { tassign } from 'tassign';

export interface QuestionEntity {
  id: number;
  question: string;
  answer: number;
}

interface MissedQuestions {
  id: number;
  providedAnswer: number;
}

export interface MathQuestionsState extends EntityState<QuestionEntity> {
  currentQuestionId: number;
  missedQuestions: MissedQuestions[];
}

const initialState: MathQuestionsState = {
  currentQuestionId: 4,
  missedQuestions: [],
  ids: [1, 2, 3, 4, 5],
  entities: {
    1: {
      id: 1,
      question: '1 + 1',
      answer: 2
    },
    2: {
      id: 2,
      question: '3 * 3',
      answer: 9
    },
    3: {
      id: 3,
      question: '18 - 2',
      answer: 16
    },
    4: {
      id: 4,
      question: '32 / 2',
      answer: 16
    },
    5: {
      id: 5,
      question: '20 - 5',
      answer: 15
    }
  }
};

export const adapter = createEntityAdapter<QuestionEntity>();

export const mathReducer = createReducer(
  initialState,
  on(questionActions.playAgain, () => initialState),
  on(questionActions.answerProvided, (state, action) => {
    let tempState = { ...state };
    const currentQuestion = state.entities[state.currentQuestionId];
    if (action.guess !== currentQuestion.answer) {
      tempState = { ...tempState, missedQuestions: [...state.missedQuestions, { id: currentQuestion.id, providedAnswer: action.guess }] };
    }
    // const newState = ({ ...tempState, currentQuestionId: state.currentQuestionId + 1 });
    const newState = tassign(tempState, { currentQuestionId: state.currentQuestionId + 1 });
    return newState;
  })
);

export function reducer(state: MathQuestionsState | undefined, action: Action) {
  return mathReducer(state, action);
}
