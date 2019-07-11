import { Component, OnInit } from '@angular/core';
import { QuestionModel } from '../../models';
import { Store } from '@ngrx/store';
import { MathState, selectQuestionModel, selectAtEndOfQuestion, selectGameOverMan } from '../../reducers';
import { Observable } from 'rxjs';
import { answerProvided, playAgain } from '../../actions/questions.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {
  model = {};
  model$: Observable<QuestionModel>;
  atEnd$: Observable<boolean>;
  gameOver$: Observable<boolean>;
  constructor(private store: Store<MathState>, private router: Router) { }

  ngOnInit() {
    this.model$ = this.store.select(selectQuestionModel);
    this.atEnd$ = this.store.select(selectAtEndOfQuestion);
    this.gameOver$ = this.store.select(selectGameOverMan);
  }

  next(guessE1: HTMLInputElement) {
    const guess = guessE1.valueAsNumber;
    console.log(`would dispatch with this: ${guess}`);
    this.store.dispatch(answerProvided({ guess }));
    guessE1.value = '';
    guessE1.focus();
  }

  playAgain() {
    this.store.dispatch(playAgain());
  }

  finish(guessE1: HTMLInputElement) {
    const guess = guessE1.valueAsNumber;
    this.store.dispatch(answerProvided({ guess }));
    this.router.navigate(['math', 'scores']);
  }

}
