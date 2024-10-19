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
  frontOptions: Word[] = [];
  frontWord: Word;
  backOptions: Word[] = [];
  backWord: Word;
  goNextTimeout: ReturnType<typeof setTimeout> | null = null;
  isFlipped:boolean = false;

  getCurrentWord(): Word {
    return this.isFlipped ? this.backWord : this.frontWord;
  }

  getCurrentOptions(): Word[] {
    return this.isFlipped ? this.frontOptions : this.backOptions;
  }

  constructor(private http: HttpClient) {
    this.frontWord = { value: 'բարև', translation: 'привет' };
    this.backWord = { value: 'բարև', translation: 'привет' };
  }

  ngOnInit(): void {
    this.refreshFront();
    this.refreshBack();
  }

  goNext(): void {
    if (this.isFlipped) {
      setTimeout(() => {
        this.refreshFront();
      }, 500);
    } else {
      setTimeout(() => {
        this.refreshBack();
      }, 500);
    }
  }

  refreshFront(): void {
    this.frontOptions = this.getRandomWords(5);
    const randomIndex = Math.floor(Math.random() * this.frontOptions.length);
    this.frontWord = this.frontOptions[randomIndex];
  }

  refreshBack(): void {
    this.backOptions = this.getRandomWords(5);
    const randomIndex = Math.floor(Math.random() * this.backOptions.length);
    this.backWord = this.backOptions[randomIndex];
  }

  checkAnswer(evt:MouseEvent, selectedTranslation: string): void {
    const button = evt.target as HTMLButtonElement;
    if (selectedTranslation === this.getCurrentWord().translation) {
      button.classList.add('correct');
      if (this.goNextTimeout == null) {
        this.goNextTimeout = setTimeout(() => {
          this.isFlipped = !this.isFlipped;
          this.goNext();
          this.goNextTimeout = null;
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
    if (count >= Words.length) {
      return Words.map(w => this.cloneWord(w));
    }
    const result: Word[] = [];
    let i = 0;
    while (i < count) {
      const randomOverallIndex = Math.floor(Math.random() * Words.length);
      if (result.find(w => w.value === Words[randomOverallIndex].value) ||
          Words[randomOverallIndex].value === this.frontWord.value) {
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