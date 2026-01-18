import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, firstValueFrom } from 'rxjs';
import { DEFAULT_LANGUAGE_PAIR_CODE, LanguagePair, LanguagePairCode, Word, collectTags, getLanguagePair } from './words';
import { SettingsService } from './settings.service';

export interface CollectionChangeEvent {
  name: string;
  selected: boolean;
}

export interface WordCollection {
  htmlId: string;
  name: string;
  selected: boolean;
}

/**
 * Service for managing words, language pairs, and user collections.
 */
@Injectable({
  providedIn: 'root'
})
export class WordsService {
  private wordCollections: WordCollection[] = [];
  private collectionsChanged = new Subject<CollectionChangeEvent>();
  collectionsChanged$: Observable<CollectionChangeEvent> = this.collectionsChanged.asObservable();

  private collectionsState = new BehaviorSubject<WordCollection[]>([]);
  collectionsState$ = this.collectionsState.asObservable();

  private selectedWords = new BehaviorSubject<Word[]>([]);
  selectedWords$ = this.selectedWords.asObservable();

  private languagePairState = new BehaviorSubject<LanguagePair>(getLanguagePair(DEFAULT_LANGUAGE_PAIR_CODE));
  languagePair$ = this.languagePairState.asObservable();

  get currentLanguagePair(): LanguagePair {
    return this.currentPair;
  }

  private baseWordsByPair = new Map<LanguagePairCode, Word[]>();
  private customWordsByPair = new Map<LanguagePairCode, Word[]>();
  private currentPair: LanguagePair = getLanguagePair(DEFAULT_LANGUAGE_PAIR_CODE);
  private loadQueue: Promise<void> = Promise.resolve();

  constructor(private http: HttpClient, private settingsService: SettingsService) {
    this.currentPair = getLanguagePair(this.settingsService.languagePairCode);
    this.enqueueLoad(this.currentPair, true);
    this.settingsService.languagePairChanged$.subscribe(code => {
      const nextPair = getLanguagePair(code);
      this.enqueueLoad(nextPair, false);
    });
  }

  /**
   * Ensure the initial (or latest) language pair has been loaded.
   */
  ensureInitialized(): Promise<void> {
    return this.loadQueue;
  }

  //#region Collections
  getWordCollections(): WordCollection[] {
    return this.wordCollections.map(collection => ({ ...collection }));
  }

  setCollectionSelected(name: string, selected: boolean): void {
    const collection = this.wordCollections.find(collection => collection.name === name);
    if (!collection) {
      return;
    }
    collection.selected = selected;
    this.saveCollectionsToLocalStorage(this.currentPair.code);
    this.collectionsChanged.next({ name, selected });
    this.emitCollectionsState();
    this.refreshSelectedWords();
  }

  setAllCollectionsSelected(selected: boolean): void {
    this.wordCollections.forEach(collection => {
      collection.selected = selected;
    });
    this.saveCollectionsToLocalStorage(this.currentPair.code);
    this.wordCollections.forEach(collection => {
      this.collectionsChanged.next({ name: collection.name, selected });
    });
    this.emitCollectionsState();
    this.refreshSelectedWords();
  }
  //#endregion

  //#region Words
  /**
   * Get all words, including base and custom words.
   * If a custom word has the same value as a base word, the custom word will take precedence.
   */
  getAllWords(): Word[] {
    const baseWords = this.getBaseWords();
    return this.mergeWords(baseWords, this.getCustomWords());
  }

  /**
   * Get all words with the provided tag, including base and custom words.
   */
  getAllWordsByTag(tag: string): Word[] {
    return this.mergeWords(
      this.getBaseWordsByTag(tag),
      this.getCustomWords().filter(w => w.tags.includes(tag))
    );
  }

  /**
   * Merge base words and custom words, giving precedence to custom words.
   */
  private mergeWords(baseWords: Word[], customWords: Word[]): Word[] {
    const allWords = [...baseWords];
    for (const customWord of customWords) {
      const i = allWords.findIndex(w => w.value === customWord.value);
      if (i === -1) {
        allWords.push(customWord);
      } else {
        allWords[i] = { ...customWord, audioFileName: allWords[i].audioFileName };
      }
    }
    return allWords;
  }

  /**
   * Get the words in the selected collections.
   */
  getSelectedWords(): Word[] {
    return this.getAllWords().filter(word =>
      this.wordCollections.find(collection => collection.selected && word.tags.includes(collection.name))
    );
  }

  /**
   * Add/remove words to the provided array based on the collection change event.
   * 
   * @param wordsToUpdate {Word[]} The list of words to update.
   * @param collectionChangeEvent {CollectionChangeEvent} The collection change event.
   */
  refreshWordsByEvent(wordsToUpdate: Word[], collectionChangeEvent: CollectionChangeEvent): void {
    if (collectionChangeEvent.selected) {
      const newWords = this.getAllWordsByTag(collectionChangeEvent.name)
        .filter(word => wordsToUpdate.findIndex(w => w.value === word.value) === -1);
      wordsToUpdate.push(...newWords);
    } else {
      for (let i = wordsToUpdate.length - 1; i >= 0; i--) {
        const word = wordsToUpdate[i];
        if (word.tags.includes(collectionChangeEvent.name)) {
          wordsToUpdate.splice(i, 1);
        }
      }
    }
  }

  /**
   * Get a number of random words from the provided array.
   * 
   * @param count {number} The number of random words to get.
   * @param tags {string[]} An array of tags to filter the words by.
   * @param ignored {string[]} An array of words to ignore.
   * @returns {Word[]} An array of random words.
   */
  getRandomWords(words: Word[], count: number, ignored: string[] = []): Word[] {
    if (!words || words.length === 0) {
      return [];
    }
    if (count === undefined || count === null || count <= 0) {
      return [];
    }
    let filteredWords: Word[] = [...words];
    if (ignored && ignored.length > 0) {
      filteredWords = filteredWords.filter(w => !ignored.includes(w.value));
    }
    filteredWords = this.scrambleAndFilterOutSynonyms(filteredWords);
    if (count >= filteredWords.length) {
      return filteredWords.map(w => ({ ...w }));
    }
    const result: Word[] = [];
    let i = 0;
    while (i < count && filteredWords.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredWords.length);
      result.push({ ...filteredWords[randomIndex] });
      filteredWords.splice(randomIndex, 1);
      i++;
    }
    return result;
  }

  private scrambleAndFilterOutSynonyms(words: Word[]): Word[] {
    const result: Word[] = [];
    const values = new Set<string>();
    const translations = new Set<string>();
    const wordsCopy = [...words];
    while (wordsCopy.length > 0) {
      const randomIndex = Math.floor(Math.random() * wordsCopy.length);
      const word = wordsCopy[randomIndex];
      if (!values.has(word.value) && !translations.has(word.translation)) {
        result.push({ ...word });
        values.add(word.value);
        translations.add(word.translation);
      }
      wordsCopy.splice(randomIndex, 1);
    }
    return result;
  }
  //#endregion

  //#region Base Words
  getBaseWords(): Word[] {
    const words = this.baseWordsByPair.get(this.currentPair.code) ?? [];
    return words.map(w => ({ ...w }));
  }

  getBaseWordsByTag(tag: string): Word[] {
    return this.getBaseWords().filter(w => w.tags.includes(tag));
  }
  //#endregion

  //#region Custom Words
  getCustomWords(): Word[] {
    return this.getCustomWordsForPair(this.currentPair.code).map(w => ({ ...w }));
  }

  getCustomTags(): string[] {
    const tags = new Set<string>();
    this.getCustomWords().forEach(w => w.tags.forEach(t => tags.add(t)));
    return Array.from(tags);
  }

  private getCustomTagsForPair(pairCode: LanguagePairCode): string[] {
    const tags = new Set<string>();
    this.getCustomWordsForPair(pairCode).forEach(w => w.tags.forEach(t => tags.add(t)));
    return Array.from(tags);
  }

  updateWord(word: Partial<Word>): void {
    if (!word.value) {
      return;
    }
    const pairCode = this.currentPair.code;
    const customWords = this.getCustomWordsForPair(pairCode);
    const index = customWords.findIndex(w => w.value === word.value);
    if (index !== -1) {
      customWords[index] = { ...customWords[index], ...word } as Word;
    } else {
      customWords.push(word as Word);
    }
    this.setCustomWords(pairCode, customWords);

    if (word.tags) {
      word.tags.forEach(tag => {
        if (!this.wordCollections.find(collection => collection.name === tag)) {
          this.wordCollections.push({
            name: tag,
            htmlId: tag.replaceAll(' ', '_'),
            selected: true,
          });
        }
      });
      this.saveCollectionsToLocalStorage(pairCode);
      this.emitCollectionsState();
    }
    this.refreshSelectedWords();
  }
  //#endregion

  //#region Language pair loading
  private enqueueLoad(pair: LanguagePair, isInitial: boolean): void {
    this.loadQueue = this.loadQueue.then(() => this.loadLanguagePair(pair, isInitial));
  }

  private async loadLanguagePair(pair: LanguagePair, isInitial: boolean): Promise<void> {
    const baseWords = await this.getBaseWordsForPair(pair);
    this.currentPair = pair;
    const baseTags = collectTags(baseWords);
    const customTags = this.getCustomTagsForPair(pair.code);
    const allTags = [...baseTags];
    customTags.forEach(tag => {
      if (!allTags.includes(tag)) {
        allTags.push(tag);
      }
    });
    const savedCollections = this.loadCollectionsFromLocalStorage(pair.code, isInitial);
    this.wordCollections = allTags.map(tag => {
      const savedCollection = savedCollections.find(collection => collection.name === tag);
      return {
        name: tag,
        htmlId: tag.replaceAll(' ', '_'),
        selected: savedCollection ? savedCollection.selected : true,
      };
    });
    this.saveCollectionsToLocalStorage(pair.code);
    this.emitCollectionsState();
    this.languagePairState.next(pair);
    this.refreshSelectedWords();
  }

  private async getBaseWordsForPair(pair: LanguagePair): Promise<Word[]> {
    if (this.baseWordsByPair.has(pair.code)) {
      return this.baseWordsByPair.get(pair.code)!;
    }
    const words = await firstValueFrom(this.http.get<Word[]>(pair.dataPath));
    this.baseWordsByPair.set(pair.code, words);
    return words;
  }
  //#endregion

  //#region Local Storage
  private getCollectionsKey(pairCode: LanguagePairCode): string {
    return `wordCollections:${pairCode}`;
  }

  private getCustomWordsKey(pairCode: LanguagePairCode): string {
    return `customWords:${pairCode}`;
  }

  private loadCollectionsFromLocalStorage(pairCode: LanguagePairCode, allowLegacy = false): WordCollection[] {
    const byPair = localStorage.getItem(this.getCollectionsKey(pairCode));
    if (byPair) {
      return JSON.parse(byPair);
    }
    if (allowLegacy && pairCode === DEFAULT_LANGUAGE_PAIR_CODE) {
      const legacy = localStorage.getItem('wordCollections');
      if (legacy) {
        const parsed = JSON.parse(legacy);
        localStorage.setItem(this.getCollectionsKey(pairCode), legacy);
        return parsed;
      }
    }
    return [];
  }

  private saveCollectionsToLocalStorage(pairCode: LanguagePairCode): void {
    localStorage.setItem(this.getCollectionsKey(pairCode), JSON.stringify(this.wordCollections));
    if (pairCode === DEFAULT_LANGUAGE_PAIR_CODE) {
      localStorage.setItem('wordCollections', JSON.stringify(this.wordCollections));
    }
  }

  private getCustomWordsForPair(pairCode: LanguagePairCode): Word[] {
    if (!this.customWordsByPair.has(pairCode)) {
      this.customWordsByPair.set(pairCode, this.loadCustomWordsFromLocalStorage(pairCode));
    }
    return this.customWordsByPair.get(pairCode) ?? [];
  }

  private setCustomWords(pairCode: LanguagePairCode, words: Word[]): void {
    this.customWordsByPair.set(pairCode, words);
    this.saveCustomWordsToLocalStorage(pairCode, words);
  }

  private loadCustomWordsFromLocalStorage(pairCode: LanguagePairCode): Word[] {
    const byPair = localStorage.getItem(this.getCustomWordsKey(pairCode));
    if (byPair) {
      return JSON.parse(byPair);
    }
    if (pairCode === DEFAULT_LANGUAGE_PAIR_CODE) {
      const legacy = localStorage.getItem('customWords');
      if (legacy) {
        localStorage.setItem(this.getCustomWordsKey(pairCode), legacy);
        return JSON.parse(legacy);
      }
    }
    return [];
  }

  private saveCustomWordsToLocalStorage(pairCode: LanguagePairCode, words: Word[]): void {
    const payload = JSON.stringify(words);
    localStorage.setItem(this.getCustomWordsKey(pairCode), payload);
    if (pairCode === DEFAULT_LANGUAGE_PAIR_CODE) {
      localStorage.setItem('customWords', payload);
    }
  }
  //#endregion

  private emitCollectionsState(): void {
    this.collectionsState.next(this.getWordCollections());
  }

  private refreshSelectedWords(): void {
    this.selectedWords.next(this.getSelectedWords());
  }
}
