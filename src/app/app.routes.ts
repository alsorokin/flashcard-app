import { Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { CollectionEditorComponent } from './collection-editor/collection-editor.component';

export const routes: Routes = [
    { path: 'edit', component: CollectionEditorComponent },
    { path: '**', component: GameComponent },
];
