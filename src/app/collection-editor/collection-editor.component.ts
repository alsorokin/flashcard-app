import { Component } from '@angular/core';
import { WordsService } from '../words.service';
import { Word, getAllWords } from '../words';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-collection-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collection-editor.component.html',
  styleUrl: './collection-editor.component.css'
})
export class CollectionEditorComponent {
  allWords: Word[];

  constructor(private wordsService: WordsService) {
    this.allWords = getAllWords();
  }
}
