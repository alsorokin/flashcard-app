---
name: armenian-vocabulary-backfill
description: Review Armenian vocabulary in user-provided sources, including copied chat messages or files, find missing dictionary entries, and import approved batches.
---

# Armenian Vocabulary Backfill

Use this skill to review Armenian vocabulary in source material provided by the user and add approved words to `public/data/words-ru-hy.json`.

## Finding and cleaning a batch

1. Use only the source material and scope provided by the user. Sources may be pasted text, copied chat messages, or files in any format. Do not assume a platform, author, date range, export schema, or default local source.
2. Identify vocabulary lists. Skip practice dialogues, full-sentence exercises, grammar notes, conjugation examples, and lines without vocabulary to add unless the user asks to include them.
3. Split Armenian entries from Russian translations at the first hyphen or dash (`-`, `–`, or `—`); spacing may be inconsistent. If a translation is absent, suggest one and mark it as a suggestion. Skip lines whose apparent translation is Armenian grammar or commentary.
4. Split slash-separated synonyms into separate entries only when they are independent vocabulary items. Do not split conjugation or grammar patterns into dictionary entries.
5. Normalize case and repeated whitespace when comparing Armenian values with the dictionary. Treat differences only in surrounding punctuation as the same entry. Exclude values already in the dictionary: the importer adds the current lesson tag to existing entries.
6. Apply the dictionary-entry selection rules in `AGENTS.md`, counting words in the Armenian value:
   - Prefer one-word entries.
   - Two or three words are allowed only for phrasal verbs or idioms.
   - Longer entries require explicit user approval.
7. Deduplicate the candidate batch by Armenian value.
8. Show only eligible, missing candidates in a table with Armenian, Russian, and notes for any proposed translation or ambiguity. Wait for explicit approval before writing to the dictionary.

## Importing an approved batch

If the source clearly contains dated vocabulary lists, group entries by date and process dates chronologically, using a separate importer invocation for each date. Otherwise, treat the approved entries as one batch. If lesson grouping is ambiguous, ask before importing.

1. Save the exact counter value before importing:

   ```bash
   OLD_LESSON=$(cat docs/current-lesson.txt)
   ```

2. Preview each approved batch. Confirm `Added` matches the number of approved new entries and `Tagged existing` is zero. If either differs, stop and investigate.

   ```bash
   npm run --silent lesson:import -- --dry-run <<'EOF'
   Armenian value - Russian translation
   EOF
   ```
3. Run the importer without `--dry-run` separately for each batch, in order:

   ```bash
   npm run --silent lesson:import <<'EOF'
   Armenian value - Russian translation
   EOF
   ```
4. Verify the dictionary parses as JSON, each approved value appears once with the expected translation and lesson tag, the counter increased by the number of importer invocations, and no Armenian value accidentally contains Latin letters.
5. Never commit unless asked.
