import words from './words.json';

export interface Word {
    value: string;
    translation: string;
    tags: string[];
    audioFileName?: string;
};

/**
 * Get all tags associated with the words.
 * 
 * @returns {Array<string>} An array of all tags associated with the words.
 */
export function getAllTags(): string[] {
    const tags = new Set<string>();
    words.forEach(w => w.tags.forEach(t => tags.add(t)));
    return Array.from(tags);
}

/**
 * Get all words.
 * 
 * @returns {Word[]} An array of all words.
 */
export function getAllWords(): Word[] {
    return words.map(w => { return { ...w } });
}

/**
 * Get all words that have the specified tag.
 * 
 * @param tag {string} The tag to filter the words by.
 * @returns {Word[]} An array of words that have the specified tag.
 */
export function getWordsByTag(tag: string): Word[] {
    return words.filter(w => w.tags.includes(tag)).map(w => { return { ...w } });
}
