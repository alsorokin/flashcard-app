import { getRandomWords, Word, words } from './words';
import { TestBed } from '@angular/core/testing';

describe('getRandomWords', () => {
    it('should return an empty array if count is 0', () => {
        const result = getRandomWords(0);
        expect(result).toEqual([]);
    });

    it('should return an empty array if count is negative', () => {
        const result = getRandomWords(-1);
        expect(result).toEqual([]);
    });

    it('should return all words if count is greater than available words', () => {
        const result = getRandomWords(99999);
        expect(result.length).toBe(words.length);
    });

    it('should return the specified number of words', () => {
        const result = getRandomWords(3);
        expect(result.length).toBe(3);
    });

    it('should filter words by tags', () => {
        const result = getRandomWords(2, ['lesson_01']);
        expect(result.every(word => word.tags.includes('lesson_01'))).toBe(true);
    });

    it('should ignore specified words', () => {
        for (let i = 0; i < 100; i++) {
            const result = getRandomWords(3, ['lesson_01'], ['շատ ուրախ եմ', 'ծանոթանալ', 'շատ հաճելի է']);
            expect(result.some(word => word.value === 'շատ ուրախ եմ' ||
                word.value === 'ծանոթանալ' ||
                word.value === 'շատ հաճելի է'
            )).toBe(false);
        }
    });

    it('should not return duplicate words', () => {
        for (let i = 0; i < 100; i++) {
            const result = getRandomWords(3);
            const uniqueValues = new Set(result.map(word => word.value));
            expect(uniqueValues.size).toBe(result.length);
        }
    });
});