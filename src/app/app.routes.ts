import { Routes } from '@angular/router';
import { GameComponent } from './game/game.component';

export const routes: Routes = [
    { path: 'edit', loadComponent: () => import('./collection-editor-reactive/collection-editor-reactive.component').then(m => m.CollectionEditorReactiveComponent) },
    { path: 'edit-reactive', loadComponent: () => import('./collection-editor-reactive/collection-editor-reactive.component').then(m => m.CollectionEditorReactiveComponent) },
    { path: '**', component: GameComponent },
];
