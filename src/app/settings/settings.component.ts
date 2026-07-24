import { Component, HostListener, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { WordsService, WordCollection, CollectionChangeEvent } from '../words.service';
import { SettingsService } from '../settings.service';
import { LANGUAGE_PAIRS, LanguagePairCode } from '../words';

@Component({
  selector: 'app-settings',
  imports: [FormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  isCollapsed: boolean = true;
  wordCollections: WordCollection[] = [];
  selectedCollectionNames: string[] = [];
  selectedWordsCount: number = 0;
  totalWordsCount: number = 0;
  flippedModeEnabled: boolean = true;
  autoPlayEnabled: boolean = true;
  correctAnswersCount: number = 0;
  showCorrectAnswersCounter: boolean = false;
  languagePairCode: LanguagePairCode = 'ru-hy';
  languagePairs = LANGUAGE_PAIRS;

  constructor(private wordsService: WordsService,
              private settingsService: SettingsService,
              private eRef: ElementRef) {
    this.languagePairCode = settingsService.languagePairCode;
    this.flippedModeEnabled = settingsService.flippedModeEnabled;
    this.autoPlayEnabled = settingsService.autoPlayEnabled;
    this.correctAnswersCount = settingsService.correctAnswersCount;
    this.showCorrectAnswersCounter = settingsService.showCorrectAnswersCounter;

    this.settingsService.languagePairChanged$.subscribe(code => {
      this.languagePairCode = code;
    });
    this.settingsService.flippedModeChanged$.subscribe(enabled => {
      this.flippedModeEnabled = enabled;
    });
    this.settingsService.correctAnswersCountChanged$.subscribe(count => {
      this.correctAnswersCount = count;
    });
    this.settingsService.showCorrectAnswersCounterChanged$.subscribe(show => {
      this.showCorrectAnswersCounter = show;
    });

    this.wordsService.collectionsState$.subscribe(collections => {
      this.wordCollections = collections;
      this.syncSelectedCollectionNames();
    });
    this.wordsService.selectedWords$.subscribe(selectedWords => {
      this.selectedWordsCount = selectedWords.length;
      this.totalWordsCount = this.wordsService.getAllWords().length;
    });
    this.wordsService.collectionsChanged$.subscribe((event: CollectionChangeEvent) => {
      const collection = this.wordCollections.find(c => c.name === event.name);
      if (collection) {
        collection.selected = event.selected;
        this.syncSelectedCollectionNames();
      }
    });
    this.wordsService.ensureInitialized().then(() => {
      this.wordCollections = this.wordsService.getWordCollections();
      this.syncSelectedCollectionNames();
    });
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  changeLanguagePair(event: Event): void {
    this.settingsService.languagePairCode = this.languagePairCode;
    this.wordsService.ensureInitialized().then(() => {
      this.wordCollections = this.wordsService.getWordCollections();
      this.syncSelectedCollectionNames();
    });
  }

  updateSelectedCollections(selectedNames: string[]): void {
    const selectedNameSet = new Set(selectedNames);
    this.wordCollections.forEach(collection => {
      const selected = selectedNameSet.has(collection.name);
      if (collection.selected !== selected) {
        collection.selected = selected;
        this.wordsService.setCollectionSelected(collection.name, selected);
      }
    });
    this.syncSelectedCollectionNames();
  }

  toggleFlippedMode(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.settingsService.flippedModeEnabled = target.checked;
    this.flippedModeEnabled = target.checked;
  }

  toggleAutoPlay(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.settingsService.autoPlayEnabled = target.checked;
    this.autoPlayEnabled = target.checked;
  }

  toggleShowCorrectAnswersCounter(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.settingsService.showCorrectAnswersCounter = target.checked;
    this.showCorrectAnswersCounter = target.checked;
  }

  toggleAll(on: boolean): void {
    this.wordCollections.forEach(c => c.selected = on);
    this.syncSelectedCollectionNames();
    this.wordsService.setAllCollectionsSelected(on);
  }

  private syncSelectedCollectionNames(): void {
    this.selectedCollectionNames = this.wordCollections
      .filter(collection => collection.selected)
      .map(collection => collection.name);
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event): void {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isCollapsed = true;
    }
  }
}
