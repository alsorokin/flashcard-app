import words from './words.json';

export interface Word {
    value: string;
    translation: string;
    tags: string[];
    audioFileName?: string;
};

/**
 * Get all tags associated with base words.
 * 
 * @returns {Array<string>} An array of all tags associated with base words.
 */
export function getBaseTags(): string[] {
    const tags = new Set<string>();
    words.forEach(w => w.tags.forEach(t => tags.add(t)));
    return Array.from(tags);
}

/**
 * Get all base words.
 * 
 * @returns {Word[]} An array of all words.
 */
export function getBaseWords(): Word[] {
    return words.map(w => { return { ...w } });
}

/**
 * Get all base words that have the specified tag.
 * 
 * @param tag {string} The tag to filter the words by.
 * @returns {Word[]} An array of words that have the specified tag.
 */
export function getBaseWordsByTag(tag: string): Word[] {
    return words.filter(w => w.tags.includes(tag)).map(w => { return { ...w } });
}
