import { Component } from '@angular/core';
import { FlashcardComponent } from '../flashcard/flashcard.component';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [FlashcardComponent, SettingsComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {

}
