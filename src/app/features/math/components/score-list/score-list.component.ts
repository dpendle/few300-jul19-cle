import { Component, OnInit, Input } from '@angular/core';
import { ScoresModel } from '../../models';
import { Store } from '@ngrx/store';
import { MathState } from '../../reducers';
import * as actions from '../../actions/saved-scores.actions';

@Component({
  selector: 'app-score-list',
  templateUrl: './score-list.component.html',
  styleUrls: ['./score-list.component.scss']
})
export class ScoreListComponent implements OnInit {

  @Input() scoresModel: ScoresModel = {
    numberCorrect: 0,
    numberOfQuestions: 0,
    numberWrong: 0,
    scores: []
  };
  saved = false;
  constructor(private store: Store<MathState>) { }

  ngOnInit() {
  }

  saveScores() {
    this.store.dispatch(actions.saveScore(this.scoresModel.numberCorrect, this.scoresModel.numberWrong));
    this.saved = true;
  }

}
