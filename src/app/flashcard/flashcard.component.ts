import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import Words from '../words';

@Component({
  selector: 'app-flashcard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flashcard.component.html',
  styleUrl: './flashcard.component.css'
})
export class FlashcardComponent {
  words: Word[] = [];
  currentWord: Word;

  constructor(private http: HttpClient) {
    this.currentWord = { value: 'բարև', translation: 'привет' };
  }

  ngOnInit(): void {
      this.nextWord();
  }

  nextWord(): void {
    /*
    this.http.get('https://localhost:7073/words?limit=5').subscribe(data => {
      this.words = data as any[];
      const randomIndex = Math.floor(Math.random() * this.words.length);
      this.currentWord = this.words[randomIndex];
    });
    */
    // for now, just get the words from a local file (../words.ts)
    this.words = [];
    for (let i = 0; i < 5; i++) {
      const randomOverallIndex = Math.floor(Math.random() * Words.length);
      this.words.push(Words[randomOverallIndex]);
    }
    const randomIndex = Math.floor(Math.random() * this.words.length);
    this.currentWord = this.words[randomIndex];
  }

  checkAnswer(selectedTranslation: string): void {
    if (selectedTranslation === this.currentWord.translation) {
      alert('Correct!');
    } else {
      alert(`Incorrect! The correct translation is: ${this.currentWord.translation}`);
    }
    this.nextWord();
  }
}

interface Word {
  value: string;
  translation: string;
}