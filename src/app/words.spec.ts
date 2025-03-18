import * as wordsModule from './words';
import fs from 'fs';

describe('WordsService', () => {
  beforeEach(() => {});
  
  it('should return some words', () => {
    const words = wordsModule.getBaseWords();
    expect(words.length).toBeGreaterThan(0);
  });

  it('should return some tags', () => {
    const tags = wordsModule.getBaseTags();
    expect(tags.length).toBeGreaterThan(0);
  });

  it('should return some words by tag', () => {
    const words = wordsModule.getBaseWordsByTag('Уроки 1-5');
    expect(words.length).toBeGreaterThan(0);
  });

  it('should return words with correct audio file names', () => {
    const words = wordsModule.getBaseWords();
    words.forEach(word => {
      if (word.audioFileName) {
        const filePresent = fs.existsSync(`public/audio/${word.audioFileName}`);
        expect(filePresent).toBe(true);
      }
    });
  });

  it('should return words with audio file names containing the word value', () => {
    const words = wordsModule.getBaseWords();
    words.forEach(word => {
      if (word.audioFileName) {
        expect(word.audioFileName).toContain(word.value);
      }
    });
  });
});