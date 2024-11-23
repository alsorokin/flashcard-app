import { Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { CollectionEditorComponent } from './collection-editor/collection-editor.component';
import { CollectionEditorReactiveComponent } from './collection-editor-reactive/collection-editor-reactive.component';

export const routes: Routes = [
    { path: 'edit', component: CollectionEditorComponent },
    { path: 'edit-reactive', component: CollectionEditorReactiveComponent },
    { path: '**', component: GameComponent },
];
