import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Word } from '../words';
import { WordCollection, WordsService } from '../words.service';
import { SettingsService } from '../settings.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-collection-editor-reactive',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './collection-editor-reactive.component.html',
  styleUrl: './collection-editor-reactive.component.css'
})
export class CollectionEditorReactiveComponent {
  private formBuilder = inject(FormBuilder);

  allWords: Word[] = [];
  allCollections: WordCollection[] = [];
  paginatedWords: { group: FormGroup, index: number }[] = [];
  currentPage = 0;
  pageSize = 10;
  totalPages = 0;

  get totalWords(): number {
    return this.wordsFormArray.length;
  }

  parentForm = this.formBuilder.group({
    words: this.formBuilder.array([]),
    newWordValue: [''],
    newWordTranslation: [''],
    newWordTags: [''],
    newCollectionName: [''],
  });

  get wordsFormArray(): FormArray {
    return this.parentForm.get('words') as FormArray;
  }

  constructor(private wordsService: WordsService,
              private settingsService: SettingsService) {}

  async ngOnInit() {
    await this.wordsService.ensureInitialized();
    this.reloadFromService();
    this.wordsService.collectionsState$.subscribe(collections => {
      this.allCollections = collections;
    });
    this.settingsService.languagePairChanged$.subscribe(async () => {
      await this.wordsService.ensureInitialized();
      this.reloadFromService();
    });
  }

  private reloadFromService(): void {
    this.allWords = this.wordsService.getAllWords();
    this.allCollections = this.wordsService.getWordCollections();
    this.wordsFormArray.clear();
    this.allWords.forEach((word) => {
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
    this.totalPages = Math.ceil(this.wordsFormArray.length / this.pageSize);
    this.updatePaginatedWords(0, this.pageSize);
  }

  updatePaginatedWords(startIndex: number, endIndex: number) {
    this.paginatedWords = this.wordsFormArray.controls.slice(startIndex, endIndex).map((group, index) => ({
      group: group as FormGroup,
      index: startIndex + index
    }));
  }

  goToFirstPage() {
    this.currentPage = 0;
    this.updatePaginatedWords(0, this.pageSize);
  }

  goToPreviousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.refreshPage();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.refreshPage();
    }
  }

  goToLastPage() {
    this.currentPage = this.totalPages - 1;
    this.refreshPage();
  }

  refreshPage() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.updatePaginatedWords(startIndex, endIndex);
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
    let newWordTagsValue = newWordTagsControl.value;
    if (!newWordValue || !newWordTranslation) {
      return;
    }
    let newWordTags: string[] = [];
    if (Array.isArray(newWordTagsValue)) {
      newWordTags = newWordTagsValue as string[];
    }

    const oldWord = this.allWords.find(word => word.value === newWordValue);
    if (oldWord) {
      const userAgrees = confirm(`Уже есть слово "${newWordValue}". Хотите его обновить?`);
      if (!userAgrees) {
        return
      }
      oldWord.translation = newWordTranslation;
      oldWord.tags = [ ...newWordTags ];
      this.wordsService.updateWord(oldWord);
      const oldWordControl = this.wordsFormArray.controls.find(control => control.value.value === oldWord.value);
      if (oldWordControl) {
        oldWordControl.setValue(oldWord);
      }
      this.clearNewWordControls();
      this.refreshPage();
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
    this.refreshPage();
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

  addCollection() {
    const newCollectionNameControl = this.parentForm.get('newCollectionName');
    if (newCollectionNameControl === null) {
      return;
    }
    const newCollectionName = newCollectionNameControl.value;
    if (!newCollectionName) {
      return;
    }

    const oldCollection = this.allCollections.find(collection =>
      collection.name.toLowerCase() === newCollectionName.toLowerCase());
    if (oldCollection) {
      alert(`Уже есть набор "${oldCollection.name}".`);
      return;
    }

    const newCollection: WordCollection = {
      name: newCollectionName,
      htmlId: newCollectionName.toLowerCase().replace(/ /g, '_'),
      selected: false,
    };
    this.allCollections.push(newCollection);
  }
}
