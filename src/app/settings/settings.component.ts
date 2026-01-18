import { Component, HostListener, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { WordsService, WordCollection, CollectionChangeEvent } from '../words.service';
import { SettingsService } from '../settings.service';
import { LANGUAGE_PAIRS, LanguagePairCode } from '../words';

@Component({
  selector: 'app-settings',
  imports: [FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  isCollapsed: boolean = true;
  wordCollections: WordCollection[] = [];
  flippedModeEnabled: boolean = true;
  autoPlayEnabled: boolean = true;
  languagePairCode: LanguagePairCode = 'ru-hy';
  languagePairs = LANGUAGE_PAIRS;

  constructor(private wordsService: WordsService,
              private settingsService: SettingsService,
              private eRef: ElementRef) {
    this.languagePairCode = settingsService.languagePairCode;
    this.flippedModeEnabled = settingsService.flippedModeEnabled;
    this.autoPlayEnabled = settingsService.autoPlayEnabled;

    this.settingsService.languagePairChanged$.subscribe(code => {
      this.languagePairCode = code;
    });
    this.settingsService.flippedModeChanged$.subscribe(enabled => {
      this.flippedModeEnabled = enabled;
    });

    this.wordsService.collectionsState$.subscribe(collections => {
      this.wordCollections = collections;
    });
    this.wordsService.collectionsChanged$.subscribe((event: CollectionChangeEvent) => {
      const collection = this.wordCollections.find(c => c.name === event.name);
      if (collection) {
        collection.selected = event.selected;
      }
    });
    this.wordsService.ensureInitialized().then(() => {
      this.wordCollections = this.wordsService.getWordCollections();
    });
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  changeLanguagePair(event: Event): void {
    this.settingsService.languagePairCode = this.languagePairCode;
    this.wordsService.ensureInitialized().then(() => {
      this.wordCollections = this.wordsService.getWordCollections();
    });
  }

  toggleCollectionSelected(event: Event, collection: WordCollection): void {
    this.wordsService.setCollectionSelected(collection.name, (event.target as HTMLInputElement).checked);
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

  toggleAll(on: boolean): void {
    this.wordCollections.forEach(c => c.selected = on);
    this.wordsService.setAllCollectionsSelected(on);
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event): void {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isCollapsed = true;
    }
  }
}
