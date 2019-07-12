import { Component, OnInit } from '@angular/core';
import { SavedScoresModel } from '../../models';
import { Observable } from 'rxjs';
import { MathState, selectSavedScoresModel } from '../../reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-saved-scores',
  templateUrl: './saved-scores.component.html',
  styleUrls: ['./saved-scores.component.scss']
})
export class SavedScoresComponent implements OnInit {
  model$: Observable<SavedScoresModel[]>;
  constructor(private store: Store<MathState>) { }

  ngOnInit() {
    // this.store.dispatch(loadSavedScores());
    this.model$ = this.store.select(selectSavedScoresModel);
  }

}
