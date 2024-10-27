import { Component } from '@angular/core';
import { getAllTags, WordCollection } from '../words';
import { CommonModule } from '@angular/common';
import { WordsService, CollectionChangeEvent } from '../words.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
  providers: [WordsService]
})
export class SettingsComponent {
  isCollapsed: boolean = true;
  wordCollections: WordCollection[];

  constructor(private wordsService: WordsService) {
    this.wordCollections = wordsService.getWordCollections();
    wordsService.collectionsChanged$.subscribe((event: CollectionChangeEvent) => {
      const collection = this.wordCollections.find(c => c.name === event.name);
      if (collection) {
        collection.selected = event.selected;
      }
    });
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleCollectionSelected(event: Event, collection: WordCollection): void {
    this.wordsService.setCollectionSelected(collection.name, (event.target as HTMLInputElement).checked);
  }
}
