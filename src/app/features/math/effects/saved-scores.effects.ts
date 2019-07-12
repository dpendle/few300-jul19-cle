import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as savedScoreActions from '../actions/saved-scores.actions';
import { tap, switchMap, map, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SavedScoreModel } from '../reducers/saved-scores.reducer';
import { of } from 'rxjs';

@Injectable()
export class SavedScoresEffects {

  url: string;

  saveScore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(savedScoreActions.saveScore),
      map(a => a.payload),
      switchMap(org => this.http.post<SavedScoreModel>(this.url, ({ who: org.who, right: org.right, wrong: org.wrong } as ScoresCreate))
        .pipe(
          map(result => savedScoreActions.saveScoreSucceeded({ oldId: org.id, newScore: result })),
          catchError(err => of(savedScoreActions.saveScoreFailed({ id: org.id, reason: 'Bad Request! Cannot save.' })))
        )
      )
    ));

  // loadData action => go to the api, get the data turn that into => loadDAtaSucceeded
  loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(savedScoreActions.loadSavedScores),
      switchMap(() => this.http.get<ScoresDataFromServer>(this.url)
        .pipe(
          map(serverData => serverData.scores),
          map(scores => savedScoreActions.loadSavedScoresSucceeded({ scores }))
        )
      )
    )
  );
  constructor(private actions$: Actions, private http: HttpClient) {
    this.url = environment.savedScoresUrl;
  }
}

interface ScoresDataFromServer {
  scores: SavedScoreModel[];
}

interface ScoresCreate {
  who: string;
  right: number;
  wrong: number;
}
