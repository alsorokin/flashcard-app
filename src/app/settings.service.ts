import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DEFAULT_LANGUAGE_PAIR_CODE, LanguagePairCode, getLanguagePair } from './words';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  // flipped mode
  private _flippedModeEnabled: boolean = true;
  private flippedModeChanged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  flippedModeChanged$ = this.flippedModeChanged.asObservable();

  set flippedModeEnabled(value: boolean) {
    this._flippedModeEnabled = value;
    this.saveSettingsToLocalStorage();
    this.flippedModeChanged.next(value);
  }

  get flippedModeEnabled(): boolean {
    return this._flippedModeEnabled;
  }

  // auto play
  private _autoPlayEnabled: boolean = true;

  set autoPlayEnabled(value: boolean) {
    this._autoPlayEnabled = value;
    this.saveSettingsToLocalStorage();
  }

  get autoPlayEnabled(): boolean {
    return this._autoPlayEnabled;
  }

  // correct answers counter
  private _correctAnswersCount: number = 0;
  private correctAnswersCountChanged = new BehaviorSubject<number>(0);
  correctAnswersCountChanged$ = this.correctAnswersCountChanged.asObservable();

  get correctAnswersCount(): number {
    return this._correctAnswersCount;
  }

  incrementCorrectAnswersCount(): void {
    this._correctAnswersCount += 1;
    this.saveSettingsToLocalStorage();
    this.correctAnswersCountChanged.next(this._correctAnswersCount);
  }

  // show/hide counter near settings button
  private _showCorrectAnswersCounter: boolean = false;
  private showCorrectAnswersCounterChanged = new BehaviorSubject<boolean>(false);
  showCorrectAnswersCounterChanged$ = this.showCorrectAnswersCounterChanged.asObservable();

  set showCorrectAnswersCounter(value: boolean) {
    this._showCorrectAnswersCounter = value;
    this.saveSettingsToLocalStorage();
    this.showCorrectAnswersCounterChanged.next(value);
  }

  get showCorrectAnswersCounter(): boolean {
    return this._showCorrectAnswersCounter;
  }

  // language pair
  private _languagePairCode: LanguagePairCode = DEFAULT_LANGUAGE_PAIR_CODE;
  private languagePairChanged = new BehaviorSubject<LanguagePairCode>(DEFAULT_LANGUAGE_PAIR_CODE);
  languagePairChanged$ = this.languagePairChanged.asObservable();

  set languagePairCode(value: LanguagePairCode) {
    this._languagePairCode = getLanguagePair(value).code;
    this.saveSettingsToLocalStorage();
    this.languagePairChanged.next(this._languagePairCode);
  }

  get languagePairCode(): LanguagePairCode {
    return this._languagePairCode;
  }
  
  constructor() {
    this.loadSettingsFromLocalStorage();
  }

  private loadSettingsFromLocalStorage(): void {
    const settings = JSON.parse(localStorage.getItem('settings') || '{}');
    this._flippedModeEnabled = settings.flippedModeEnabled ?? this._flippedModeEnabled;
    this._autoPlayEnabled = settings.autoPlayEnabled ?? this._autoPlayEnabled;
    this._correctAnswersCount = settings.correctAnswersCount ?? this._correctAnswersCount;
    this._showCorrectAnswersCounter = settings.showCorrectAnswersCounter ?? this._showCorrectAnswersCounter;
    this._languagePairCode = getLanguagePair(settings.languagePairCode).code;
    // Emit changes after loading from localStorage so subscribers get the loaded values
    this.flippedModeChanged.next(this._flippedModeEnabled);
    this.languagePairChanged.next(this._languagePairCode);
    this.correctAnswersCountChanged.next(this._correctAnswersCount);
    this.showCorrectAnswersCounterChanged.next(this._showCorrectAnswersCounter);
  }

  private saveSettingsToLocalStorage(): void {
    localStorage.setItem('settings', JSON.stringify({
      flippedModeEnabled: this._flippedModeEnabled,
      autoPlayEnabled: this._autoPlayEnabled,
      correctAnswersCount: this._correctAnswersCount,
      showCorrectAnswersCounter: this._showCorrectAnswersCounter,
      languagePairCode: this._languagePairCode,
    }));
  }
}
