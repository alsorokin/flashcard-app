import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DEFAULT_LANGUAGE_PAIR_CODE, LanguagePairCode, getLanguagePair } from './words';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  // flipped mode
  private _flippedModeEnabled: boolean = true;
  private flippedModeChanged: Subject<boolean> = new Subject<boolean>();
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

  // language pair
  private _languagePairCode: LanguagePairCode = DEFAULT_LANGUAGE_PAIR_CODE;
  private languagePairChanged = new Subject<LanguagePairCode>();
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
    this._languagePairCode = getLanguagePair(settings.languagePairCode).code;
  }

  private saveSettingsToLocalStorage(): void {
    localStorage.setItem('settings', JSON.stringify({
      flippedModeEnabled: this._flippedModeEnabled,
      autoPlayEnabled: this._autoPlayEnabled,
      languagePairCode: this._languagePairCode,
    }));
  }
}
