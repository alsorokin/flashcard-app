import { Injectable } from '@angular/core';
import { WordCollection, getAllTags } from './words';
import { Subject, Observable } from 'rxjs';

export interface CollectionChangeEvent {
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
    this.wordCollections = tags.map(tag => {
      return {
        name: tag,
        selected: true,
      };
    });
  }

  getWordCollections(): WordCollection[] {
    // Return a copy of the collections to prevent the original array from being modified.
    return this.wordCollections.map(collection => ({ ...collection }));
  }

  setCollectionSelected(tag: string, selected: boolean): void {
    const collection = this.wordCollections.find(collection => collection.name === tag);
    if (collection) {
      collection.selected = selected;
      this.collectionsChanged.next({ name: tag, selected: selected });
    }
  }
}
