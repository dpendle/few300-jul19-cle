import { createReducer, Action, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import * as actions from '../actions/saved-scores.actions';

export interface SavedScoreModel {
  id: number;
  who: string;
  right: number;
  wrong: number;
  when: string;
}

export interface SavedScoresState extends EntityState<SavedScoreModel> {

}

export const adapter = createEntityAdapter<SavedScoreModel>();
const initialState: SavedScoresState = adapter.getInitialState();

const reducer = createReducer(
  initialState,
  on(actions.loadSavedScoresSucceeded, (state, action) => adapter.addAll(action.scores, state)),
  on(actions.saveScore, (state, action) => adapter.addOne(action.payload, state)),
  on(actions.saveScoreSucceeded, (state, action) => {
    const tempState = adapter.removeOne(action.oldId, state);
    return adapter.addOne(action.newScore, tempState);
  }),
  on(actions.saveScoreFailed, (state, action) => adapter.removeOne(action.id, state))
);

export function savedScoresReducer(state: SavedScoresState | undefined, action: Action) {
  return reducer(state, action);
}
