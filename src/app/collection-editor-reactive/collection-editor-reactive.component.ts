import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Word, getAllWords } from '../words';
import { WordCollection, WordsService } from '../words.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-collection-editor-reactive',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule ],
  templateUrl: './collection-editor-reactive.component.html',
  styleUrl: './collection-editor-reactive.component.css'
})
export class CollectionEditorReactiveComponent {
  private formBuilder = inject(FormBuilder);

  allWords: Word[] = [];
  allCollections: WordCollection[] = [];

  parentForm = this.formBuilder.group({
    words: this.formBuilder.array([
      this.formBuilder.group({
        value: 'Բարեվ',
        translation: 'Привет',
        tags: ['Урок 1']
      })
    ])
  });

  get wordsFormArray(): FormArray {
    return this.parentForm.get('words') as FormArray;
  }

  constructor(private wordsService: WordsService) {
    this.allWords = getAllWords();
    this.allCollections = wordsService.getWordCollections();
  }

  ngOnInit() {
    this.wordsFormArray.clear();
    this.allWords.forEach(word => {
      this.wordsFormArray.push(this.formBuilder.group({
        value: [word.value],
        translation: [word.translation],
        tags: [word.tags]
      }));
    });
  }
}
