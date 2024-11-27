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
    words: this.formBuilder.array([]),
    newWordValue: [''],
    newWordTranslation: [''],
    newWordTags: [''],
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

  addWord() {
    const newWordValueControl = this.parentForm.get('newWordValue');
    const newWordTranslationControl = this.parentForm.get('newWordTranslation');
    const newWordTagsControl = this.parentForm.get('newWordTags');
    if (newWordValueControl === null ||
        newWordTranslationControl === null ||
        newWordTagsControl === null) {
      return;
    }
    const newWordValue = newWordValueControl.value;
    const newWordTranslation = newWordTranslationControl.value;
    const newWordTagsValue = newWordTagsControl.value;
    if (!newWordValue || !newWordTranslation || !Array.isArray(newWordTagsValue)) {
      return;
    }
    const newWordTags = newWordTagsValue as string[];

    const oldWord = this.allWords.find(word => word.value === newWordValue);
    if (oldWord) {
      const userAgrees = confirm(`Уже есть слово "${newWordValue}". Хотите его обновить?`);
      if (!userAgrees) {
        return
      }
      oldWord.translation = newWordTranslation;
      oldWord.tags = [ ...newWordTags ];
      this.wordsService.updateWord(oldWord);
      this.wordsFormArray.controls.push(this.formBuilder.group({
        value: [oldWord.value],
        translation: [oldWord.translation],
        tags: [oldWord.tags],
      }));
      this.clearNewWordControls();
      return;
    }

    const newWord: Word = {
      value: newWordValue,
      translation: newWordTranslation,
      tags: newWordTags,
    };
    this.wordsService.updateWord(newWord);
    this.wordsFormArray.controls.push(this.formBuilder.group({
      value: [newWord.value],
      translation: [newWord.translation],
      tags: [newWord.tags],
    }));
    this.clearNewWordControls();
  }

  private clearNewWordControls() {
    const newWordValueControl = this.parentForm.get('newWordValue');
    const newWordTranslationControl = this.parentForm.get('newWordTranslation');
    const newWordTagsControl = this.parentForm.get('newWordTags');
    if (newWordValueControl === null ||
        newWordTranslationControl === null ||
        newWordTagsControl === null) {
      return;
    }
    newWordValueControl.setValue('');
    newWordTranslationControl.setValue('');
    newWordTagsControl.setValue('');
  }
}