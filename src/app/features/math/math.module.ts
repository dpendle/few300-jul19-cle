import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MathComponent } from './math.component';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { ScoresComponent } from './components/scores/scores.component';
import { StoreModule } from '@ngrx/store';
import { featureName, reducers } from './reducers';
import { ScoreListComponent } from './components/score-list/score-list.component';
import { GameOverGuard } from './guards/game-over.guard';
import { SavedScoresComponent } from './components/saved-scores/saved-scores.component';
import { SavedScoresEffects } from './effects/saved-scores.effects';
import { EffectsModule } from '@ngrx/effects';

const routes: Routes = [
  {
    path: 'math',
    component: MathComponent,
    children: [
      {
        path: '',
        redirectTo: 'game',
        pathMatch: 'full'
      },
      {
        path: 'game',
        component: GameComponent
      },
      {
        path: 'scores',
        component: ScoresComponent,
        canActivate: [GameOverGuard]
      },
      {
        path: 'saved-scores',
        component: SavedScoresComponent
      }
    ]
  }
];

@NgModule({
  declarations: [MathComponent, GameComponent, ScoresComponent, ScoreListComponent, SavedScoresComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(featureName, reducers),
    EffectsModule.forFeature([SavedScoresEffects])
  ]
})
export class MathModule { }
