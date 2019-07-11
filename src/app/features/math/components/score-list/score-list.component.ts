import { Component, OnInit, Input } from '@angular/core';
import { ScoresModel } from '../../models';

@Component({
  selector: 'app-score-list',
  templateUrl: './score-list.component.html',
  styleUrls: ['./score-list.component.scss']
})
export class ScoreListComponent implements OnInit {

  @Input() scoresModel: ScoresModel = {
    numberOfCorrect: 0,
    numberOfQuestions: 0,
    numberWrong: 0,
    scores: []
  };
  constructor() { }

  ngOnInit() {
  }

}
