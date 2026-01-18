import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { WordsService } from './words.service';
import { SettingsService } from './settings.service';
import { DEFAULT_LANGUAGE_PAIR_CODE, LANGUAGE_PAIRS, LanguagePairCode } from './words';

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
});
