import { TestBed } from '@angular/core/testing';

import { SettingsService } from './settings.service';
import { DEFAULT_LANGUAGE_PAIR_CODE, LANGUAGE_PAIRS } from './words';

describe('SettingsService', () => {
  let service: SettingsService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should default to the primary language pair', () => {
    expect(service.languagePairCode).toBe(DEFAULT_LANGUAGE_PAIR_CODE);
  });

  it('should persist language pair changes', () => {
    const nextPair = LANGUAGE_PAIRS.find(p => p.code !== DEFAULT_LANGUAGE_PAIR_CODE)!;
    service.languagePairCode = nextPair.code;

    const rehydrated = new SettingsService();
    expect(rehydrated.languagePairCode).toBe(nextPair.code);
  });
});
