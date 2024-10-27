import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Word } from '../words';
import { WordsService, CollectionChangeEvent } from '../words.service';

@Component({
  selector: 'app-flashcard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flashcard.component.html',
  styleUrl: './flashcard.component.css'
})
export class FlashcardComponent {
  words: Word[];
  frontOptions: Word[] = [];
  frontWord: Word;
  backOptions: Word[] = [];
  backWord: Word;
  goNextTimeout: ReturnType<typeof setTimeout> | null = null;
  isFlipped:boolean = false;
  errors: Map<string, number> = new Map();

  getCurrentWord(): Word {
    return this.isFlipped ? this.backWord : this.frontWord;
  }

  getCurrentOptions(): Word[] {
    return this.isFlipped ? this.frontOptions : this.backOptions;
  }

  constructor(private wordsService: WordsService) {
    this.frontWord = { value: 'բարև', translation: 'привет', tags: [ 'greeting' ] };
    this.backWord = { value: 'բարև', translation: 'привет', tags: [ 'greeting '] };
    this.words = [];
  }

  ngOnInit(): void {
    this.words = this.wordsService.getWords();
    this.wordsService.collectionsChanged$.subscribe((event: CollectionChangeEvent) => {
      this.wordsService.updateWords(this.words, event);
      this.refreshFront();
      this.refreshBack();
      this.errors.clear();
    });
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
    if (this.words.length === 0) {
      return { options: [], word: { value: 'Нажмите на ⚙ и выберите категорию', translation: '', tags: [] } };
    }
    const options = this.wordsService.getRandomWords(this.words, count, [this.frontWord.value, this.backWord.value]);
    const randomIndex = Math.floor(Math.random() * options.length);
    let word;
    if (this.shouldGetErrorWord()) {
      word = {...(this.words.find(w => w.value === this.getTopErrorValueUnsafe())!)};
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
}
