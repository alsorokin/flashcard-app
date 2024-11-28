import { TestBed } from '@angular/core/testing';
import { WordsService } from './words.service';
import * as wordsModule from './words';
import { jest } from '@jest/globals';

jest.mock('./words', () => ({
  getBaseTags: jest.fn(),
  getBaseWordsByTag: jest.fn(),
  getBaseWords: jest.fn(),
}));

describe('WordsService', () => {
  let service: WordsService;

  beforeEach(() => {
    // Mock setup before TestBed configuration
    const mockTags = ['tag1', 'tag2'];
    (wordsModule.getBaseTags as jest.Mock).mockReturnValue(mockTags);

    TestBed.configureTestingModule({});
    service = TestBed.inject(WordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return word collections', () => {
    const collections = service.getWordCollections();

    expect(collections.length).toBe(2);
    expect(collections[0].name).toBe('tag1');
    expect(collections[1].name).toBe('tag2');
  });

  it('should set collection selected', () => {
    service.setCollectionSelected('tag1', true);
    const collections = service.getWordCollections();
    expect(collections.find(c => c.name === 'tag1')?.selected).toBe(true);

    service.setCollectionSelected('tag1', false);
    const collections2 = service.getWordCollections();
    expect(collections2.find(c => c.name === 'tag1')?.selected).toBe(false);
  });

  it('should return words by selected collections', () => {
    const mockWords = [
      { value: 'word1', translation: 'translation1', tags: ['tag1'] },
      { value: 'word2', translation: 'translation2', tags: ['tag2'] },
    ];
    (wordsModule.getBaseWords as jest.Mock).mockReturnValue(mockWords);

    service.setCollectionSelected('tag1', true);
    service.setCollectionSelected('tag2', false);
    const words = service.getSelectedWords();

    expect(words.length).toBe(1);
    expect(words[0].value).toBe('word1');
  });

  it('should update words based on collection change event -- add new words', () => {
    const words = [
      { value: 'word2', translation: 'translation2', tags: ['tag2'] },
    ];
    const mockWordsByTag = [
      { value: 'word1', translation: 'translation1', tags: ['tag1'] },
      { value: 'word3', translation: 'translation3', tags: ['tag1'] },
    ];
    (wordsModule.getBaseWordsByTag as jest.Mock).mockReturnValue(mockWordsByTag);

    service.refreshWordsByEvent(words, { name: 'tag1', selected: true });

    expect(words.length).toBe(3);
    expect(words.find(w => w.value === 'word3')).toBeTruthy();
  });

  it('should update words based on collection change event -- remove words', () => {
    const words = [
      { value: 'word1', translation: 'translation1', tags: ['tag1'] },
      { value: 'word2', translation: 'translation2', tags: ['tag2'] },
      { value: 'word3', translation: 'translation3', tags: ['tag1'] },
    ];
    const mockWordsByTag = [
      { value: 'word1', translation: 'translation1', tags: ['tag1'] },
      { value: 'word3', translation: 'translation3', tags: ['tag1'] },
    ];
    (wordsModule.getBaseWordsByTag as jest.Mock).mockReturnValue(mockWordsByTag);

    service.refreshWordsByEvent(words, { name: 'tag1', selected: false });

    expect(words.length).toBe(1);
    expect(words[0].value).toBe('word2');
  });

  it('should return unique random words', () => {
    const mockWords = [
      { value: 'word1', translation: 'translation1', tags: ['tag1'] },
      { value: 'word2', translation: 'translation2', tags: ['tag2'] },
      { value: 'word3', translation: 'translation3', tags: ['tag1'] },
    ];

    for (let i = 0; i < 100; i++) {
      const randomWords = service.getRandomWords(mockWords, 2);
      expect(randomWords.length).toBe(2);
      expect(mockWords.find(w => w.value === randomWords[0].value)).toBeTruthy();
      expect(mockWords.find(w => w.value === randomWords[1].value)).toBeTruthy();
      expect(randomWords[0].value).not.toBe(randomWords[1].value);
      expect(randomWords[0].translation).not.toBe(randomWords[1].translation);
    }
  });

  it ('should filter out ignored words', () => {
    const mockWords = [
      { value: 'word1', translation: 'translation1', tags: ['tag1'] },
      { value: 'word2', translation: 'translation2', tags: ['tag2'] },
      { value: 'word3', translation: 'translation3', tags: ['tag1'] },
    ];

    const randomWords = service.getRandomWords(mockWords, 2, ['word1', 'word2']);
    expect(randomWords.length).toBe(1);
    expect(randomWords[0].value).toBe('word3');
  });
});