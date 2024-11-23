import { Component } from '@angular/core';
import { WordCollection, WordsService } from '../words.service';
import { Word, getAllWords } from '../words';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-collection-editor',
  standalone: true,
  imports: [ CommonModule, FormsModule, MatFormFieldModule, MatSelectModule ],
  templateUrl: './collection-editor.component.html',
  styleUrl: './collection-editor.component.css'
})
export class CollectionEditorComponent {
  allWords: Word[] = [];
  allCollections: WordCollection[] = [];

  constructor(private wordsService: WordsService) { }

  ngOnInit() {
    this.allWords = getAllWords();
    this.allCollections = this.wordsService.getWordCollections();
  }

  onSubmit() {
    console.log(this.allWords);
  }
}
