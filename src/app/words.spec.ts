import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import * as wordsModule from './words';
import { Word } from './words';
import fs from 'fs';

describe('Words module - data validation', () => {
  let httpMock: HttpTestingController;
  const ruHyDataPath = 'public/data/words-ru-hy.json';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should have ru-hy data file with correct structure', () => {
    const dataExists = fs.existsSync(ruHyDataPath);
    expect(dataExists).toBe(true);

    const rawData = fs.readFileSync(ruHyDataPath, 'utf-8');
    const words: Word[] = JSON.parse(rawData);
    expect(Array.isArray(words)).toBe(true);
    expect(words.length).toBeGreaterThan(0);

    words.forEach(word => {
      expect(word.value).toBeTruthy();
      expect(word.translation).toBeTruthy();
      expect(Array.isArray(word.tags)).toBe(true);
    });
  });

  it('should have audio files for Armenian words with audioFileName', () => {
    const rawData = fs.readFileSync(ruHyDataPath, 'utf-8');
    const words: Word[] = JSON.parse(rawData);

    words.forEach(word => {
      if (word.audioFileName) {
        const audioPath = `public/audio/${word.audioFileName}`;
        const filePresent = fs.existsSync(audioPath);
        expect(filePresent).toBe(true);
        expect(word.audioFileName).toContain(word.value);
      }
    });
  });

  it('should collect tags from module helper function', () => {
    const rawData = fs.readFileSync(ruHyDataPath, 'utf-8');
    const words: Word[] = JSON.parse(rawData);
    const tags = wordsModule.collectTags(words);

    expect(Array.isArray(tags)).toBe(true);
    expect(tags.length).toBeGreaterThan(0);
  });
});
