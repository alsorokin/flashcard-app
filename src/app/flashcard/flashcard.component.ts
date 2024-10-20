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
  // TODO: redo the whole words thing. make them a hash map or something
  errors: Map<string, number> = new Map();

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
    const randomWords = this.getRandomWordsOrError(5);
    this.frontOptions = randomWords.options;
    this.frontWord = randomWords.word;
  }

  refreshBack(): void {
    const randomWords = this.getRandomWordsOrError(5);
    this.backOptions = randomWords.options;
    this.backWord = randomWords.word;
  }

  getRandomWordsOrError(count: number): { options: Word[], word: Word } {
    const options = this.getRandomWords(count);
    const randomIndex = Math.floor(Math.random() * options.length);
    let word;
    if (this.shouldGetErrorWord()) {
      word = this.cloneWord(Words.find(w => w.value === this.getTopErrorValueUnsafe())!);
      options[randomIndex] = word;
      if (this.errors.get(word.value)! <= 1) {
        this.errors.delete(word.value);
      } else {
        this.errors.set(word.value, this.errors.get(word.value)! - 1);
      }
    } else {
      word = options[randomIndex];
    }
    return { options, word: word };
  }

  shouldGetErrorWord(): boolean {
    if (this.errors.size === 0) {
      return false;
    }
    const topErrorValue = this.getTopErrorValueUnsafe();
    return this.frontWord.value !== topErrorValue &&
           this.backWord.value !== topErrorValue &&
           Math.random() < 0.5;
  }

  getTopErrorValueUnsafe(): string {
    return this.errors.keys().next().value!;
  }

  checkAnswer(evt:MouseEvent, selectedWord: Word): void {
    const button = evt.target as HTMLButtonElement;
    const currentWord = this.getCurrentWord();
    if (selectedWord.value === this.getCurrentWord().value) {
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
      if (this.errors.has(currentWord.value)) {
        this.errors.set(currentWord.value, this.errors.get(currentWord.value)! + 1);
      } else {
        this.errors.set(currentWord.value, 1);
      }
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
      const random_i = Math.floor(Math.random() * Words.length);
      if (result.find(w => w.value === Words[random_i].value) ||
          result.find(w => w.translation === Words[random_i].translation) ||
          Words[random_i].value === this.frontWord.value) {
        continue;
      }
      result.push(this.cloneWord(Words[random_i]));
      i++;
    }
    return result;
  }
}

interface Word {
  value: string;
  translation: string;
}