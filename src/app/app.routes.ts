import { Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { CollectionEditorReactiveComponent } from './collection-editor-reactive/collection-editor-reactive.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
    { path: 'edit', component: CollectionEditorReactiveComponent },
    { path: 'edit-reactive', component: CollectionEditorReactiveComponent },
    { path: 'search/:langPair', component: SearchComponent },
    { path: '**', component: GameComponent },
];
