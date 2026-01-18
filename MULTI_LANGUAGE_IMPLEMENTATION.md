# Multi-Language Support Implementation

## Overview
The flashcard app now supports multiple language pairs with Russian as the fixed source language. Data has been separated from code by moving word lists to remote JSON files that are fetched at runtime.

## Architecture Changes

### 1. Data Model (src/app/words.ts)
- **LanguagePair interface**: Describes a language pair with metadata (code, label, data path, prompt/answer sides)
- **LANGUAGE_PAIRS constant**: Registry of available language pairs (ru-hy, ru-en, extensible for future pairs)
- **Helper function `collectTags()`**: Extracts unique tags from word arrays (replaces inline imperative code)
- Removed static import of bundled `words.json`

### 2. Data Location
- **Before**: `src/app/words.json` (bundled, single pair only)
- **After**: `/public/data/words-ru-hy.json`, `/public/data/words-ru-en.json` (fetched dynamically)
- Audio files remain in `/public/audio/` (unchanged)

### 3. WordsService (src/app/words.service.ts)
**Major refactoring**:
- **Remote loading**: Uses `HttpClient` to fetch language pair data instead of static imports
- **Per-pair caching**: Base words and custom words are cached separately by language pair code
- **Async initialization**: `ensureInitialized()` method waits for data to be loaded
- **Pair-aware storage**: localStorage keys are namespaced by language pair (e.g., `customWords:ru-hy`, `customWords:ru-en`)
- **Backward compatibility**: On first init with ru-hy, legacy localStorage keys (`customWords`, `wordCollections`) are migrated to pair-specific keys
- **State observables**: Emits `languagePair$`, `collectionsState$`, and `selectedWords$` for reactive UI updates
- **Dynamic reloading**: When language pair changes via SettingsService, automatically loads new data and recomputes collections

### 4. SettingsService (src/app/settings.service.ts)
**New feature**:
- **languagePairCode** property: Stores selected language pair (default: `ru-hy`)
- **languagePairChanged$** observable: Notifies consumers when pair selection changes
- Persists language pair choice to localStorage under `settings.languagePairCode`

### 5. Settings UI (src/app/settings/settings.component.ts & .html)
**New UI element**:
- Language pair selector (`<select>`) dropdown at top of settings panel
- Populated from `LANGUAGE_PAIRS` constant
- Triggers `changeLanguagePair()` which updates SettingsService and waits for WordsService to reload

### 6. Flashcard Component (src/app/flashcard/flashcard.component.ts)
**Changes**:
- Subscribes to `wordsService.languagePair$` to track current language pair
- Subscribes to `wordsService.selectedWords$` to reactively update gameplay
- Uses language pair metadata (`promptSide`, `audioSide`) to determine which field is shown/answered
- Helper methods `getPromptText()`, `getOptionText()`, `getOptionHint()` resolve fields dynamically based on pair metadata
- Handles missing audio gracefully (audio button only shows if `audioFileName` exists)

### 7. Collection Editor (src/app/collection-editor-reactive/collection-editor-reactive.component.ts)
**Changes**:
- Awaits `wordsService.ensureInitialized()` before loading words
- Reloads all words and collections when language pair changes (via `settingsService.languagePairChanged$`)
- Maintains edit forms per pair without cross-pair contamination

### 8. HTTP Client Configuration (src/app/app.config.ts)
- Added `provideHttpClient()` to enable HTTP requests for remote data loading

## Backward Compatibility

### Custom Words & Collections
- Existing localStorage entries (`customWords`, `wordCollections`) are automatically migrated to pair-specific keys on first load
- ru-hy uses the legacy keys as fallback, allowing existing users to retain their data
- New pairs start with empty custom data

### Audio Path Resolution
- Audio paths remain `audio/{fileName}` (unchanged from original implementation)
- Missing audio is handled gracefully (no console errors, button simply not rendered)

## Extensibility

### Adding New Language Pairs (e.g., ru-es)
1. Create `/public/data/words-ru-es.json` with structure: `Word[]` (value, translation, tags, audioFileName?)
2. Add entry to `LANGUAGE_PAIRS` in `src/app/words.ts`:
   ```typescript
   {
     code: 'ru-es',
     label: 'Русский → Испанский',
     source: 'ru',
     target: 'es',
     dataPath: 'data/words-ru-es.json',
     promptSide: 'translation',
     audioSide: 'value',
   }
   ```
3. No code changes needed; UI selector automatically includes the new pair

### Supporting Multiple Source Languages (future)
- Current schema assumes Russian source (`source: 'ru'`); can be extended by:
  - Adding source language selector in UI
  - Changing `LanguagePairCode` to allow more combinations (e.g., `'en-fr'`)
  - Adjusting data paths and metadata accordingly

## Testing

### Unit Tests (src/app/words.service.spec.ts)
- ✅ Service initialization with HTTP mocking
- ✅ Word collection management and selection
- ✅ Custom word merging and storage per pair
- ✅ Random word selection (with deduplication)
- ✅ Separate custom word storage per language pair (localStorage isolation)

### Data Validation Tests (src/app/words.spec.ts)
- ✅ Data file structure validation (ru-hy.json exists, well-formed)
- ✅ Audio file references (if specified, file exists and contains word value)
- ✅ Tag extraction helper function

### Integration Tests (component specs)
- ✅ Settings component correctly renders language pair dropdown
- ✅ Flashcard component subscribes to language pair changes
- ✅ Collection editor reloads data on pair switch
- ✅ All 18 tests pass

## File Structure

```
flashcard-app/
├── src/
│   └── app/
│       ├── words.ts                    (refactored: data model, no imports)
│       ├── words.service.ts            (refactored: async remote loading)
│       ├── words.service.spec.ts       (updated: HTTP mocking)
│       ├── words.spec.ts               (updated: data validation)
│       ├── settings.service.ts         (new: languagePairCode property)
│       ├── settings.service.spec.ts    (new: pair persistence tests)
│       ├── settings/
│       │   ├── settings.component.ts   (new: language pair selector)
│       │   └── settings.component.html (new: <select> dropdown)
│       ├── flashcard/
│       │   ├── flashcard.component.ts  (updated: language-aware rendering)
│       │   └── flashcard.component.html (updated: dynamic text display)
│       ├── collection-editor-reactive/
│       │   └── collection-editor-reactive.component.ts (updated: async reload)
│       ├── app.config.ts               (updated: provideHttpClient)
│       └── game/
│           └── game.component.ts       (unchanged)
├── public/
│   ├── audio/                          (unchanged)
│   │   └── *.ogg                       (Armenian audio files)
│   └── data/                           (NEW)
│       ├── words-ru-hy.json            (migrated from src/app/words.json)
│       └── words-ru-en.json            (NEW: sample English words)
└── package.json                        (unchanged)
```

## Storage & Performance

### Bundle Size
- **Data is no longer bundled** → Reduced initial bundle size
- Users only download the language pair they select
- Trade-off: requires HTTP fetch on app startup

### localStorage Structure
```json
{
  "settings": {
    "flippedModeEnabled": true,
    "autoPlayEnabled": true,
    "languagePairCode": "ru-hy"
  },
  "wordCollections:ru-hy": [...],
  "customWords:ru-hy": [...],
  "wordCollections:ru-en": [...],
  "customWords:ru-en": [...]
}
```

### HTTP Requests
- One request per app startup for the selected language pair's base words
- Cached in-memory for the lifetime of the app session
- Future pair switches trigger on-demand loading

## Known Limitations & Future Work

1. **English audio**: ru-en pair currently has no audio (gracefully handled)
   - Future: add English audio assets and corresponding `audioFileName` entries in words-ru-en.json

2. **Language pair switching**: Requires full page reconstruction
   - Future: could be optimized to preserve game state during pair switch

3. **Data validation**: Currently only checks ru-hy at test time
   - Future: add validation for all pairs to prevent deployment of malformed data

4. **UI labels**: Dropdown labels are hardcoded in Russian
   - Future: i18n system could provide localized pair names

## Migration Guide for Existing Users

**Automatic**: No action required. On first load after update:
- Existing custom words in `customWords` key are migrated to `customWords:ru-hy`
- Existing collection selections are migrated to `wordCollections:ru-hy`
- Settings (flipped mode, auto-play) are preserved
- Language pair defaults to `ru-hy` (original behavior)

**Manual cleanup** (optional, after a week): Delete old keys from browser DevTools:
- `customWords` → now in `customWords:ru-hy`
- `wordCollections` → now in `wordCollections:ru-hy`
