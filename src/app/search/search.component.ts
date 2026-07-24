import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil, firstValueFrom } from 'rxjs';
import { getLanguagePair, Word } from '../words';

interface SearchResult {
    word: Word;
    score: number;
}

@Component({
    selector: 'app-search',
    imports: [FormsModule],
    templateUrl: './search.component.html',
    styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<void>();
    private allWords: Word[] = [];

    query = '';
    results: SearchResult[] = [];
    isLoading = false;
    langPairLabel = '';

    constructor(private route: ActivatedRoute, private http: HttpClient) {}

    ngOnInit(): void {
        this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
            const pair = getLanguagePair(params['langPair']);
            this.langPairLabel = pair.label;
            this.loadWords(pair.dataPath);
        });
    }

    private async loadWords(dataPath: string): Promise<void> {
        this.isLoading = true;
        this.allWords = await firstValueFrom(this.http.get<Word[]>(dataPath));
        this.isLoading = false;
        this.updateResults();
    }

    onQueryChange(): void {
        this.updateResults();
    }

    private updateResults(): void {
        const q = this.query.trim().toLowerCase();
        if (!q) {
            this.results = [];
            return;
        }
        this.results = this.allWords
            .map(word => ({ word, score: this.fuzzyScore(q, word) }))
            .filter(r => r.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 50);
    }

    /**
     * Armenian stop consonants come in voiced/unaspirated/aspirated triplets.
     * Normalize each group to a single representative so that, e.g., typing
     * կ also matches words containing ք or գ.
     */
    private readonly armenianPhoneticMap: Record<string, string> = {
        // velars: գ / կ / ք
        'գ': 'կ', 'ք': 'կ',
        // dentals: դ / տ / թ
        'դ': 'տ', 'թ': 'տ',
        // bilabials: բ / պ / փ
        'բ': 'պ', 'փ': 'պ',
        // dental affricates: ձ / ծ / ց
        'ձ': 'ծ', 'ց': 'ծ',
        // palatal affricates: ջ / չ / ճ
        'ջ': 'չ', 'ճ': 'չ',
        // fricatives: ժ / շ
        'ժ': 'շ',
        // sibilants: զ / ս
        'զ': 'ս',
        // labiodentals: վ / ֆ
        'վ': 'ֆ',
    };

    private normalizeArmenian(s: string): string {
        return Array.from(s).map(c => this.armenianPhoneticMap[c] ?? c).join('');
    }

    private fuzzyScore(query: string, word: Word): number {
        return Math.max(
            this.scoreString(query, word.value.toLowerCase()),
            this.scoreString(query, word.translation.toLowerCase())
        );
    }

    private scoreString(query: string, target: string): number {
        // Exact match
        if (target === query) return 10000;
        if (target.startsWith(query)) return 9000 - target.length;
        if (target.includes(query)) return 8000 - target.length;

        // Phonetically-normalized match (lower priority than exact)
        const qn = this.normalizeArmenian(query);
        const tn = this.normalizeArmenian(target);
        if (tn === qn) return 7000;
        if (tn.startsWith(qn)) return 6000 - target.length;
        if (tn.includes(qn)) return 5000 - target.length;

        // Fuzzy: all query chars must appear in order within target
        let qi = 0;
        let consecutive = 0;
        let score = 0;
        for (let i = 0; i < target.length && qi < query.length; i++) {
            if (target[i] === query[qi]) {
                qi++;
                consecutive++;
                score += consecutive * 10;
            } else {
                consecutive = 0;
            }
        }
        if (qi === query.length) return score;

        // Fuzzy on normalized strings (lowest priority)
        qi = 0; consecutive = 0; score = 0;
        for (let i = 0; i < tn.length && qi < qn.length; i++) {
            if (tn[i] === qn[qi]) {
                qi++;
                consecutive++;
                score += consecutive * 5;
            } else {
                consecutive = 0;
            }
        }
        return qi === qn.length ? score : 0;
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
