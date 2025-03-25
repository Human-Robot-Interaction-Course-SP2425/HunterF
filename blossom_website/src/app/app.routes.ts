import { Routes } from '@angular/router';
import { GesturesComponent } from './gestures/gestures.component';
import { BlocklyComponent } from './blockly/blockly.component';
import { VideosComponent } from './videos/videos.component';
export const routes: Routes = [
  {
    path: 'gestures',
    component: GesturesComponent
  },
  {
    path: 'blockly',
    component: BlocklyComponent
  },
  {
    path: 'videos',
    component: VideosComponent,
  },
  {
    path: '**',
    redirectTo: 'gestures',
  },
];
