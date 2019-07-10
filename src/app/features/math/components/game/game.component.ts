import { Component, OnInit } from '@angular/core';
import { QuestionModel } from '../../models';
import { Store } from '@ngrx/store';
import { MathState, selectQuestionModel, selectAtEndOfQuestion } from '../../reducers';
import { Observable } from 'rxjs';
import { answerProvided } from '../../actions/questions.actions';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  model = {};
  model$: Observable<QuestionModel>;
  atEnd$: Observable<boolean>;
  constructor(private store: Store<MathState>) { }

  ngOnInit() {
    this.model$ = this.store.select(selectQuestionModel);
    this.atEnd$ = this.store.select(selectAtEndOfQuestion);
  }

  next(guessE1: HTMLInputElement) {
    const guess = guessE1.valueAsNumber;
    console.log(`would dispatch with this: ${guess}`);
    this.store.dispatch(answerProvided({ guess }));
    guessE1.value = '';
    guessE1.focus();
  }

}
