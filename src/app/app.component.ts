import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlashcardComponent } from './flashcard/flashcard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FlashcardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'flashcard-app';
}
