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
  nextWordTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(private http: HttpClient) {
    this.currentWord = { value: 'բարև', translation: 'привет' };
  }

  ngOnInit(): void {
      this.nextWord();
  }

  nextWord(): void {
    this.words = this.getRandomWords(5);
    const randomIndex = Math.floor(Math.random() * this.words.length);
    this.currentWord = this.words[randomIndex];
  }

  checkAnswer(evt:MouseEvent, selectedTranslation: string): void {
    const button = evt.target as HTMLButtonElement;
    if (selectedTranslation === this.currentWord.translation) {
      button.classList.add('correct');
      if (this.nextWordTimeout == null) {
        this.nextWordTimeout = setTimeout(() => {
          this.nextWord();
          this.nextWordTimeout = null;
        }, 1000);
      }
    } else {
      button.classList.add('incorrect');
    }
  }

  cloneWord(word: Word): Word {
    return { value: word.value, translation: word.translation };
  }

  getRandomWords(count: number): Word[] {
    /*
    this.http.get('https://localhost:7073/words?limit=5').subscribe(data => {
      this.words = data as any[];
      const randomIndex = Math.floor(Math.random() * this.words.length);
      this.currentWord = this.words[randomIndex];
    });
    */
    // for now, just get the words from a local file (../words.ts)
    const result: Word[] = [];
    let i = 0;
    while (i < count) {
      const randomOverallIndex = Math.floor(Math.random() * Words.length);
      if (result.find(w => w.value === Words[randomOverallIndex].value)) {
        continue;
      }
      result.push(this.cloneWord(Words[randomOverallIndex]));
      i++;
    }
    return result;
  }
}

interface Word {
  value: string;
  translation: string;
}