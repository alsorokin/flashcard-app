import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
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
  
  constructor() {
    this.loadSettingsFromLocalStorage();
  }

  private loadSettingsFromLocalStorage(): void {
    const settings = JSON.parse(localStorage.getItem('settings') || '{}');
    this._flippedModeEnabled = settings.flippedModeEnabled ?? this._flippedModeEnabled;
  }

  private saveSettingsToLocalStorage(): void {
    localStorage.setItem('settings', JSON.stringify({ flippedModeEnabled: this._flippedModeEnabled }));
  }
}
