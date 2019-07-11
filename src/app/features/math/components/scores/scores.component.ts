import { Component, OnInit } from '@angular/core';
import { ScoresModel } from '../../models';
import { Observable } from 'rxjs';
import { selectScoresModel, MathState } from '../../reducers';
import { Store } from '@ngrx/store';
import { playAgain } from '../../actions/questions.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss']
})
export class ScoresComponent implements OnInit {

  scoresModel$: Observable<ScoresModel>;

  constructor(private store: Store<MathState>, private router: Router) { }

  ngOnInit() {
    this.scoresModel$ = this.store.select(selectScoresModel);
  }

  playAgain() {
    this.store.dispatch(playAgain());
    this.router.navigate(['math', 'game']);
  }
}
