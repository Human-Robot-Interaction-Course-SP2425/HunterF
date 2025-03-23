import { Routes } from '@angular/router';
import { GesturesComponent } from './gestures/gestures.component';
import { BlocklyComponent } from './blockly/blockly.component';

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
    path: '**',
    redirectTo: 'gestures',
  },
];
