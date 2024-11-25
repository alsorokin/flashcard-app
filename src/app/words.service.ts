import { Injectable } from '@angular/core';
import { Word, getBaseTags, getBaseWords, getBaseWordsByTag } from './words';
import { Subject, Observable } from 'rxjs';

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
 * Service for managing words and word collections and hold the state of the selected collections.
 */
@Injectable({
  providedIn: 'root'
})
export class WordsService {
  private wordCollections: WordCollection[];
  private collectionsChanged: Subject<CollectionChangeEvent> = new Subject<CollectionChangeEvent>();

  collectionsChanged$: Observable<CollectionChangeEvent> = this.collectionsChanged.asObservable();

  constructor() {
    const baseTags = getBaseTags();
    const customTags = this.getCustomTags();
    const tags = [...baseTags, ...customTags];
    const savedCollections = this.loadCollectionsFromLocalStorage();
    this.wordCollections = tags.map(tag => {
      const savedCollection = savedCollections.find(collection => collection.name === tag);
      return {
        name: tag,
        htmlId: tag.replaceAll(' ', '_'),
        selected: savedCollection ? savedCollection.selected : true,
      };
    });
  }

  //#region Collections
  getWordCollections(): WordCollection[] {
    // Return a copy of the collections to prevent the original array from being modified.
    return this.wordCollections.map(collection => ({ ...collection }));
  }

  setCollectionSelected(name: string, selected: boolean): void {
    const collection = this.wordCollections.find(collection => collection.name === name);
    if (collection) {
      collection.selected = selected;
      this.saveCollectionsToLocalStorage();
      this.collectionsChanged.next({ name: name, selected: selected });
    }
  }
  //#endregion

  //#region Words
  /**
   * Get all words, including base and custom words.
   * If a custom word has the same value as a base word, the custom word will be returned.
   * 
   * @returns {Word[]} An array of all words, including base and custom words.
   */
  getAllWords(): Word[] {
    const allWords = getBaseWords();
    const customWords = this.getCustomWords();
    for (const customWord of customWords) {
      const i = allWords.findIndex(w => w.value === customWord.value);
      if (i !== -1) {
        allWords.splice(i, 1);
      }
    }
    allWords.push(...customWords);

    return allWords;
  }

  getAllWordsByTag(tag: string): Word[] {
    return this.getAllWords().filter(word => word.tags.includes(tag));
  }

  /**
   * Get the words in the selected collections.
   */
  getSelectedWords(): Word[] {
    return this.getAllWords().filter(word => {
      return this.wordCollections.find(collection => collection.selected && word.tags.includes(collection.name));
    });
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
      return filteredWords.map(w => { return { ...w } });
    }
    const result: Word[] = [];
    let i = 0;
    while (i < count && filteredWords.length > 0) {
      const random_i = Math.floor(Math.random() * filteredWords.length);
      result.push({ ...filteredWords[random_i] });
      filteredWords.splice(random_i, 1);
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
      const random_i = Math.floor(Math.random() * wordsCopy.length);
      const word = wordsCopy[random_i];
      if (!values.has(word.value) && !translations.has(word.translation)) {
        result.push({ ...word });
        values.add(word.value);
        translations.add(word.translation);
      }
      wordsCopy.splice(random_i, 1);
    }

    return result;
  }
  //#endregion

  //#region Base Words
  getBaseWords(): Word[] {
    return getBaseWords();
  }
  //#endregion

  //#region Custom Words
  private _customWords: Word[] | null = null;

  getCustomWords(): Word[] {
    return this._customWords ?? (this._customWords = this.loadCustomWordsFromLocalStorage());
  }

  getCustomTags(): string[] {
    const tags = new Set<string>();
    this.getCustomWords().forEach(w => w.tags.forEach(t => tags.add(t)));
    return Array.from(tags);
  }

  updateWord(word: Partial<Word>): void {
    if (!word.value) {
      return;
    }
    const customWords = this.getCustomWords();
    const i = customWords.findIndex(w => w.value === word.value);
    if (i !== -1) {
      customWords[i] = { ...customWords[i], ...word };
    } else {
      customWords.push(word as Word);
    }
    this.setCustomWords(customWords);
  }

  private setCustomWords(words: Word[]): void {
    this._customWords = words;
    this.saveCustomWordsToLocalStorage(words);
  }
  //#endregion

  //#region Local Storage
  private loadCollectionsFromLocalStorage(): WordCollection[] {
    const collections = localStorage.getItem('wordCollections');
    return collections ? JSON.parse(collections) : [];
  }

  private saveCollectionsToLocalStorage(): void {
    localStorage.setItem('wordCollections', JSON.stringify(this.wordCollections));
  }

  private loadCustomWordsFromLocalStorage(): Word[] {
    const customWords = localStorage.getItem('customWords');
    return customWords ? JSON.parse(customWords) : [];
  }

  private saveCustomWordsToLocalStorage(words: Word[]): void {
    localStorage.setItem('customWords', JSON.stringify(words));
  }
  //#endregion
}
