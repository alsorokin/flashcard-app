export type LanguageCode = 'ru' | 'hy' | 'en';

export type LanguagePairCode = 'ru-hy' | 'ru-en';

export interface LanguagePair {
    code: LanguagePairCode;
    label: string;
    source: LanguageCode;
    target: LanguageCode;
    dataPath: string;
    promptSide: 'value' | 'translation';
    audioSide: 'value' | 'translation';
}

export interface Word {
    value: string;
    translation: string;
    tags: string[];
    audioFileName?: string;
}

export const LANGUAGE_PAIRS: LanguagePair[] = [
    {
        code: 'ru-hy',
        label: 'Русский → Армянский',
        source: 'ru',
        target: 'hy',
        dataPath: 'data/words-ru-hy.json',
        promptSide: 'translation',
        audioSide: 'value',
    },
    {
        code: 'ru-en',
        label: 'Русский → Английский',
        source: 'ru',
        target: 'en',
        dataPath: 'data/words-ru-en.json',
        promptSide: 'translation',
        audioSide: 'value',
    },
];

export const DEFAULT_LANGUAGE_PAIR_CODE: LanguagePairCode = 'ru-hy';

export function getLanguagePair(code: string | null | undefined): LanguagePair {
    const resolved = LANGUAGE_PAIRS.find(p => p.code === code);
    return resolved ?? LANGUAGE_PAIRS.find(p => p.code === DEFAULT_LANGUAGE_PAIR_CODE)!;
}

export function collectTags(words: Word[]): string[] {
    const tags = new Set<string>();
    words.forEach(w => w.tags.forEach(t => tags.add(t)));
    return Array.from(tags);
}
