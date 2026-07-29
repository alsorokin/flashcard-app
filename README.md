# flashcard-app

A simple flashcard web app made for the purpose of learning both Armenian language and Angular framework.

To see it in action, visit https://alsorokin.github.io/flashcard-app/

## Import lesson words

Use the reusable import script via `npm run lesson:import`.

- Default behavior is one lesson per run: use fixed five-lesson tags (`Уроки 116-120` for lessons 116 through 120), then increment `docs/current-lesson.txt` by `+1`.
- A word that already exists is added to the current lesson tag instead of being skipped.
- Optional behavior: set the tag interval with `--lesson-size <number>` (aliases: `--size`, `-s`).

Examples:

```bash
# Import from stdin (the default tag interval is five lessons)
npm run lesson:import <<'EOF'
վարունգ - огурец
ամենօրյա - ежедневный
EOF

# Import from file
npm run lesson:import -- --input path/to/batch.txt

# Preview only, no file writes
npm run lesson:import -- --dry-run --input path/to/batch.txt

# Use a custom tag interval
npm run lesson:import -- --lesson-size 5 --input path/to/batch.txt
```