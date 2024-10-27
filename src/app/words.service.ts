import { Injectable } from '@angular/core';
import { Word, getAllTags, getAllWords, getWordsByTag } from './words';
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
 * Service for managing word collections and hold the state of the selected collections.
 */
@Injectable({
  providedIn: 'root'
})
export class WordsService {
  private wordCollections: WordCollection[];
  private collectionsChanged: Subject<CollectionChangeEvent> = new Subject<CollectionChangeEvent>();

  collectionsChanged$: Observable<CollectionChangeEvent> = this.collectionsChanged.asObservable();

  constructor() {
    const tags = getAllTags();
    let currentIdCount = 0;
    this.wordCollections = tags.map(tag => {
      return {
        name: tag,
        htmlId: 'collection-' + currentIdCount++,
        selected: true,
      };
    });
  }

  getWordCollections(): WordCollection[] {
    // Return a copy of the collections to prevent the original array from being modified.
    return this.wordCollections.map(collection => ({ ...collection }));
  }

  setCollectionSelected(name: string, selected: boolean): void {
    const collection = this.wordCollections.find(collection => collection.name === name);
    if (collection) {
      collection.selected = selected;
      this.collectionsChanged.next({ name: name, selected: selected });
    }
  }

  getWords(): Word[] {
    return getAllWords().filter(word => {
      return this.wordCollections.find(collection => collection.selected && word.tags.includes(collection.name));
    });
  }

  updateWords(words: Word[], collectionChangeEvent: CollectionChangeEvent): void {
    if (collectionChangeEvent.selected) {
      const newWords = getWordsByTag(collectionChangeEvent.name)
        .filter(word => words.findIndex(w => w.value === word.value) === -1);
      words.push(...newWords);
    } else {
      for (let i = words.length - 1; i >= 0; i--) {
        const word = words[i];
        if (word.tags.includes(collectionChangeEvent.name)) {
          words.splice(i, 1);
        }
      }
    }
  }

  /**
   * Get a random word from the list of words.
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
    if (count >= filteredWords.length) {
      return filteredWords.map(w => { return { ...w } });
    }
    const result: Word[] = [];
    let i = 0;
    while (i < count) {
      const random_i = Math.floor(Math.random() * filteredWords.length);
      if (result.find(w => w.value === filteredWords[random_i].value) ||
        result.find(w => w.translation === filteredWords[random_i].translation)) {
        continue;
      }
      result.push({ ...filteredWords[random_i] });
      i++;
    }
    return result;
  }
}
