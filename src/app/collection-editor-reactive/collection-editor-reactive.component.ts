import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Word } from '../words';
import { WordCollection, WordsService } from '../words.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-collection-editor-reactive',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule, MatFormFieldModule, MatSelectModule ],
  templateUrl: './collection-editor-reactive.component.html',
  styleUrl: './collection-editor-reactive.component.css'
})
export class CollectionEditorReactiveComponent {
  private formBuilder = inject(FormBuilder);

  allWords: Word[] = [];
  allCollections: WordCollection[] = [];

  parentForm = this.formBuilder.group({
    words: this.formBuilder.array([])
  });

  get wordsFormArray(): FormArray {
    return this.parentForm.get('words') as FormArray;
  }

  constructor(private wordsService: WordsService) {
    this.allWords = wordsService.getAllWords();
    this.allCollections = wordsService.getWordCollections();
  }

  ngOnInit() {
    this.wordsFormArray.clear();
    this.allWords.forEach(word => {
      const wordFormGroup = this.formBuilder.group({
        value: [word.value],
        translation: [word.translation],
        tags: [word.tags],
      });
      this.wordsFormArray.push(wordFormGroup);

      wordFormGroup.valueChanges.subscribe(value => {
        if (!value.value || !value.translation || !value.tags) {
          return;
        }
        const changedWord: Word = {
          value: value.value,
          translation: value.translation,
          tags: value.tags as string[],
        };
        this.wordsService.updateWord(changedWord);
      });
    });
  }
}