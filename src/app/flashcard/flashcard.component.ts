import { Component, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Word } from '../words';
import { WordsService, CollectionChangeEvent } from '../words.service';
import keybindings from '../keybindings';
import { SettingsService } from '../settings.service';

enum GameMode {
  Flashcard,
  ReverseFlashcard,
}

interface WordOption {
  word: Word;
  isCorrect: boolean | undefined;
}

@Component({
  selector: 'app-flashcard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flashcard.component.html',
  styleUrl: './flashcard.component.css'
})
export class FlashcardComponent implements AfterViewInit {
  GameMode = GameMode;
  words: Word[] = [];
  frontOptions: WordOption[] = [];
  frontWord: Word = { value: 'բարև', translation: 'привет', tags: [ 'greeting' ] };
  backOptions: WordOption[] = [];
  backWord: Word = { value: 'բարև', translation: 'привет', tags: [ 'greeting '] };
  goNextTimeout: ReturnType<typeof setTimeout> | null = null;
  isFlipped:boolean = false;
  errors: Map<string, number> = new Map();
  frontGameMode: GameMode = GameMode.Flashcard;
  backGameMode: GameMode = GameMode.ReverseFlashcard;

  @ViewChild('flashcardBackContainer') flashcardBackContainer!: ElementRef;
  @ViewChild('flashcardFrontContainer') flashcardFrontContainer!: ElementRef;

  getCurrentWord(): Word {
    return this.isFlipped ? this.backWord : this.frontWord;
  }

  getCurrentOptions(): WordOption[] {
    return this.isFlipped ? this.frontOptions : this.backOptions;
  }

  constructor(private wordsService: WordsService,
              private settingsService: SettingsService,
  ) { }

  ngOnInit(): void {
    this.words = this.wordsService.getSelectedWords();
    this.refreshFront();
    this.refreshBack();

    this.wordsService.collectionsChanged$.subscribe((event: CollectionChangeEvent) => {
      this.wordsService.refreshWordsByEvent(this.words, event);
      this.refreshAll();
    });

    this.settingsService.flippedModeChanged$.subscribe(this.refreshAll.bind(this));
  }

  ngAfterViewInit(): void {
    this.focusFrontContainer();
  }

  private goNext(): void {
    this.isFlipped = !this.isFlipped;
    if (this.isFlipped) {
      setTimeout(() => {
        this.refreshFront();
        this.focusBackContainer();
        if (this.settingsService.autoPlayEnabled) {
          this.playSound();
        }
      }, 500);
    } else {
      setTimeout(() => {
        this.refreshBack();
        this.focusFrontContainer();
        if (this.settingsService.autoPlayEnabled) {
          this.playSound();
        }
      }, 500);
    }
  }

  private focusFrontContainer(): void {
    this.flashcardFrontContainer.nativeElement.focus();
  }

  private focusBackContainer(): void {
    this.flashcardBackContainer.nativeElement.focus();
  }

  private refreshAll(): void {
    this.refreshFront();
    this.refreshBack();
    this.errors.clear();
    this.isFlipped = false;
    this.focusFrontContainer();
  }

  private refreshFront(): void {
    const randomWords = this.getRandomWordsOrError(5);
    this.frontOptions = randomWords.options;
    this.frontWord = randomWords.word;
    if (this.settingsService.flippedModeEnabled) {
      this.frontGameMode = Math.random() < 0.5 ? GameMode.Flashcard : GameMode.ReverseFlashcard;
    } else {
      this.frontGameMode = GameMode.Flashcard;
    }
  }

  private refreshBack(): void {
    const randomWords = this.getRandomWordsOrError(5);
    this.backOptions = randomWords.options;
    this.backWord = randomWords.word;
    if (this.settingsService.flippedModeEnabled) {
      this.backGameMode = Math.random() < 0.5 ? GameMode.Flashcard : GameMode.ReverseFlashcard;
    } else {
      this.backGameMode = GameMode.Flashcard;
    }
  }

  private getRandomWordsOrError(count: number): { options: WordOption[], word: Word } {
    if (this.words.length < 5) {
      const placeholderText = 'Нажмите на ⚙ и выберите категорию с 5 или более словами';
      return { options: [], word: { value: placeholderText, translation: placeholderText, tags: [] } };
    }
    const options = this.wordsService
      .getRandomWords(this.words, count, [this.frontWord.value, this.backWord.value])
      .map(word => ({ word, isCorrect: undefined }));
    const randomIndex = Math.floor(Math.random() * options.length);
    let word : Word;
    if (this.shouldGetErrorWord()) {
      word = {...(this.words.find(w => w.value === this.getTopErrorValueUnsafe())!)};
      if (!options.find(w => w.word.translation === word.translation)) {
        options[randomIndex] = { word: word, isCorrect: undefined };
      }
      if (this.errors.get(word.value)! <= 1) {
        this.errors.delete(word.value);
      } else {
        this.errors.set(word.value, this.errors.get(word.value)! - 1);
      }
    } else {
      word = options[randomIndex].word;
    }
    return { options, word: word };
  }

  private shouldGetErrorWord(): boolean {
    if (this.errors.size === 0) {
      return false;
    }
    const topErrorValue = this.getTopErrorValueUnsafe();
    return this.frontWord.value !== topErrorValue &&
           this.backWord.value !== topErrorValue &&
           Math.random() < 0.5;
  }

  private getTopErrorValueUnsafe(): string {
    return this.errors.keys().next().value!;
  }

  checkAnswer(selectedOption: WordOption): void {
    const currentWord = this.getCurrentWord();
    if (selectedOption.word.value === this.getCurrentWord().value) {
      selectedOption.isCorrect = true;
      if (this.goNextTimeout == null) {
        this.goNextTimeout = setTimeout(() => {
          this.goNext();
          this.goNextTimeout = null;
        }, 1000);
      }
    } else {
      selectedOption.isCorrect = false;
      if (this.errors.has(currentWord.value)) {
        this.errors.set(currentWord.value, this.errors.get(currentWord.value)! + 1);
      } else {
        this.errors.set(currentWord.value, 1);
      }
    }
  }

  playSound(): void {
    if (this.isFlipped) {
      if (this.backGameMode !== GameMode.Flashcard) {
        return;
      }
    } else {
      if (this.frontGameMode !== GameMode.Flashcard) {
        return;
      }
    }
    if (!this.getCurrentWord().audioFileName) {
      return;
    }
    const audioUrl = `audio/${this.getCurrentWord().audioFileName}`;
    const audio = new Audio(audioUrl);
    audio.play();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    const key = event.key;
    if (keybindings.has(key)) {
      const option = keybindings.get(key)!;
      if (option.startsWith('option')) {
        const optionIndex = parseInt(option.split(' ')[1]) - 1;
        if (optionIndex < this.getCurrentOptions().length) {
          const buttons = document.querySelectorAll('.word-button');
          const visibleButtons = Array.from(buttons).filter(button => button.getAttribute('tabindex') === '0');
          const button = visibleButtons[optionIndex] as HTMLButtonElement;
          if (button) {
            button.focus();
          }
        }
      }
    }
  }
}
