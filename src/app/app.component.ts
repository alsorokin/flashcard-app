import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlashcardComponent } from './flashcard/flashcard.component';
import { SettingsComponent } from "./settings/settings.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FlashcardComponent, SettingsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'flashcard-app';
}
