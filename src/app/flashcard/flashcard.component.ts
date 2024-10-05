import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-flashcard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flashcard.component.html',
  styleUrl: './flashcard.component.css'
})
export class FlashcardComponent {
  words: any[] = [];
  currentWord: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('https://localhost:7073/words').subscribe(data => {
      this.words = data as any[];
      this.nextWord();
    });
  }

  nextWord(): void {
    const randomIndex = Math.floor(Math.random() * this.words.length);
    this.currentWord = this.words[randomIndex];
  }

  checkAnswer(selectedTranslation: string): void {
    if (selectedTranslation === this.currentWord.translation) {
      alert('Correct!');
    } else {
      alert('Incorrect!');
    }
    this.nextWord();
  }
}
