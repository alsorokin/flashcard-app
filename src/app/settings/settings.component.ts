import { Component, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordsService, WordCollection, CollectionChangeEvent } from '../words.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  isCollapsed: boolean = true;
  wordCollections: WordCollection[];

  constructor(private wordsService: WordsService, private eRef: ElementRef) {
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

  @HostListener('document:click', ['$event'])
  onClick(event: Event): void {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isCollapsed = true;
    }
  }
}