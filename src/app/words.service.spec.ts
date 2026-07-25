import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { WordsService } from './words.service';
import { SettingsService } from './settings.service';

describe('WordsService', () => {
  let service: WordsService;
  let httpMock: HttpTestingController;
  const baseWords = [
    { value: 'hello', translation: 'привет', tags: ['Basics'] },
    { value: 'goodbye', translation: 'пока', tags: ['Basics'] },
    { value: 'coffee', translation: 'кофе', tags: ['Food'] },
    { value: 'tea', translation: 'чай', tags: ['Food'] },
    { value: 'ticket', translation: 'билет', tags: ['Travel'] },
  ];

  beforeEach(fakeAsync(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [SettingsService, provideHttpClient(), provideHttpClientTesting()]
    });

    httpMock = TestBed.inject(HttpTestingController);
    
    // Need to tick once to let the service initialization start
    tick();
    service = TestBed.inject(WordsService);
    tick();
    
    // Now the request should be ready
    const req = httpMock.expectOne('data/words-ru-hy.json');
    req.flush(baseWords);
    
    tick();
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return word collections with saved selection', () => {
    const collections = service.getWordCollections();
    expect(collections.map(c => c.name).sort()).toEqual(['Basics', 'Food', 'Travel']);
    expect(collections.every(c => c.selected)).toBe(true);
  });

  it('should set collection selected and refresh words', () => {
    service.setCollectionSelected('Basics', false);
    const collections = service.getWordCollections();
    expect(collections.find(c => c.name === 'Basics')?.selected).toBe(false);
    expect(service.getSelectedWords().every(w => !w.tags.includes('Basics'))).toBe(true);
  });

  it('should merge custom words and add tags as collections', () => {
    service.updateWord({ value: 'new word', translation: 'новое слово', tags: ['Custom'] });
    const allWords = service.getAllWords();
    expect(allWords.find(w => w.value === 'new word')).toBeTruthy();
    const collections = service.getWordCollections();
    expect(collections.find(c => c.name === 'Custom')).toBeTruthy();
  });

  it('should filter out ignored words', () => {
    const randomWords = service.getRandomWords(baseWords, 2, ['hello', 'coffee']);
    expect(randomWords.every(w => w.value !== 'hello' && w.value !== 'coffee')).toBe(true);
  });

  it('should maintain separate custom words per language pair in localStorage', () => {
    // Add a custom word to ru-hy
    service.updateWord({ value: 'hy-only', translation: 'միայն hy-ում', tags: ['HyOnly'] });
    
    // Simulate switching by directly saving/loading from different localStorage keys
    const hyCustomKey = 'customWords:ru-hy';
    const enCustomKey = 'customWords:ru-en';
    
    // ru-hy should have the custom word
    const hyCustomData = localStorage.getItem(hyCustomKey);
    expect(hyCustomData).toBeTruthy();
    const hyWords = JSON.parse(hyCustomData!);
    expect(hyWords.find((w: any) => w.value === 'hy-only')).toBeTruthy();
    
    // en should not have it
    const enCustomData = localStorage.getItem(enCustomKey);
    expect(enCustomData).toBeFalsy();
  });

  it('should order lesson tags numerically and place them before non-lesson tags', () => {
    service.updateWord({ value: 'l-56', translation: 'x', tags: ['Уроки 56-60'] });
    service.updateWord({ value: 'l-6', translation: 'x', tags: ['Уроки 6-10'] });
    service.updateWord({ value: 'l-11', translation: 'x', tags: ['Уроки 11-15'] });
    service.updateWord({ value: 'l-1', translation: 'x', tags: ['Уроки 1-5'] });
    service.updateWord({ value: 'topic', translation: 'x', tags: ['Числительные и время'] });

    const names = service.getWordCollections().map(c => c.name);
    const lessonNames = names.filter(n => n.startsWith('Уроки '));

    expect(lessonNames).toEqual([
      'Уроки 1-5',
      'Уроки 6-10',
      'Уроки 11-15',
      'Уроки 56-60',
    ]);

    const lastLessonIndex = Math.max(...lessonNames.map(name => names.indexOf(name)));
    const nonLessonNames = names.filter(n => !n.startsWith('Уроки '));
    expect(nonLessonNames.every(name => names.indexOf(name) > lastLessonIndex)).toBe(true);
  });

  it('should parse and sort numeric range tags with arbitrary text prefixes', () => {
    service.updateWord({ value: 'm-56', translation: 'x', tags: ['Модуль 56-60'] });
    service.updateWord({ value: 't-6', translation: 'x', tags: ['Тема 6-10'] });
    service.updateWord({ value: 'b-11', translation: 'x', tags: ['Блок уроков 11-15'] });
    service.updateWord({ value: 't-1', translation: 'x', tags: ['Тема 1-5'] });

    const names = service.getWordCollections().map(c => c.name);
    const rangeNames = names.filter(n => /(\d+)\s*-\s*(\d+)$/.test(n));

    expect(rangeNames).toEqual([
      'Тема 1-5',
      'Тема 6-10',
      'Блок уроков 11-15',
      'Модуль 56-60',
    ]);
  });
});
