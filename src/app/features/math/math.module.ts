import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MathComponent } from './math.component';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { ScoresComponent } from './components/scores/scores.component';
import { StoreModule } from '@ngrx/store';
import { featureName, reducers } from './reducers';

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
        component: ScoresComponent
      }
    ]
  }
];

@NgModule({
  declarations: [MathComponent, GameComponent, ScoresComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(featureName, reducers)
  ]
})
export class MathModule { }
